package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.OrderMapper;
import ru.sloy.sloyorder.model.OrderEntity;
import ru.sloy.sloyorder.model.RawOrder;
import ru.sloy.sloyorder.model.TimeEntity;
import ru.sloy.sloyorder.model.UserEntity;
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

    public Integer addOrder(RawOrder rawOrder) {


        TimeEntity time = timeRepository.findByTime(rawOrder.getTime());
        timeRepository.delete(time);


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


        order.setIikoId(iikoService.createOrder(order));
        order.setPaymentId(paymentService.createPayment(order));


        user.getOrders().add(order);
        userRepository.save(user);

        return order.getId();
    }

    public String getPaymentLink(Integer orderId) {
        return paymentService.getPaymentLink(orderRepository.findById(orderId).get().getPaymentId());
    }


}
