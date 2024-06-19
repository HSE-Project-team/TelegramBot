package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String itemName;
    private Integer itemCost;
    private String itemCategory;
    private Boolean isAvailable;
}
