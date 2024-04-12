package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AvailableTimesRepository extends JpaRepository<Integer, Long>  {

}
