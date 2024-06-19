package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.AvailableTimesApi;
import ru.sloy.sloyorder.model.AvailableTimes;
import ru.sloy.sloyorder.service.AvailableTimesService;


@RestController
public class AvailableTimesApiController implements AvailableTimesApi {

    private final AvailableTimesService availableTimesService;

    public AvailableTimesApiController(AvailableTimesService availableTimesService) {
        this.availableTimesService = availableTimesService;
    }

    @Override
    public ResponseEntity<AvailableTimes> getAvailableTimes() {
        return ResponseEntity.ok(availableTimesService.getAvailableTimes());
    }

    @Override
    public ResponseEntity<Void> postAvailableTimes(AvailableTimes availableTimes) {
        availableTimesService.postAvailableTimes(availableTimes);
        return ResponseEntity.noContent().build();
    }
}
