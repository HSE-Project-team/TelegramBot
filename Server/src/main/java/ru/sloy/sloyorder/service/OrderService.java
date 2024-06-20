package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.OrderMapper;
import ru.sloy.sloyorder.model.*;
import ru.sloy.sloyorder.repository.ItemRepository;
import ru.sloy.sloyorder.repository.OrderRepository;
import ru.sloy.sloyorder.repository.TimeRepository;
import ru.sloy.sloyorder.repository.UserRepository;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrderService {
    @Autowired
    private final TimeRepository timeRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ItemRepository itemRepository;
    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final PaymentService paymentService;
    @Autowired
    private final IikoService iikoService;

    public Integer addOrder(RawOrder rawOrder) throws IllegalArgumentException {
        TimeEntity time = timeRepository.findByTime(rawOrder.getTime());


        Optional<UserEntity> userEntityOptional = userRepository.findById(rawOrder.getUserId());
        UserEntity user;
        if (userEntityOptional.isEmpty()) {
            user = new UserEntity();
            user.setId(rawOrder.getUserId());
            userRepository.save(user);
        } else {
            user = userEntityOptional.get();
        }

        OrderEntity order = OrderMapper.toEntity(rawOrder, userRepository, itemRepository);

        timeRepository.delete(time);

        order.setIikoId(iikoService.createOrder(order));
        order.setPaymentId(paymentService.createPayment(order));


        user.getOrders().add(order);
        userRepository.save(user);

        return order.getId();
    }

    public String getPaymentLink(Integer orderId) {
        Optional<OrderEntity> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()){
            throw new IllegalArgumentException("An order with this id was not found");
        }
        return paymentService.getPaymentLink(optionalOrder.get().getPaymentId());
    }

    @Scheduled(fixedRate = 5000) // interval in milliseconds
    public void updateOrdersStatus() {
        orderRepository.findAllByStatus(FullOrder.StatusEnum.WAITING_FOR_PAYMENT).forEach(order -> {
            FullOrder.StatusEnum newStatus = paymentService.getPaymentStatus(order.getPaymentId());
            if (newStatus.equals(FullOrder.StatusEnum.WAITING_FOR_PAYMENT)) {
                order.setStatus(newStatus);
                orderRepository.save(order);
            }
        });

        orderRepository.findAllByStatus(FullOrder.StatusEnum.PAID_AND_PREPARING).forEach(order -> {
            FullOrder.StatusEnum newStatus = iikoService.getOrderStatus(order.getIikoId());
            if (newStatus.equals(FullOrder.StatusEnum.PAID_AND_PREPARING)) {
                order.setStatus(newStatus);
                orderRepository.save(order);
            }
        });

        orderRepository.findAllByStatus(FullOrder.StatusEnum.READY).forEach(order -> {
            FullOrder.StatusEnum newStatus = iikoService.getOrderStatus(order.getIikoId());
            if (newStatus.equals(FullOrder.StatusEnum.READY)) {
                order.setStatus(newStatus);
                orderRepository.save(order);
            }
        });
    }


}
