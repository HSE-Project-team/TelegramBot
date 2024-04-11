package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.AvaliableTimesApi;
import ru.sloy.sloyorder.model.AvaliableTimes;
import ru.sloy.sloyorder.service.AvaliableTimesService;


@RestController
public class AvaliableTimesApiController implements AvaliableTimesApi {

    private final AvaliableTimesService avaliableTimesService;

    public AvaliableTimesApiController(AvaliableTimesService avaliableTimesService) {
        this.avaliableTimesService = avaliableTimesService;
    }

    @Override
    public ResponseEntity<AvaliableTimes> getAvaliableTimes() {
        return ResponseEntity.ok(avaliableTimesService.getAvaliableTimes());
    }

    @Override
    public ResponseEntity<Void> postAvaliableTimes(AvaliableTimes avaliableTimes) {
        avaliableTimesService.postAvaliableTimes(avaliableTimes);
        return ResponseEntity.noContent().build();
    }
}
