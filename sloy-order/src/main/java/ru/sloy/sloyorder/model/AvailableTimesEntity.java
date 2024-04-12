package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class AvailableTimesEntity {

    @ElementCollection
    @CollectionTable
    private List<Integer> availableTimes = new ArrayList<>();

}
