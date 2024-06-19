package ru.iiko.service;

import com.google.gson.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.iiko.mapping.IIkoOrderMapper;
import ru.iiko.model.*;

import java.util.*;

@Service
public class IikoService {

    @Value("${iiko.api.url}")
    private String apiUrl;

    @Getter
    @Value("${api.login}")
    private String apiLogin;

    private final RestTemplate restTemplate;
    private static Gson gson;

    public IikoService() {
        this.restTemplate = new RestTemplate();
        gson = new Gson();
    }

    private String getToken(String apiLogin) {
        String url = apiUrl + "/access_token";
        Map<String, String> payload = new HashMap<>();
        payload.put("apiLogin", apiLogin);
        String jsonPayload = gson.toJson(payload);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
            return jsonObject.get("token").getAsString();
        } else {
            System.out.println("Error: " + response.getStatusCode());
            return null;
        }
    }

    private String getOrganisationId(String apiLogin) {
        String token = getToken(apiLogin);
        if (token == null) {
            return null;
        }

        String url = apiUrl + "/organizations";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
            JsonArray organizations = jsonObject.getAsJsonArray("organizations");
            if (organizations.size() > 0) {
                return organizations.get(0).getAsJsonObject().get("id").getAsString();
            } else {
                System.out.println("No organizations found");
                return null;
            }
        } else {
            System.out.println("Error: " + response.getStatusCode());
            return null;
        }
    }

    public Map<String, String> getMenu() {
        String apiLogin = getApiLogin();
        if (apiLogin == null) {
            return null;
        }

        String organizationId = getOrganisationId(apiLogin);
        if (organizationId == null) {
            return null;
        }

        String url = apiUrl + "/nomenclature";
        String token = getToken(apiLogin);

        Map<String, String> payload = new HashMap<>();
        payload.put("organizationId", organizationId);
        payload.put("startRevision", "0");
        ResponseEntity<String> response = sendJson(url, token, gson.toJson(payload), payload);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
            JsonArray products = jsonObject.getAsJsonArray("products");
            if (products.size() > 0) {
                Map<String, String> menu = new HashMap<>();
                for (JsonElement productElement : products) {
                    JsonObject product = productElement.getAsJsonObject();
                    menu.put(product.get("name").getAsString(), product.get("id").getAsString());
                }
                return menu;
            } else {
                System.out.println("No products found");
                return null;
            }
        } else {
            System.out.println("Error: " + response.getStatusCode());
            return null;
        }
    }

    private ResponseEntity<String> sendJson(String url, String token, String json, Object payload) {

        HttpHeaders headers = new HttpHeaders();
        assert token != null;
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(json, headers);

        return restTemplate.postForEntity(url, request, String.class);
    }

    private String getTerminalGroup() {
        String apiLogin = getApiLogin();
        if (apiLogin == null) {
            return null;
        }

        String organizationId = getOrganisationId(apiLogin);
        if (organizationId == null) {
            return null;
        }

        String url = apiUrl + "/terminal_groups";
        String token = getToken(apiLogin);

        Map<String, List<String>> payload = new HashMap<>();
        payload.put("organizationIds", Collections.singletonList(organizationId));
        ResponseEntity<String> response = sendJson(url, token, gson.toJson(payload), payload);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
            JsonArray terminalGroups = jsonObject.getAsJsonArray("terminalGroups");
            if (terminalGroups.size() > 0) {
                return terminalGroups.get(0).getAsJsonObject().getAsJsonArray("items")
                        .get(0).getAsJsonObject().get("id").getAsString();
            } else {
                System.out.println("No terminal groups found");
                return null;
            }
        } else {
            System.out.println("Error: " + response.getStatusCode());
            return null;
        }
    }

    public String createIikoDelivery(DeliveryOrder deliveryOrderEntity) {

        String apiLogin = getApiLogin();
        if (apiLogin == null) {
            return null;
        }

        String organizationId = getOrganisationId(apiLogin);
        if (organizationId == null) {
            return null;
        }

        String terminalGroupId = getTerminalGroup();
        if (terminalGroupId == null) {
            return null;
        }

        String url = apiUrl + "/deliveries/create";
        String token = getToken(apiLogin);
        System.out.println(url);

        Map<String, Object> payload = getPayload(deliveryOrderEntity, organizationId, terminalGroupId);
        ResponseEntity<String> response = sendJson(url, token, gson.toJson(payload), payload);

        if (response.getStatusCode() == HttpStatus.OK) {
            if (Objects.equals(parseOrderId(response.getBody()), "00000000-0000-0000-0000-000000000000")) {
                System.out.println("Ошибка при создании заказа: указано слишком раннее время");
                return null;
            } else {
                System.out.println(response.getBody());
                System.out.println(response.getStatusCode());
                String orderId = parseOrderId(response.getBody());
                System.out.println("Заказ создан. ID заказа: " + orderId);
                return orderId;
            }
        } else {
            System.out.println("Ошибка при создании заказа: " + response.getStatusCode());
            return null;
        }
    }

    private String parseOrderId(String responseBody) {
        JsonObject jsonObject = JsonParser.parseString(responseBody).getAsJsonObject();
        JsonObject orderInfo = jsonObject.getAsJsonObject("orderInfo");
        if (orderInfo != null) {
            return orderInfo.get("id").getAsString();
        } else {
            System.out.println("Ошибка: не удалось получить ID заказа из ответа.");
            return null;
        }
    }

    public static IikoOrder generateTestOrderFromOrderItems(Map<String, Integer> orderItems) {
        List<IikoOrderItem> items = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : orderItems.entrySet()) {
            String itemId = entry.getKey();
            Integer itemNumber = entry.getValue();
            IikoOrderItem item = new IikoOrderItem(itemId, itemNumber);
            items.add(item);
        }
        String comment = "Тестовый заказ, не делать!!!";
        IikoOrder order = new IikoOrder(items, 0, comment);

        System.out.println("Order ID: " + order.getId());
        System.out.println("Comment: " + order.getComment());
        System.out.println("Time: " + order.getTime());
        System.out.println("Items:");
        return order;
    }

    public String getDeliveryStatusById(String orderId) {
        String apiLogin = getApiLogin();
        if (apiLogin == null) {
            return null;
        }

        String organizationId = getOrganisationId(apiLogin);
        if (organizationId == null) {
            return null;
        }

        String url = apiUrl + "/deliveries/by_id";

        String token = getToken(apiLogin);
        if (token == null) {
            return null;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = new HashMap<>();
        payload.put("organizationId", organizationId);
        payload.put("orderIds", Collections.singletonList(orderId));

        String jsonPayload = gson.toJson(payload);

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                JsonObject responseBody = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
                JsonArray orders = responseBody.getAsJsonArray("orders");
                if (orders.size() > 0) {
                    JsonObject order = orders.get(0).getAsJsonObject();
                    return order.get("creationStatus").getAsString();
                } else {
                    System.out.println("No orders found in the response.");
                    return null;
                }
            } catch (JsonSyntaxException | IllegalStateException e) {
                System.out.println("Error parsing the response JSON: " + e.getMessage());
                return null;
            }
        } else {
            System.out.println("Error getting delivery by ID: " + response.getStatusCode() + ", " + response.getBody());
            return null;
        }
    }

    private static Map<String, Object> getPayload(DeliveryOrder deliveryOrderEntity, String organizationId, String terminalGroupId) {
        List<DeliveryOrderItem> items = deliveryOrderEntity.getItems();
        Map<String, Object> order = new HashMap<>();
        order.put("completeBefore", deliveryOrderEntity.getCompleteBefore());
        order.put("phone", deliveryOrderEntity.getPhone());
        order.put("orderServiceType", deliveryOrderEntity.getOrderServiceType());
        order.put("comment", deliveryOrderEntity.getComment());
        order.put("items", items);

        Map<String, Object> payload = new HashMap<>();
        payload.put("organizationId", organizationId);
        payload.put("terminalGroupId", terminalGroupId);
        payload.put("order", order);
        return payload;
    }

    public static String orderToJson(OrderEntity order) {
        System.out.println(gson.toJson(order));
        return gson.toJson(order);
    }

    public static OrderEntity jsonToOrder(String json) {
        OrderEntity order = gson.fromJson(json, OrderEntity.class);
        System.out.println(order.getTime());
        System.out.println(json);
        return gson.fromJson(json, OrderEntity.class);
    }

    public static String statusToJson(String status) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", status);
        return gson.toJson(jsonObject);
    }

    public static IikoOrder jsonToIikoOrder(String json) {
        IikoOrder iikoOrder = gson.fromJson(json, IikoOrder.class);
        System.out.println(iikoOrder.getTime());
        System.out.println(json);
        return iikoOrder;
    }

    public static String deliveryOrderToJson(DeliveryOrder order) {
        System.out.println(gson.toJson(order));
        return gson.toJson(order);
    }

    public static String jsonToId(String json) {
        return gson.fromJson(json, JsonObject.class).get("id").getAsString();
    }

    public void doTestOrder() {
        Map<String, String> menu = getMenu();
        if (menu == null) {
            System.out.println("Не удалось получить меню");
            return;
        }

        Map<String, Integer> orderItems = new HashMap<>();
        int count = 0;
        for (String productId : menu.values()) {
            orderItems.put(productId, 0);
            if (++count == 3) break;
        }

        System.out.println(gson.toJson(generateTestOrderFromOrderItems(orderItems)));

        IikoOrder iikoOrder= generateTestOrderFromOrderItems(orderItems);
        String id = createIikoDelivery(IIkoOrderMapper.toDeliveryOrder(iikoOrder));
        System.out.println(getDeliveryStatusById(id));
    }
}