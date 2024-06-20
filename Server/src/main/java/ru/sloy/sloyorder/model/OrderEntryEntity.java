package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class OrderEntryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_entity_id")
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "item_entity_id")
    private ItemEntity item;

    private Integer itemNumber;
}
