package ru.sloy.sloyorder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.*;
import ru.sloy.sloyorder.repository.AvailableTimesRepository;
import ru.sloy.sloyorder.repository.DataRepository;

import java.util.ArrayList;
import java.util.List;

import static ru.sloy.sloyorder.model.FullOrder.StatusEnum.WAITING_FOR_PAYMENT;

@Service
public class OrderService {

    @Autowired
    private AvailableTimesRepository availableTimesRepository;

    public Integer addOrder(RawOrder rawOrder) {
        FullOrder fullOrder = new FullOrder();
        fullOrder.setOrderCost(rawOrder.getOrderCost());
        fullOrder.setComment(rawOrder.getComment());

        fullOrder.setItems(rawOrder.getItems());

        fullOrder.setTime(rawOrder.getTime());
        availableTimesRepository.delete(rawOrder.getTime()); //TODO

        fullOrder.setOrderId(DataRepository.getIdForNewOrder());
        fullOrder.setStatus(WAITING_FOR_PAYMENT);

        DataRepository.addOrder(fullOrder);
        return fullOrder.getOrderId();
    }


}
