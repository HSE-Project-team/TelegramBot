package ru.sloy.sloyorder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.OrderApi;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.service.OrderService;

@RestController
public class OrderApiController implements OrderApi {

    private final OrderService orderService;

    public OrderApiController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public ResponseEntity<Integer> addOrder(RawOrder rawOrder) {
        try {
            return ResponseEntity.ok(orderService.addOrder(rawOrder));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @Override
    public ResponseEntity<String> getPaymentLinkByOrderId(Integer id) {
        try {
            return ResponseEntity.ok(orderService.getPaymentLink(id));
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
