package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserEntity {

    private Integer userId;
    private List<OrderEntity> orders = new ArrayList<>();
}
