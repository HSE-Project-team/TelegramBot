package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.ItemMapper;
import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.Item;
import ru.sloy.sloyorder.model.ItemEntity;
import ru.sloy.sloyorder.model.RawItem;
import ru.sloy.sloyorder.repository.ItemRepository;

import java.util.*;

@Service
@RequiredArgsConstructor

public class CatalogService {

    private final ItemRepository itemRepository;

    public Catalog getFullCatalog() {
        Catalog catalog = new Catalog();
        List<Item> items = itemRepository.findAll().stream().map(ItemMapper::fromEntity).toList();
        catalog.setItems(items);
        catalog.setSize(items.size());
        return catalog;
    }

    public Catalog getCatalogByCategory(String category) {
        Catalog catalog = new Catalog();
        List<Item> items = itemRepository.findAllByItemCategory(category).stream().map(ItemMapper::fromEntity).toList();;
        catalog.setItems(items);
        catalog.setSize(items.size());
        return catalog;
    }

    public List<String> getCategories() {
        Set<String> setCategories = new HashSet<>();
        List<Item> items = itemRepository.findAll().stream().map(ItemMapper::fromEntity).toList();;
        for (Item item : items) {
            setCategories.add(item.getItemCategory());
        }
        return setCategories.stream().toList();
    }

    Item createItemFromRawItem(RawItem rawItem) {
        Item item = new Item();

        item.setItemCost(rawItem.getItemCost());
        item.setItemName(rawItem.getItemName());
        item.setItemCategory(rawItem.getItemCategory());
        item.setIsAvailable(true);

        return item;
    }

    public Integer addItem(RawItem rawItem) {
        Item item = createItemFromRawItem(rawItem);
        itemRepository.save(ItemMapper.toEntity(item));
        return item.getItemId();
    }

    public void deleteItemById(Integer id) {
        ItemEntity item = itemRepository.findById(id).get();
        item.setIsAvailable(Boolean.FALSE);
        itemRepository.save(item);
    }

}
