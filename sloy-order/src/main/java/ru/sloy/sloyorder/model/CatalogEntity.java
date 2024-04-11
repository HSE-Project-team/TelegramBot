package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CatalogEntity {

    private Integer size;

    private List<ItemEntity> items = new ArrayList<>();

}
