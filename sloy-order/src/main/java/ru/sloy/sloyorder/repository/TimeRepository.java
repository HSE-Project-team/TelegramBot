package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.TimeEntity;


@Repository
public interface TimeRepository extends JpaRepository<TimeEntity, Integer> {
    TimeEntity findByTime(Integer time);
}
