package ru.iiko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.iiko.mapping.IIkoOrderMapper;
import ru.iiko.model.DeliveryOrder;
import ru.iiko.model.IikoOrder;
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

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestBody String json) {
        IikoOrder iikoOrder = IikoService.jsonToIikoOrder(json);
        DeliveryOrder deliveryOrder = IIkoOrderMapper.toDeliveryOrder(iikoOrder);
        String orderId = iikoService.createIikoDelivery(deliveryOrder);
        String jsonResponse = "{\"id\": \"" + orderId + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }

    @GetMapping("/getStatus")
    public ResponseEntity<String> getStatus(@RequestParam("id") String orderId) {
        String orderStatus = iikoService.getDeliveryStatusById(orderId);
        String jsonResponse = "{\"status\": \"" + orderStatus + "\"}";
        return ResponseEntity.ok(jsonResponse);
    }
}
