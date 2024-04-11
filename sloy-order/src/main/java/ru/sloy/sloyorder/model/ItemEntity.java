package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemEntity {

    private String itemName;
    private Integer itemId;
    private Integer itemCost;
}
