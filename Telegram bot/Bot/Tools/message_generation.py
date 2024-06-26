import requests
from requests import RequestException

from Tools.auxiliary_functions import normalize_time, make_json_for_server
from dataclasses import dataclass
from Lexicon.lexicon import Lexicon


@dataclass
class UserOrder:
    link_for_payment: str
    order_id: int
    string_for_user: str


def active_orders_message_generate(user_active_orders_url):
    print("user_active_orders_url", user_active_orders_url)
    user_orders = requests.get(user_active_orders_url).json()["orders"]
    string_for_user = Lexicon.active_orders_heading + "\n\n\n"
    no_active_orders = True
    have_ready_orders = False
    for order in user_orders:
        if order['status'] in ["waiting for payment", "paid and preparing", "ready"]:
            if order['status'] == "ready":
                have_ready_orders = True
            no_active_orders = False
            string_for_user += (f"☕️ *ID {order['orderId']} (заказ на {normalize_time(order['time'])})"
                                f" — {Lexicon.payment_status[order['status']]}*\n\nЗаказ на сумму {order['orderCost']} ₽:\n")
            for item in order['items']:
                string_for_user += f"• {item['item']['itemName']} ({item['itemNumber']} шт.) – {item['item']['itemCost']} ₽\n"
            string_for_user += "\n\n"
    if have_ready_orders:
        string_for_user += Lexicon.instructions_for_receiving
    if no_active_orders:
        string_for_user = Lexicon.no_active_orders
    return string_for_user


def new_order_message_generate(json_from_bot, user_id, first_name, ready_order_url):
    json_for_server = make_json_for_server(json_from_bot, user_id)
    request_value = 0
    link_for_payment = None
    order_id = None
    try:
        request_value = requests.post(ready_order_url, json=json_for_server)
        print(ready_order_url)
        print("json_for_server:")
        print(json_for_server)
        print("json on server:")
        print(request_value.json())
        print("status code:")
        print(request_value.status_code)
        link_for_payment = request_value.json()["paymentLink"]
        order_id = request_value.json()["orderId"]

        string_for_user = _new_order_message_generate_success(json_from_bot, first_name, user_id, order_id)

    except RequestException as err:
        print(f"Ошибка: {err}")
        string_for_user = f"Ошибка {request_value.status_code}.\nПовторите попытку позже."
        print(string_for_user)
    return UserOrder(link_for_payment=link_for_payment,
                     order_id=order_id,
                     string_for_user=string_for_user)


def _new_order_message_generate_success(json_from_bot, first_name, user_id, order_id):
    string_for_user = (
        f"*{first_name}, бот принял твой заказ 😌️️️️️️\n\nТеперь нужно оплатить – нажми на кнопку, "
        f"прикреплённую к этому сообщению.*\n\nЗаказ:\n")
    for item in json_from_bot["items"]:
        string_for_user += f"• {item['itemName']} ({item['itemNumber']} шт.) – {item['itemCost']} ₽\n"
    string_for_user += f"\n_Заказ будет готов к {normalize_time(json_from_bot['time'])}_.\n\n"
    string_for_user += f"_ID заказа: {order_id} — назови его при получении._\n\n"
    string_for_user += Lexicon.hint_about_orders_command
    return string_for_user
