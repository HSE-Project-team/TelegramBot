package ru.sloy.sloyorder.service;

import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.model.*;
import ru.sloy.sloyorder.repoostiory.DataRepository;

import java.util.LinkedList;
import java.util.List;

import static ru.sloy.sloyorder.model.FullOrder.StatusEnum.WAITING_FOR_PAYMENT;

@Service
public class OrderService {
    public Integer addOrder(RawOrder rawOrder) {
        FullOrder fullOrder = new FullOrder();
        fullOrder.setOrderCost(rawOrder.getOrderCost());
        fullOrder.setComment(rawOrder.getComment());
        List<FullOrderItemsInner> itemList = new LinkedList<>();

        for (RawOrderItemsInner itemIdWithNumber : rawOrder.getItems()) {
            FullOrderItemsInner itemWithNumber = new FullOrderItemsInner();
            itemWithNumber.setItem(DataRepository.getItemById(itemIdWithNumber.getItemId()));
            itemWithNumber.setItemNumber(itemWithNumber.getItemNumber());
            itemList.add(itemWithNumber);
        }

        fullOrder.setItems(itemList);

        fullOrder.setTime(rawOrder.getTime());
        DataRepository.deleteAvaliableTime(rawOrder.getTime());

        fullOrder.setOrderId(DataRepository.getIdForNewOrder());
        fullOrder.setStatus(WAITING_FOR_PAYMENT);

        DataRepository.addOrder(fullOrder);
        return fullOrder.getOrderId();
    }


}
