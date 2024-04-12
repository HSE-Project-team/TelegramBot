package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.Entity;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
public class CatalogEntity {

    private Integer size;
    private Map<Integer, ItemEntity> items = new HashMap<>();

}
