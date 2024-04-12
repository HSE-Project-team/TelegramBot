package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    private String itemName;
    private Integer itemCost;
}
