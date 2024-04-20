from aiogram import Bot, Dispatcher, types, executor
from aiogram.types.web_app_info import WebAppInfo
from dotenv import load_dotenv
from math import floor
import os
import requests
from requests.exceptions import RequestException
import json
import copy

load_dotenv()
bot = Bot(os.getenv("TESTTGTOKEN"))
dp = Dispatcher(bot)


class Order:
    order_number = 0
    user_name = ""
    user_id = 0

    def __init__(self, order_number, user_name, user_id):
        self.order_number = order_number
        self.user_name = user_name
        self.user_id = user_id


@dp.message_handler(commands=['orders'])
async def orders(message: types.Message):
    markup = types.InlineKeyboardMarkup()
    markup.add(
        types.InlineKeyboardButton("Посмотреть мои заказы",
                                   web_app=WebAppInfo(url="https://show-orders-sloy-bot.vercel.app")))
    await message.answer("Мои заказы", reply_markup=markup)


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    """
    Telegram ---> WebApp:

    markup = types.InlineKeyboardMarkup()
    markup.add(
        types.InlineKeyboardButton("Открыть WebApp", web_app=WebAppInfo(url="https://i2l1a1.github.io/")))
    await message.answer("Привет!", reply_markup=markup)

    WebApp ---> Telegram
    markup = types.ReplyKeyboardMarkup()
    markup.add(
        types.KeyboardButton("Открыть WebApp", web_app=WebAppInfo(url="https://i2l1a1.github.io/")))
    await message.answer("Привет!", reply_markup=markup)
    """

    new_order_button = types.ReplyKeyboardMarkup()
    new_order_button.add(
        types.KeyboardButton("Сделать новый заказ",
                             web_app=WebAppInfo(url="https://new-order-sloy-bot.vercel.app")))

    await message.answer("Привет!", reply_markup=new_order_button)


def seconds_to_time(seconds):
    hours = floor(seconds / 3600)
    minutes = floor((seconds % 3600) / 60)
    if hours < 10:
        hours = "0" + str(hours)

    if minutes < 10:
        minutes = "0" + str(minutes)

    return f"{str(hours)}:{str(minutes)}"


def make_json_for_server(json_data, user_id):
    json_for_server = copy.deepcopy(json_data)
    items_for_server = dict()
    for item in json_for_server.pop("items"):
        items_for_server[item["itemId"]] = item["itemNumber"]

    json_for_server["items"] = items_for_server
    json_for_server["userId"] = user_id
    return json_for_server


def make_string_for_user(json_from_bot, first_name, user_id):
    string_for_user = f"{first_name}, бот принял Ваш заказ. Вы заказали:\n"
    for item in json_from_bot["items"]:
        string_for_user += f"• {item['itemName']} ({item['itemNumber']} шт.) – {item['itemCost']} ₽ (ID продукта: {item['itemId']})\n"
    string_for_user += f"\nСумма заказа: {json_from_bot['orderCost']} ₽\n"
    string_for_user += f"Время заказа: {seconds_to_time(json_from_bot['time'])}\n"
    string_for_user += f"ID аккаунта: {user_id}\n"
    return string_for_user


@dp.message_handler(content_types=['web_app_data'])
async def buy_process(message: types.Message):
    user_id = message.from_user.id
    first_name = message.from_user.first_name

    json_from_bot = json.loads(message.web_app_data.data)
    json_for_server = make_json_for_server(json_from_bot, user_id)

    request_value = 0

    try:
        request_value = requests.post("http://httpbin.org/post", json=json_for_server)
        print(request_value.json()["json"])

        print(request_value.status_code)

        string_for_user = make_string_for_user(json_from_bot, first_name, user_id)
        string_for_user += f"\n\njson_from_bot: {json_from_bot}\n\njson_for_server: {json_for_server}"

        await message.answer(string_for_user)
    except RequestException as err:
        print(f"Ошибка: {err}")
        string_for_user = f"Ошибка {request_value.status_code}.\nПовторите попытку позже."
        print(string_for_user)
        await message.answer(string_for_user)


executor.start_polling(dp)
