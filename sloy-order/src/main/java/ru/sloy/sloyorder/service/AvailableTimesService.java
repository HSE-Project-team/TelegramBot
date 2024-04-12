package ru.sloy.sloyorder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.AvailableTimes;
import ru.sloy.sloyorder.repository.AvailableTimesRepository;
import ru.sloy.sloyorder.repository.DataRepository;


@Service
public class AvailableTimesService {
    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    public AvailableTimes getAvailableTimes() {
        AvailableTimes availableTimes = new AvailableTimes();
        availableTimes.setTimes(availableTimesRepository.findAll());
        return availableTimes;
    }

    public void postAvailableTimes(AvailableTimes newAvailableTimes) {
        availableTimesRepository.deleteAll();
        availableTimesRepository.saveAll(newAvailableTimes.getTimes());
    }

}
