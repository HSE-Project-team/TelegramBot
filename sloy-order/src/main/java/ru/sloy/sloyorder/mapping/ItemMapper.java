package ru.sloy.sloyorder.mapping;


import ru.sloy.sloyorder.model.Item;
import ru.sloy.sloyorder.model.ItemEntity;

public class ItemMapper {

    public static ItemEntity toEntity(Item object) {
        ItemEntity entity = new ItemEntity();
        entity.setItemId(object.getItemId());
        entity.setItemName(object.getItemName());
        entity.setItemCost(object.getItemCost());
        return entity;
    }

    public static Item fromEntity(ItemEntity entity) {
        Item object = new Item();
        object.setItemId(entity.getItemId());
        object.setItemName(entity.getItemName());
        entity.setItemCost(entity.getItemCost());
        return object;
    }

}
