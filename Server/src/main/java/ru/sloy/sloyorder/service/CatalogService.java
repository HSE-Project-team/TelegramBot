package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.ItemMapper;
import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.Item;
import ru.sloy.sloyorder.model.ItemEntity;
import ru.sloy.sloyorder.model.RawItem;
import ru.sloy.sloyorder.repository.ItemRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor

public class CatalogService {
    @Autowired
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
        List<Item> items = itemRepository.findAllByItemCategory(category).stream().map(ItemMapper::fromEntity).toList();
        catalog.setItems(items);
        catalog.setSize(items.size());
        return catalog;
    }

    public List<String> getCategories() {
        Set<String> setCategories = new HashSet<>();
        List<Item> items = itemRepository.findAll().stream().map(ItemMapper::fromEntity).toList();
        for (Item item : items) {
            setCategories.add(item.getItemCategory());
        }
        return setCategories.stream().toList();
    }


    public Integer addItem(RawItem rawItem) {
        ItemEntity item = ItemMapper.toEntity(rawItem);
        itemRepository.save(item);
        return item.getId();
    }

    public void deleteItemById(Integer id) throws IllegalArgumentException {

        Optional<ItemEntity> optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()) {
            throw new IllegalArgumentException("An item with this id " + id + " was not found");
        }

        ItemEntity item = optionalItem.get();
        item.setIsAvailable(Boolean.FALSE);
        itemRepository.save(item);

    }

}
