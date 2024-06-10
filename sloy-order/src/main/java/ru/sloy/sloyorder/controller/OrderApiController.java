package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.OrderApi;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.service.OrderService;

@RestController
@CrossOrigin
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
    public ResponseEntity<String> getPaymentLinkByOrderId(Integer id) {
        return ResponseEntity.ok(orderService.getPaymentLink(id));
    }

}