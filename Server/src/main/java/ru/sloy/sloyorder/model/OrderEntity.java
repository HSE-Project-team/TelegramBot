package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String time;

    @ManyToOne
    @JoinColumn(name = "user_entity_id")
    private UserEntity user;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderEntryEntity> items = new ArrayList<>();
    private Integer orderCost;
    private String comment;


    private FullOrder.StatusEnum status;
    private Integer iikoId;
    private Integer paymentId;

}

