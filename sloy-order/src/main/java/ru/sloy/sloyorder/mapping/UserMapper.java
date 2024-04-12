package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.model.UserEntity;

import java.util.stream.Collectors;

public class UserMapper {
    UserEntity toEntity(User object) {
        UserEntity entity = new UserEntity();

        entity.setUserId(object.getUserId());
        entity.setOrders(object
                .getOrders()
                .stream()
                .map(OrderMapper::toEntity)
                .collect(Collectors.toList()));

        return entity;
    }

    User fromEntity(UserEntity entity) {
        User object = new User();
        object.setUserId(entity.getUserId());
        object.setOrders(entity
                .getOrders()
                .stream()
                .map(OrderMapper::fromEntity)
                .collect(Collectors.toList()));

        return object;
    }
}
