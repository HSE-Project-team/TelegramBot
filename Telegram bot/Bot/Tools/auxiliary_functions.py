import copy
from datetime import datetime, timedelta


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


async def _generate_message_no_time(bot, user_id, order_id, target_time):
    await bot.send_message(user_id, f"Заказ с ID {order_id} готов к выдаче. Время: {target_time}")


def plan_message_about_order_status(scheduler, order_time, bot, user_id, order_id):
    current_date = datetime.now().strftime("%Y-%m-%d")
    target_time_datetime = datetime.strptime(f"{current_date} {order_time}", "%Y-%m-%d %H:%M") + timedelta(minutes=2)

    scheduler.add_job(_generate_message_no_time, next_run_time=target_time_datetime,
                      kwargs={'bot': bot,
                              'user_id': user_id,
                              'order_id': order_id,
                              "target_time": order_time})
