package ru.iiko.mapping;

import ru.iiko.model.*;

import java.util.List;

public class OrderMapper {

    public static DeliveryOrder toDeliveryOrder(IikoOrder iikoOrder) {
        Integer id = iikoOrder.getId();
        String time = iikoOrder.getTime();
        String comment = iikoOrder.getComment();
        List<IikoOrderItem> items = iikoOrder.getItems();

        return new DeliveryOrder(id, time, comment, items);
    }
}

