package ru.sloy.sloyorder.repository;

import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.*;

import java.util.*;

@Repository
public class DataRepository {
    static Integer counterForItems = 0;

    static Integer counterForOrders = 0;

    static Map<Integer, Item> mapIdToItem = new HashMap<>();
    static Map<Integer, User> mapIdToUser = new HashMap<>();

    static Map<Integer, FullOrder> mapIdToOrder = new HashMap<>();

    static Set<Integer> avaliableTimes = new HashSet<>();


    public static List<Item> getCatalog() {
        return (List<Item>) mapIdToItem.values();
    }

    public static Integer getCatalogSize() {
        return mapIdToItem.size();
    }

    public static Integer getIdForNewItem() {
        return counterForItems++;
    }

    public static void addItem(Item item) {
        mapIdToItem.put(item.getItemId(), item);
    }

    public static Item getItemById(Integer itemId) {
        return mapIdToItem.get(itemId);
    }

    public static void deleteItemById(Integer itemId) {
        mapIdToItem.remove(itemId);
    }


    public static User getUserById(Integer userId) {
        return mapIdToUser.get(userId);
    }

    public static void deleteUserById(Integer userId) {
        mapIdToUser.remove(userId);
    }

    public static Integer getIdForNewOrder() {
        return counterForOrders++;
    }

    public static void addOrder(FullOrder order) {
        mapIdToOrder.put(order.getOrderId(), order);
        mapIdToUser.get(order.getUserId()).getOrders().add(order);
    }

    public static FullOrder getOrderById(Integer orderId) {
        return mapIdToOrder.get(orderId);
    }

    public static List<Integer> getAvaliableTimes() {
        return new ArrayList<>(avaliableTimes);
    }

    public static void setAvaliableTimes(AvaliableTimes newAvaliableTimes) {
        avaliableTimes = new HashSet<>(newAvaliableTimes.getTimes());
    }


    public static void deleteAvaliableTime(Integer time) {
        avaliableTimes.remove(time);
    }
}
