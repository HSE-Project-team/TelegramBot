package ru.sloy.sloyorder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sloy.sloyorder.mapping.ItemMapper;
import ru.sloy.sloyorder.mapping.OrderMapper;
import ru.sloy.sloyorder.model.*;
import ru.sloy.sloyorder.repository.ItemRepository;
import ru.sloy.sloyorder.repository.TimeRepository;
import ru.sloy.sloyorder.repository.UserRepository;

import static ru.sloy.sloyorder.model.FullOrder.StatusEnum.WAITING_FOR_PAYMENT;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final TimeRepository timeRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    public Integer addOrder(RawOrder rawOrder) {



        TimeEntity time = timeRepository.findByTime(rawOrder.getTime());
        timeRepository.delete(time);

        UserEntity user = userRepository.findById(rawOrder.getUserId()).get();

        OrderEntity order = OrderMapper.toEntity(rawOrder, userRepository, itemRepository);

        user.getOrders().add(order);

        userRepository.save(user);

        return order.getId();
    }


}
