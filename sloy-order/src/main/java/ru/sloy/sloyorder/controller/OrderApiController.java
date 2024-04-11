package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.OrderApi;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.repoostiory.DataRepository;
import ru.sloy.sloyorder.service.OrderService;

@RestController
public class OrderApiController implements OrderApi {

    private final OrderService orderService;

    public OrderApiController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public ResponseEntity<Integer> addOrder(RawOrder rawOrder) {
        return ResponseEntity.ok(orderService.addOrder(rawOrder));
    }

    @Override
    public ResponseEntity<FullOrder> getOrderById(Integer id) {
        return ResponseEntity.ok(DataRepository.getOrderById(id));
    }
}
