package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.AvaliableTimesApi;
import ru.sloy.sloyorder.model.AvaliableTimes;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.service.UserService;

@RestController
public class AvaliableTimesApiController implements AvaliableTimesApi {

    @Override
    public ResponseEntity<AvaliableTimes> getAvaliableTimes() {
        return null;
    }

    @Override
    public ResponseEntity<Void> postAvaliableTimes(AvaliableTimes avaliableTimes) {
        return null;
    }
}
