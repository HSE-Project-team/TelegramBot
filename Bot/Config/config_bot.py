from dataclasses import dataclass
from environs import Env


@dataclass
class TelegramBot:
    token: str


@dataclass
class Config:
    telegram_bot: TelegramBot
    user_active_orders_url: str
    user_orders_url: str
    new_order_url: str
    ready_order_url: str


def load_config(path):
    env = Env()
    env.read_env(path)
    return Config(telegram_bot=TelegramBot(
        token=env("BOT_TOKEN")),
        user_active_orders_url=env("USER_ACTIVE_ORDERS_URL"),
        user_orders_url=env("USER_ORDERS_URL"),
        new_order_url=env("NEW_ORDER_URL"),
        ready_order_url=env("READY_ORDER_URL"))
