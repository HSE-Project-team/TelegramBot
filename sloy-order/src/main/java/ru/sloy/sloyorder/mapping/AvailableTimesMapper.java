package ru.sloy.sloyorder.mapping;

import ru.sloy.sloyorder.model.AvailableTimes;
import ru.sloy.sloyorder.model.AvailableTimesEntity;

public class AvailableTimesMapper {
    public static AvailableTimesEntity toEntity(AvailableTimes object) {
        AvailableTimesEntity entity = new AvailableTimesEntity();
        entity.setAvailableTimes(object.getTimes());
        return entity;
    }


    public static AvailableTimes fromEntity(AvailableTimesEntity entity) {
        AvailableTimes object = new AvailableTimes();
        object.setTimes(entity.getAvailableTimes());
        return object;
    }
}
