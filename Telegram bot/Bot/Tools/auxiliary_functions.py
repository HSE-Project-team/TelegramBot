import copy
from datetime import datetime, timedelta

import requests


def normalize_time(full_time):
    separated_time = full_time.split(" ")[1].split(":")
    return f"{separated_time[0]}:{separated_time[1]}"


def make_json_for_server(json_data, user_id):
    json_for_server = copy.deepcopy(json_data)
    items_for_server = list()
    for item in json_for_server.pop("items"):
        now_item = {"itemId": item["itemId"], "itemNumber": item["itemNumber"]}
        items_for_server.append(now_item)

    json_for_server["items"] = items_for_server
    json_for_server["userId"] = user_id
    return json_for_server


async def _generate_message_about_payment_on_time(bot, user_id, order_id, target_time, order_status_url):
    print("payment before")
    order_status = requests.get(order_status_url).json()["status"]
    print("payment: ", order_status)
    if order_status == "waiting for payment":
        await bot.send_message(user_id, f"[payment] Заказ с ID {order_id} отменён из-за неуплаты. Время: {target_time}")


async def _generate_message_about_receiving_on_time(bot, user_id, order_id, target_time, order_status_url):
    print("receiving before")
    order_status = requests.get(order_status_url).json()["status"]
    print("receiving: ", order_status)
    if order_status != "waiting for payment":
        await bot.send_message(user_id, f"[receiving] Заказ с ID {order_id} готов. Время: {target_time}")


def plan_message_about_order_status(scheduler, creating_order_time, order_time, bot, user_id, order_id,
                                    order_status_url):
    current_date = datetime.now().strftime("%Y-%m-%d")
    creating_order_time_datetime = datetime.strptime(f"{current_date} {creating_order_time}",
                                                     "%Y-%m-%d %H:%M:%S") + timedelta(minutes=10)

    order_time_datetime = datetime.strptime(f"{current_date} {order_time}", "%Y-%m-%d %H:%M") + timedelta(minutes=2)
    order_status_url = f"{order_status_url}/order/{order_id}"

    print("creating_order_time_datetime:", creating_order_time_datetime)
    print("order_time_datetime:", order_time_datetime)
    print("order_status_url:", order_status_url)

    scheduler.add_job(_generate_message_about_payment_on_time, next_run_time=creating_order_time_datetime,
                      kwargs={'bot': bot,
                              'user_id': user_id,
                              'order_id': order_id,
                              "target_time": order_time,
                              "order_status_url": order_status_url})
    scheduler.add_job(_generate_message_about_receiving_on_time, next_run_time=order_time_datetime,
                      kwargs={'bot': bot,
                              'user_id': user_id,
                              'order_id': order_id,
                              "target_time": order_time,
                              "order_status_url": order_status_url})
