package ru.sloy.sloyorder.repoostiory;

import ru.sloy.sloyorder.model.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class DataRepository {
    static Integer counterForItems = 0;

    static Integer counterForOrders = 0;

    static Map<Integer, Item> mapCatalog= new HashMap<>();
    static Map<Integer, User> mapIdToUser = new HashMap<>();

    static Map<Integer, FullOrder> mapIdToOrder = new HashMap<>();


    public static List<Item> getCatalog() {
        return (List<Item>) mapCatalog.values();
    }

    public static Integer getCatalogSize() {
        return mapCatalog.size();
    }

    public static Integer getIdForNewItem(){
        return counterForItems++;
    }

    public static void addItem(Item item){
        mapCatalog.put(item.getItemId(), item);
    }

    public static Item getItemById(Integer itemId){
        return mapCatalog.get(itemId);
    }

    public static void deleteItemById(Integer itemId){
        mapCatalog.remove(itemId);
    }


    public static User getUserById(Integer userId){
        return mapIdToUser.get(userId);
    }

    public static void deleteUserById(Integer userId){
        mapIdToUser.remove(userId);
    }

    public static Integer getIdForNewOrder(){
        return counterForOrders++;
    }

    public static void addOrder(FullOrder order){
        mapIdToOrder.put(order.getOrderId(), order);
        mapIdToUser.get(order.getUserId()).getOrders().add(order);
    }

    public static void getOrderById(Integer orderId){
        mapIdToOrder.get(orderId);
    }
}
