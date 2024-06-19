package ru.iiko.mapping;

import ru.iiko.model.IikoOrder;
import ru.iiko.model.DeliveryOrder;

import java.util.HashMap;
import java.util.Map;

public class IIkoOrderMapper {
    public static DeliveryOrder toDeliveryOrder(IikoOrder iikoOrder) {
        DeliveryOrder deliveryOrder = new DeliveryOrder();

        deliveryOrder.setId(iikoOrder.getId());
        deliveryOrder.setTime(iikoOrder.getTime());
        deliveryOrder.setComment(iikoOrder.getComment());

        Map<String, Integer> itemsMap = new HashMap<>();
        for (IikoOrder.itemsInner item : iikoOrder.getItems()) {
            itemsMap.put(item.getItemId(), item.getItemNumber());
        }
        deliveryOrder.setItems(itemsMap);

        return deliveryOrder;
    }
}

