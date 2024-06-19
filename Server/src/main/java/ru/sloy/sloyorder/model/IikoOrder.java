package ru.sloy.sloyorder.model;

import lombok.Builder;

import java.util.List;

@Builder
public class IikoOrder {
    private List<itemsInner> items;

    public record itemsInner(String itemId, Integer itemNumber) {
    }

    private Integer id;
    private String comment;
    private String time;
}
