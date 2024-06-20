package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.UserMapper;
import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.User;
import ru.sloy.sloyorder.model.UserEntity;
import ru.sloy.sloyorder.repository.OrderRepository;
import ru.sloy.sloyorder.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final PaymentService paymentService;
    @Autowired
    private final IikoService iikoService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;

    public User getUserById(Integer id) throws IllegalArgumentException {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()){
            throw  new IllegalArgumentException("The user with this id was not found");
        }
        UserEntity user = optionalUser.get();
        user.getOrders().forEach(order -> {
            FullOrder.StatusEnum status = order.getStatus();
            FullOrder.StatusEnum newStatus = null;
            switch (status) {
                case CANCELLED:
                case RECEIVED:
                    return;
                case WAITING_FOR_PAYMENT:
                    newStatus = paymentService.getPaymentStatus(order.getPaymentId());
                    break;
                case READY:
                case PAID_AND_PREPARING:
                    newStatus = iikoService.getOrderStatus(order.getIikoId());
                    break;
            }

            if (!newStatus.equals(status)) {
                order.setStatus(newStatus);
                orderRepository.save(order);
            }
        });

        return UserMapper.fromEntity(user);
    }
}
