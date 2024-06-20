package ru.sloy.sloyorder.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.OrderEntity;

@Service
public class IikoService {

//    private final String iikoServiceUrl = "?";
//    WebClient webClient = WebClient.create(iikoServiceUrl);

    public Integer createOrder(OrderEntity order) {
        return 0;
//        return webClient.post()
//                .uri("/createOrder")
//                .bodyValue(IikoOrderMapper.fromEntity(order))
//                .retrieve()
//                .bodyToMono(Integer.class).block();
    }

    public FullOrder.StatusEnum getOrderStatus(Integer iikoId) {
        return FullOrder.StatusEnum.PAID_AND_PREPARING;
//        return webClient.get()
//                .uri("/getStatus/" + iikoId)
//                .retrieve()
//                .bodyToMono(FullOrder.StatusEnum.class).block();
    }


}
