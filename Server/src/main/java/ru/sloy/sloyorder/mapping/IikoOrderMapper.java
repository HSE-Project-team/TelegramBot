package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.IikoOrder;
import ru.sloy.sloyorder.model.OrderEntity;

public class IikoOrderMapper {

    public static IikoOrder fromEntity(OrderEntity order) {
        var orderBuilder = IikoOrder.builder();
        orderBuilder.items(order.getItems().stream().map(item -> new IikoOrder.itemsInner(item.getItem().getIikoId(), item.getItemNumber())
        ).toList());
        orderBuilder.id(order.getId());
        orderBuilder.comment(order.getComment());
        orderBuilder.time(order.getTime());
        return orderBuilder.build();
    }
}
