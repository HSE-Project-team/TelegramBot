package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IikoOrderItem {
    private String itemId;
    private Integer itemNumber;

    public IikoOrderItem(String itemId, Integer itemNumber) {
        this.itemId = itemId;
        this.itemNumber = itemNumber;
    }
}
