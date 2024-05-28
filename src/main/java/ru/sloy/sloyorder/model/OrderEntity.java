package ru.sloy.sloyorder.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer time;

    @ManyToOne
    @JoinColumn(name = "user_entity_id")
    private UserEntity user;

    @Getter
    @Setter
    @Embeddable
    public static class Entry {
        private ItemEntity item;
        private Integer itemNumber;
    }

    @Embedded
    private List<Entry> items = new ArrayList<>();
    private Integer orderCost;
    private String comment;


    private FullOrder.StatusEnum status;

}
