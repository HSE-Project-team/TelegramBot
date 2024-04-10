package ru.sloy.sloyorder.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.Item;
import ru.sloy.sloyorder.model.RawItem;
import ru.sloy.sloyorder.repoostiory.DataRepository;

@Service
public class CatalogService {
    public Catalog getCatalog() {
        return new Catalog();
    }

    Item createItemFromRawItem (RawItem rawItem) {
        Item item = new Item();
        item.setItemCost(rawItem.getItemCost());
        item.setItemName(rawItem.getItemName());
        item.setItemId(DataRepository.getIdForNewItem());
        return item;
    }
    public Integer addItem(RawItem rawItem) {
        Item item = createItemFromRawItem(rawItem);
        DataRepository.addItem(item);
        return item.getItemId();
    }

    public void deleteItemById(Integer id){
       DataRepository.deleteItemById(id);
    }

}
