import requests
from requests import RequestException

from Bot.Tools.auxiliary_functions import seconds_to_time, make_json_for_server
from dataclasses import dataclass


@dataclass
class UserOrder:
    link_for_payment: str
    order_id: int
    string_for_user: str


def active_orders_message_generate(user_active_orders_url):
    user_orders_json = requests.get(user_active_orders_url).json()["orders"]
    string_for_user = "🍽 *Активные заказы:*\n\n\n"
    for order in user_orders_json:
        if order['status'] == "waiting for payment":
            string_for_user += f"☕️ _ID {order['orderId']} (заказ на {seconds_to_time(order['time'])})_\n"
            for item in order['items']:
                string_for_user += f"• {item['item']['itemName']} ({item['itemNumber']} шт.) – {item['item']['itemCost']} ₽\n"
            string_for_user += f"\nСумма заказа: {order['orderCost']} ₽\n"
            string_for_user += f"Статус заказа: {order['status']}\n\n\n"
    return string_for_user


def new_order_message_generate(json_from_bot, user_id, first_name, ready_order_url):
    json_for_server = make_json_for_server(json_from_bot, user_id)
    request_value = 0
    link_for_payment = None
    order_id = None
    try:
        request_value = requests.post(ready_order_url, json=json_for_server)
        link_for_payment = request_value.json()["json"]
        order_id = 6892
        print(request_value.json()["json"])

        print(request_value.status_code)

        string_for_user = _new_order_message_generate_success(json_from_bot, first_name, user_id, order_id)
        string_for_user += f"\n\njson_from_bot: {json_from_bot}\n\njson_for_server: {json_for_server}"

    except RequestException as err:
        print(f"Ошибка: {err}")
        string_for_user = f"Ошибка {request_value.status_code}.\nПовторите попытку позже."
        print(string_for_user)
    return UserOrder(link_for_payment=link_for_payment,
                     order_id=order_id,
                     string_for_user=string_for_user)


def _new_order_message_generate_success(json_from_bot, first_name, user_id, order_id):
    string_for_user = f"{first_name}, бот принял Ваш заказ. Вы заказали:\n"
    for item in json_from_bot["items"]:
        string_for_user += f"• {item['itemName']} ({item['itemNumber']} шт.) – {item['itemCost']} ₽ (ID продукта: {item['itemId']})\n"
    string_for_user += f"\nСумма заказа: {json_from_bot['orderCost']} ₽\n"
    string_for_user += f"Время заказа: {seconds_to_time(json_from_bot['time'])}\n"
    string_for_user += f"ID аккаунта: {user_id}\n"
    string_for_user += f"ID заказа: {order_id} — назовите его при получении\n"
    return string_for_user
