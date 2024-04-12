package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.FullOrderItemsInner;
import ru.sloy.sloyorder.model.OrderEntity;

import javax.swing.text.html.parser.Entity;
import java.util.stream.Collectors;

public class OrderMapper {


    public static OrderEntity toEntity(FullOrder object) {
        OrderEntity entity = new OrderEntity();

        entity.setOrderId(object.getOrderId());
        entity.setTime(object.getTime());
        entity.setComment(object.getComment());
        entity.setOrderCost(object.getOrderCost());
        entity.setUserId(object.getUserId());
        entity.setStatus(object.getStatus());
//        entity.setItems(); Todo

        return entity;
    }

    public static FullOrder fromEntity(OrderEntity entity) {
        FullOrder object = new FullOrder();

        object.setOrderId(entity.getOrderId());
        object.setTime(entity.getTime());
        object.setComment(entity.getComment());
        object.setOrderCost(entity.getOrderCost());
        object.setUserId(entity.getUserId());
        object.setStatus(entity.getStatus());
//        object.setItems(entity    Todo
//                .getItems()
//                .stream()
//                .map( )
//                .collect(Collectors.toList()));

        return object;
    }


}
