package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderEntity {
    private Integer time;
    private Integer userId;
    private Integer orderId;

    static class Entry {
        Integer itemId;
        Integer itemNumber;
    }

    private List<Entry> items = new ArrayList<>();
    private Integer orderCost;
    private String comment;

    public enum StatusEnum {
        WAITING_FOR_PAYMENT,
        PAID_AND_PREPARING,
        READY,
        RECEIVED,
        CANCELLED;
    }

    private String value;

}
