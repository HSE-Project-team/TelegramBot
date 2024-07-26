import datetime

from Tools.auxiliary_functions import normalize_time, make_json_for_server, get_data_from_server, post_data_to_server
from dataclasses import dataclass
from Lexicon.lexicon import Lexicon


@dataclass
class UserOrder:
    link_for_payment: str
    string_for_user: str


async def active_orders_message_generate(user_active_orders_url):
    print("user_active_orders_url", user_active_orders_url)
    response = await get_data_from_server(user_active_orders_url)
    if response[0] == 200:
        string_for_user = Lexicon.active_orders_heading + "\n\n\n"
        no_active_orders = True
        have_ready_orders = False
        user_orders = response[1]["orders"]
        for order in user_orders:
            if order['status'] in ["waiting for payment", "paid and preparing", "ready"]:
                if order['status'] == "ready":
                    have_ready_orders = True
                no_active_orders = False
                string_for_user += (f"☕️ <b>Заказ к {await normalize_time(order['time'])} на {order['orderCost']} ₽"
                                    f" — {Lexicon.payment_status[order['status']]}\n\n</b> В заказе:\n")
                for item in order['items']:
                    if item['itemNumber'] > 1:
                        string_for_user += f"• {item['item']['itemName']} (x{item['itemNumber']}) – {item['item']['itemCost']} ₽/шт.\n"
                    else:
                        string_for_user += f"• {item['item']['itemName']} – {item['item']['itemCost']} ₽/шт.\n"
                if order['status'] in ["paid and preparing", "ready"]:
                    try:
                        string_for_user += f"\n<u>Код получения: {order['receivingCode']}</u>\n"
                    except KeyError:
                        string_for_user += f"\n<u>Код получения: 3248</u>\n"
                string_for_user += "\n\n"
        if have_ready_orders:
            string_for_user += Lexicon.instructions_for_receiving
        if no_active_orders:
            string_for_user = Lexicon.no_active_orders
    else:
        string_for_user = Lexicon.error_while_getting_or_posting
    return [response[0], string_for_user]


async def new_order_message_generate(json_from_bot, user_id, first_name, ready_order_url):
    json_for_server = await make_json_for_server(json_from_bot, user_id)
    link_for_payment = None
    current_time = datetime.datetime.now().time()
    print(f"in func: {current_time}")
    current_time = datetime.datetime.now().time()
    print(f"before: {current_time}")
    request_value = await post_data_to_server(ready_order_url, json_for_server)
    if request_value[0] == 200:
        current_time = datetime.datetime.now().time()
        print(f"after: {current_time}")
        print(ready_order_url)
        print("json_for_server:")
        print(json_for_server)
        print("json on server:")
        print(request_value[1])
        print("status code:")
        print(request_value[0])
        print(type(request_value[1]))
        link_for_payment = request_value[1]["paymentLink"]
        # link_for_payment = "google.com"
        string_for_user = await _new_order_message_generate_success(json_from_bot, first_name, user_id)
    else:
        string_for_user = Lexicon.error_while_getting_or_posting

    return UserOrder(link_for_payment=link_for_payment,
                     string_for_user=string_for_user)


async def _new_order_message_generate_success(json_from_bot, first_name, user_id):
    string_for_user = (
        f"<b>{first_name}, бот принял твой заказ 😌️️️️️️\n\nТеперь нужно оплатить – нажми на кнопку, "
        f"прикреплённую к этому сообщению.</b>\n\nВ заказе:\n")
    for item in json_from_bot["items"]:
        if item['itemNumber'] > 1:
            string_for_user += f"• {item['itemName']} (x{item['itemNumber']}) – {item['itemCost']} ₽/шт.\n"
        else:
            string_for_user += f"• {item['itemName']} – {item['itemCost']} ₽/шт.\n"

    string_for_user += f"\n<i>Заказ будет готов к {await normalize_time(json_from_bot['time'])}</i>.\n\n"
    string_for_user += Lexicon.hint_about_orders_command
    return string_for_user
