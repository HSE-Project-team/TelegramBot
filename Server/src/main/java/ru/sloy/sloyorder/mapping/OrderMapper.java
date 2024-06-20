package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.*;
import ru.sloy.sloyorder.repository.ItemRepository;
import ru.sloy.sloyorder.repository.UserRepository;

import java.util.Optional;

import static ru.sloy.sloyorder.model.FullOrder.StatusEnum.WAITING_FOR_PAYMENT;


public class OrderMapper {


    public static FullOrder fromEntity(OrderEntity entity) {
        FullOrder object = new FullOrder();

        object.setOrderId(entity.getId());
        object.setTime(entity.getTime());
        object.setComment(entity.getComment());
        object.setOrderCost(entity.getOrderCost());
        object.setUserId(entity.getUser().getId());
        object.setStatus(entity.getStatus());

        object.setItems(entity.getItems().stream().map(x -> {
            FullOrderItemsInner inner = new FullOrderItemsInner();
            inner.setItem(ItemMapper.fromEntity(x.getItem()));
            inner.setItemNumber(x.getItemNumber());
            return inner;
        }).toList());

        return object;
    }


    public static OrderEntity toEntity(RawOrder rawOrder, UserRepository userRepository, ItemRepository itemRepository) throws IllegalArgumentException {
        OrderEntity entity = new OrderEntity();

//      entity.setOrderId(rawOrder.getOrderId()); //auto generated id
        Optional<UserEntity> optionalUser = userRepository.findById(rawOrder.getUserId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("The user with this id was not found");
        }
        entity.setUser(optionalUser.get());
        entity.setOrderCost(rawOrder.getOrderCost());
        entity.setComment(rawOrder.getComment());
        entity.setItems(rawOrder.getItems().stream().map(x -> {
            OrderEntryEntity inner = new OrderEntryEntity();
            Optional<ItemEntity> optionalItem = itemRepository.findById(x.getItemId());
            if (optionalItem.isEmpty()) {
                throw new IllegalArgumentException("An item with this id was not found");
            }
            inner.setItem(optionalItem.get());
            inner.setOrder(entity);
            inner.setItemNumber(x.getItemNumber());
            return inner;
        }).toList());
        entity.setTime(rawOrder.getTime());
        entity.setStatus(WAITING_FOR_PAYMENT);


        return entity;
    }
}
