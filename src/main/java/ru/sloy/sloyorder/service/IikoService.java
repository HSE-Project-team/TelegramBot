package ru.sloy.sloyorder.service;

import com.google.gson.*;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class IikoService {

    @Value("${iiko.api.url}")
    private String apiUrl;

    @Getter
    @Value("${api.login}")
    private String apiLogin;

    private final RestTemplate restTemplate;
    private final Gson gson;

    public IikoService() {
        this.restTemplate = new RestTemplate();
        this.gson = new Gson();
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
            JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();
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
            JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();
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
        String jsonPayload = gson.toJson(payload);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();
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
        String jsonPayload = gson.toJson(payload);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();
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

    public String createOrder(Map<String, Integer> orderItems) {
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

        String url = apiUrl + "/order/create";
        String token = getToken(apiLogin);

        List<Map<String, Object>> items = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : orderItems.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("productId", entry.getKey());
            item.put("type", "Product");
            item.put("amount", entry.getValue());
            item.put("comment", "Тестовый заказ. Не делать!");
            items.add(item);
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("organizationId", organizationId);
        payload.put("terminalGroupId", terminalGroupId);
        Map<String, Object> order = new HashMap<>();
        order.put("items", items);
        payload.put("order", order);

        String jsonPayload = gson.toJson(payload);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            String orderId = parseOrderId(response.getBody());
            System.out.println("Заказ создан. ID заказа: " + orderId);
            return orderId;
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

        createOrder(orderItems);
    }
}