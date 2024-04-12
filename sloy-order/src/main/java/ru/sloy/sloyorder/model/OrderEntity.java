package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class OrderEntity {
    private Integer time;
    private Integer userId;
    private Integer orderId;

    @Getter
    @Setter
    static class Entry {
        private Integer itemId;
        private Integer itemNumber;
    }

    private List<Entry> items = new ArrayList<>();
    private Integer orderCost;
    private String comment;


    private FullOrder.StatusEnum status;

}
