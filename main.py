from aiogram import Bot, Dispatcher, types, executor
from aiogram.types.web_app_info import WebAppInfo
from dotenv import load_dotenv
import os

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


orders = []


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    markup = types.ReplyKeyboardMarkup()
    markup.add(
        types.KeyboardButton("Открыть WebApp", web_app=WebAppInfo(url="https://i2l1a1.github.io/")))
    await message.answer("Привет!", reply_markup=markup)


def create_new_order(user_name, user_id):
    return Order(len(orders) + 1, user_name, user_id)


# @dp.message_handler(content_types=['web_app_data'])
def print_new_order(message: types.Message):
    print(f"Order number={orders[len(orders) - 1].order_number}")
    print(f"Order_items=[{message.web_app_data.data}]")
    print(f"User_data=[user_id={orders[len(orders) - 1].user_id}, user_name={orders[len(orders) - 1].user_name}]")
    print("---------------")


@dp.message_handler(content_types=['web_app_data'])
async def buy_process(message: types.Message):
    user_id = message.from_user.id
    first_name = message.from_user.first_name
    orders.append(create_new_order(first_name, user_id))
    print_new_order(message)
    to_user = f"{first_name}, бот принял ваш заказ. Вы заказали блюдо номер {message.web_app_data.data}. \n\nID " \
              f"аккаунта: {user_id}."
    await message.answer(to_user)


executor.start_polling(dp)
