from aiogram import Router, BaseMiddleware
from aiogram import types, F
from aiogram.types import (KeyboardButton, ReplyKeyboardMarkup,
                           InlineKeyboardButton, InlineKeyboardMarkup)
from aiogram.types.web_app_info import WebAppInfo
from aiogram.filters import Command

from Bot.Config.config_bot import Config
from Bot.Lexicon.lexicon import Lexicon
from Bot.Tools.message_generation import (new_order_message_generate,
                                          active_orders_message_generate)
import json

user_handlers_router = Router()
config: Config


class GetConfigMiddleware(BaseMiddleware):
    async def __call__(
            self,
            handler,
            event,
            data
    ):
        global config
        config = data.get('_config')

        await handler(event, data)


@user_handlers_router.message(Command(commands=['start']))
async def start(message: types.Message):
    new_order_button = KeyboardButton(text=Lexicon.new_order_button,
                                      web_app=WebAppInfo(url=config.new_order_web_app_url))
    new_order_keyboard = ReplyKeyboardMarkup(keyboard=[[new_order_button]], resize_keyboard=True)

    await message.answer(Lexicon.start_message, reply_markup=new_order_keyboard)


@user_handlers_router.message(Command(commands=['orders']))
async def orders(message: types.Message):
    user_id = message.from_user.id

    user_orders_button = InlineKeyboardButton(
        text=Lexicon.show_all_orders,
        web_app=WebAppInfo(url=config.user_orders_web_app_url)
    )
    user_orders_keyboard = InlineKeyboardMarkup(inline_keyboard=[[user_orders_button]])

    print(f"{config.user_url}/{user_id}")

    await message.answer(active_orders_message_generate(config.user_url),
                         reply_markup=user_orders_keyboard)


@user_handlers_router.message(F.content_type == 'web_app_data')
async def buy_process(message: types.Message):
    user_id = message.from_user.id
    first_name = message.from_user.first_name
    json_from_bot = json.loads(message.web_app_data.data)

    data_for_user = new_order_message_generate(json_from_bot,
                                               user_id,
                                               first_name,
                                               config.ready_order_for_server_url)

    if data_for_user.order_id and data_for_user.link_for_payment:
        pay_for_order_button = InlineKeyboardButton(
            text=f"{Lexicon.pay_for_order_button} • {str(json_from_bot['orderCost'])} ₽",
            url="google.com"
        )
        pay_for_order_keyboard = InlineKeyboardMarkup(inline_keyboard=[[pay_for_order_button]])
        await message.answer(data_for_user.string_for_user, reply_markup=pay_for_order_keyboard)
    else:
        await message.answer(data_for_user.string_for_user)

    print(f"link_for_payment: {data_for_user.link_for_payment}")
    print(f"order_id: {data_for_user.order_id}")
