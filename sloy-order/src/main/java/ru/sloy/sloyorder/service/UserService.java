package ru.sloy.sloyorder.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.repoostiory.DataRepository;

@Service
public class UserService {
    public User getUserById(Integer id) {
        return DataRepository.getUserById(id);
    }

    public void deleteUserById(Integer id) {
        DataRepository.deleteUserById(id);
    }
}
