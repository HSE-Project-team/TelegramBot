package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class IikoOrder {
    private List<IikoOrderItem> items;
    private Integer id;
    private String comment;
    private String time; //не обязательно

    public IikoOrder(List<IikoOrderItem> items, Integer id, String comment, String time) {
        this.id = id;
        this.comment = comment;
        this.time = time;
        this.items = items;
    }

    public IikoOrder(List<IikoOrderItem> items, Integer id, String comment) {
        this.id = id;
        this.comment = comment;
        this.items = items;
    }
}
