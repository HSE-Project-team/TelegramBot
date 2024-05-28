package ru.sloy.sloyorder.service;

import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.OrderEntity;

public interface PaymentServiceInterface {
    /**
     * Создает оплату для заказа возвращает её идентификатор.
     *
     * @param order заказ
     * @return идентификатор оплаты
     */
    public Integer createPayment(OrderEntity order);

    /**
     * Возвращает ссылку для оплаты заказа по её идентификатору
     *
     * @param id идентификатор заказа
     * @return статус заказа
     */
    public String getPaymentLink(Integer id);

    /**
     * Возвращает актуальный статус оплаты по её идентификатору
     *
     * @param id идентификатор заказа
     * @return статус заказа
     */
    public FullOrder.StatusEnum getPaymentStatus(Integer id);

}
