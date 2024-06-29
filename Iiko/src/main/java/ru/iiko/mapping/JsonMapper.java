package ru.iiko.mapping;

import com.google.gson.JsonObject;
import ru.iiko.model.DeliveryOrder;
import ru.iiko.model.IikoOrder;

import static ru.iiko.service.IikoService.gson;

public class JsonMapper {
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
}
