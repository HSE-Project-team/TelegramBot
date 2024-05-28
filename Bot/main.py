import asyncio
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from Bot.Config.config_bot import load_config
from Bot.Handlers.user_handlers import user_handlers_router, GetConfigMiddleware


async def main():
    config = load_config("Bot/.env")

    bot = Bot(config.telegram_bot.token, default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN))
    dp = Dispatcher()

    dp.include_router(user_handlers_router)
    dp.update.middleware(GetConfigMiddleware())
    await dp.start_polling(bot, _config=config)


asyncio.run(main())
