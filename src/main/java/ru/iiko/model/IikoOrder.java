package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class IikoOrder {
    private List<itemsInner> items;
    private Integer id; //не обязательно
    private String comment;
    private String time;

    @Setter
    @Getter
    public static class itemsInner {
        private String itemId;
        private Integer itemNumber;

        public itemsInner(String itemId, Integer itemNumber) {
            this.itemId = itemId;
            this.itemNumber = itemNumber;
        }

    }
}
