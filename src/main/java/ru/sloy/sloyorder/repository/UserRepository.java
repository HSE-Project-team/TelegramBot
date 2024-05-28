package ru.sloy.sloyorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sloy.sloyorder.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}
