package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.UserMapper;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserById(Integer id) {
        return UserMapper.fromEntity(userRepository.findById(id).get());
    }
}
