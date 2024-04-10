package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.OrderApi;
import ru.sloy.sloyorder.endpoint.UserApi;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.service.CatalogService;
import ru.sloy.sloyorder.service.OrderService;
import ru.sloy.sloyorder.service.UserService;

@RestController
public class OrderApiController implements OrderApi {

    private final OrderService orderService;

    public OrderApiController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public ResponseEntity<Integer> addOrder(RawOrder rawOrder) {
        return null;
    }

    @Override
    public ResponseEntity<FullOrder> getOrderById(Integer id) {
        return null;
    }
}
