package ru.sloy.sloyorder.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.OrderEntity;


@Service
public class PaymentService {
    private final String paymentServiceUrl = "http://localhost:5000";
    private final WebClient webClient = WebClient.create(paymentServiceUrl);

    public Integer createPayment(OrderEntity order) {
        return 0;
//        return webClient.post()
//                .uri("/create_payment")
//                .bodyValue(new PaymentData(order.getOrderCost()))
//                .retrieve()
//                .bodyToMono(Integer.class).block();
    }

    private record PaymentData(double value) {
    }


    public String getPaymentLink(Integer id) {
        return "Not implemented";
//        return webClient.get()
//                .uri("/payment_link/" + id)
//                .retrieve()
//                .bodyToMono(String.class).block();
    }

    public FullOrder.StatusEnum getPaymentStatus(Integer id) {
//        return FullOrder.StatusEnum.WAITING_FOR_PAYMENT;
        return webClient.get()
                .uri("/payment_status/" + id)
                .retrieve()
                .bodyToMono(FullOrder.StatusEnum.class).block();
    }

}
