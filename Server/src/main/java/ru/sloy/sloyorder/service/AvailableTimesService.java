package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.AvailableTimes;
import ru.sloy.sloyorder.model.TimeEntity;
import ru.sloy.sloyorder.repository.TimeRepository;
import ru.sloy.sloyorder.validation.TimeFormatValidator;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AvailableTimesService {

    @Autowired
    private final TimeRepository timeRepository;

    public AvailableTimes getAvailableTimes() {
        return new AvailableTimes().times(timeRepository.findAll().stream().map(TimeEntity::getTime).collect(Collectors.toList()));
    }

    public void postAvailableTimes(AvailableTimes newAvailableTimes) throws IllegalArgumentException {

        List<TimeEntity> timeEntityList = newAvailableTimes.getTimes().stream().map(x -> {
            if (!TimeFormatValidator.isValidString(x)){
                throw new IllegalArgumentException("Invalid time format");
            }
            TimeEntity time = new TimeEntity();
            time.setTime(x);
            return time;
        }).toList();
        timeRepository.deleteAll();
        timeRepository.saveAll(timeEntityList);
    }

}
