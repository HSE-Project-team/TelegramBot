package ru.sloy.sloyorder.service;

import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.AvaliableTimes;
import ru.sloy.sloyorder.repoostiory.DataRepository;


@Service
public class AvaliableTimesService {
    public AvaliableTimes getAvaliableTimes() {
        AvaliableTimes avaliableTimes = new AvaliableTimes();
        avaliableTimes.setTimes(DataRepository.getAvaliableTimes());
        return avaliableTimes;
    }

    public void postAvaliableTimes(AvaliableTimes newAvaliableTimes) {
        DataRepository.setAvaliableTimes(newAvaliableTimes);
    }

}
