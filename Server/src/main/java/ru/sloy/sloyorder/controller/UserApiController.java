package ru.sloy.sloyorder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.UserApi;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.service.UserService;

@RestController
public class UserApiController implements UserApi {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<User> getUserById(Integer id) {
        try {
            return ResponseEntity.ok(userService.getUserById(id));
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
