package ru.sloy.sloyorder.mapping;


import ru.sloy.sloyorder.model.Item;
import ru.sloy.sloyorder.model.ItemEntity;
import ru.sloy.sloyorder.model.RawItem;

public class ItemMapper {

    public static Item fromEntity(ItemEntity entity) {
        Item object = new Item();

        object.setItemId(entity.getId());
        object.setItemName(entity.getItemName());
        object.setItemCost(entity.getItemCost());
        object.setItemCategory(entity.getItemCategory());
        object.setIsAvailable(entity.getIsAvailable());

        return object;
    }

    public static ItemEntity toEntity(RawItem object) {
        ItemEntity entity = new ItemEntity();

//        entity.setId(object.getItemId()); // auto generated id

        entity.setItemName(object.getItemName());
        entity.setItemCost(object.getItemCost());
        entity.setItemCategory(object.getItemCategory());
        entity.setIsAvailable(true);
        entity.setIikoId(object.getIikoId());

        return entity;
    }


}
