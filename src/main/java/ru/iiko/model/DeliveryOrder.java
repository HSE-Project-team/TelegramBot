package ru.iiko.model;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class DeliveryOrder {
    @Setter
    private Integer id;
    @Setter
    private String time;
    private final String phone = "+70000000000";
    private final String orderServiceType = "DeliveryByClient";
    @Setter
    private String comment;
    @Setter
    private Map<String, Integer> items = new HashMap<>();

}
