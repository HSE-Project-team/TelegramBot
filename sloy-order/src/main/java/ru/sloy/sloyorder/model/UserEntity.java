package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class UserEntity {

    private Integer userId;
    private List<OrderEntity> orders = new ArrayList<>();
}
