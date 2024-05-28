from dataclasses import dataclass


@dataclass
class Lexicon:
    start_message = "Привет!"
    new_order_button = "Сделать новый заказ"
    show_all_orders = "Посмотреть все заказы"
    pay_for_order_button = "Оплатить заказ"
