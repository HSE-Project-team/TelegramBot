package ru.sloy.sloyorder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sloy.sloyorder.model.OrderEntity;
import ru.sloy.sloyorder.service.IikoService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/iiko")
public class IikoController {
    @Autowired
    private IikoService iikoService;

    @GetMapping("/testOrder")
    public void doTestOrder() {
        iikoService.doTestOrder();
    }

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestBody String json) {
        OrderEntity order = IikoService.jsonToOrder(json);
        String orderId = iikoService.createOrder(order);
        String jsonResponse = "{\"orderId\": \"" + orderId + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }
}
