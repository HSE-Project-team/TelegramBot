from dataclasses import dataclass
from environs import Env


@dataclass
class TelegramBot:
    token: str


@dataclass
class Config:
    telegram_bot: TelegramBot
    user_url: str
    user_orders_web_app_url: str
    new_order_web_app_url: str
    ready_order_for_server_url: str
    order_status_url: str


async def load_config(path):
    env = Env()
    env.read_env(path)
    return Config(telegram_bot=TelegramBot(
        token=env("BOT_TOKEN")),
        user_url=env("USER_URL"),
        user_orders_web_app_url=env("USER_ORDERS_WEB_APP_URL"),
        new_order_web_app_url=env("NEW_ORDER_WEB_APP_URL"),
        ready_order_for_server_url=env("READY_ORDER_FOR_SERVER_URL"),
        order_status_url=env("ORDER_STATUS_URL"))
