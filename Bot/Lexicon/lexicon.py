from dataclasses import dataclass


@dataclass
class Lexicon:
    start_message = ("Привет! 👋\n\nЧтобы сделать заказ, нажми на кнопку *«Сделать новый заказ»* внизу экрана."
                     "\n\nЕсли такой кнопки нет, нажми на квадратную иконку "
                     "с четырьмя кружочками в поле ввода сообщения — тогда нужная кнопка появится.")
    new_order_button = "Сделать новый заказ"
    show_all_orders = "Посмотреть все заказы"
    pay_for_order_button = "Оплатить заказ"
    hint_about_orders_command = "ℹ️ Статус заказа можно посмотреть с помощью команды /orders."
    active_orders_heading = "🍽 *Активные заказы:*"
    instructions_for_receiving = "ℹ️ Чтобы получить заказ, назови ID заказа на кассе."
    no_active_orders = "🍽 Нет активных заказов."
    payment_status = {
        "waiting for payment": "ожидает оплаты ⌛️",
        "paid and preparing": "оплачен и уже готовится 💫",
        "ready": "можно забирать ✅"
    }
