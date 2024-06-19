package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DeliveryOrder {
    @Setter
    private Integer id;
    @Setter
    private String completeBefore = null; //не обязательно
    private final String phone = "+70000000000";
    private final String orderServiceType = "DeliveryByClient";
    @Setter
    private String comment;
    private List<DeliveryOrderItem> items = new ArrayList<>();

    public void setItems(List<IikoOrderItem> itemEntities) {
        this.items.clear();
        for (IikoOrderItem iikoOrderItem : itemEntities) {
            DeliveryOrderItem item = new DeliveryOrderItem(iikoOrderItem.getItemId(), iikoOrderItem.getItemNumber());
            this.items.add(item);
        }
    }

    public DeliveryOrder(Integer id, String completeBefore, String comment, List<IikoOrderItem> items) {
        this.id = id;
        this.completeBefore = completeBefore;
        this.comment = comment;
        setItems(items);
    }

    public DeliveryOrder(Integer id, String comment, List<IikoOrderItem> items) {
        this.id = id;
        this.comment = comment;
        setItems(items);
    }
}
