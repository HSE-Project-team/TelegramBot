package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryOrderItem {
    @Setter
    @Getter
    private String productId;
    private String type;
    @Setter
    @Getter
    private Integer amount;

    public DeliveryOrderItem(String productId, Integer amount) {
        this.productId = productId;
        this.type = "Product";
        this.amount = amount;
    }
}
