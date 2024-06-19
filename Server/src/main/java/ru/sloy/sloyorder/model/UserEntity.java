package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class UserEntity {
    @Id
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderEntity> orders = new ArrayList<>();
}
