package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.OrderEntryEntity;

@Repository
public interface OrderEntryRepository extends JpaRepository<OrderEntryEntity, Integer> {
}


