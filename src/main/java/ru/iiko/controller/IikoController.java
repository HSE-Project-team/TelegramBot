package ru.iiko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.iiko.mapping.IIkoOrderMapper;
import ru.iiko.model.DeliveryOrder;
import ru.iiko.model.IikoOrder;
import ru.iiko.model.OrderEntity;
import ru.iiko.service.IikoService;
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

//    @PostMapping("/createOrder")
//    public ResponseEntity<String> createOrder(@RequestBody String json) {
//        OrderEntity order = IikoService.jsonToOrder(json);
//        String orderId = iikoService.createOrder(order);
//        String jsonResponse = "{\"orderId\": \"" + orderId + "\"}";
//        return ResponseEntity.ok(jsonResponse);
//    }

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestBody String json) {
        OrderEntity order = IikoService.jsonToOrder(json);
        String orderId = iikoService.createDelivery(order);
        String jsonResponse = "{\"orderId\": \"" + orderId + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }

    @PostMapping("/createIikoOrder")
    public ResponseEntity<String> createIikoOrder(@RequestBody String json) {
        IikoOrder iikoOrder = IikoService.jsonToIikoOrder(json);
        DeliveryOrder deliveryOrder = IIkoOrderMapper.toDeliveryOrder(iikoOrder);
        String orderId = iikoService.createIikoDelivery(deliveryOrder);
        String jsonResponse = "{\"orderId\": \"" + orderId + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }

    @PostMapping("/getStatus")
    public ResponseEntity<String> getStatus(@RequestBody String json) {
        String orderId = IikoService.jsonToId(json);
        String orderStatus = iikoService.getDeliveryStatusById(orderId);
        String jsonResponse = "{\"status\": \"" + orderStatus + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }
}
