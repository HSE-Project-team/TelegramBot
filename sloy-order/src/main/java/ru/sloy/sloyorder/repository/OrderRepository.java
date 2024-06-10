package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.OrderEntity;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findAllByStatus(FullOrder.StatusEnum status);
}
