package ru.sloy.sloyorder.model;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class AvaliableTimesEntity {
    private Set<Integer> items = new HashSet<>();

}
