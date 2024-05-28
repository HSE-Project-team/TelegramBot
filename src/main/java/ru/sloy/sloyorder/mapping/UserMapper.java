package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.model.UserEntity;

import java.util.stream.Collectors;

public class UserMapper {

    public static User fromEntity(UserEntity entity) {
        User object = new User();
        object.setUserId(entity.getId());
        object.setOrders(entity
                .getOrders()
                .stream()
                .map(OrderMapper::fromEntity)
                .collect(Collectors.toList()));

        return object;
    }
}
