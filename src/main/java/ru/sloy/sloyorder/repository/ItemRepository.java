package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.ItemEntity;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Integer> {
    List<ItemEntity> findAllByItemCategory(String itemCategory);
}
