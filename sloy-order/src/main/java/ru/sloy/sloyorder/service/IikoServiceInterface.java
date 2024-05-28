package ru.sloy.sloyorder.service;

import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.OrderEntity;

import javax.swing.text.html.parser.Entity;

public interface IikoServiceInterface {

    /**
     * Создает новый заказ в iiko и возвращает его идентификатор.
     *
     * @param order заказ
     * @return идентификатор созданного заказа
     */
    public Integer createOrder(OrderEntity order);

    /**
     * Возвращает актуальный статус заказа по его идентификатору, при условии, что он уже оплачен.
     *
     * @param id идентификатор заказа
     * @return статус заказа
     */
    public FullOrder.StatusEnum getOrderStatus(Integer id);

}
