import copy

from aiogram.client.session import aiohttp


async def get_data_from_server(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return [response.status, await response.json()]
            else:
                return [response.status, None]


async def post_data_to_server(url, data):
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=data) as response:
            if response.status == 200:
                return [response.status, await response.json()]
            else:
                return [response.status, None]


async def normalize_time(full_time):
    separated_time = full_time.split(" ")[1].split(":")
    return f"{separated_time[0]}:{separated_time[1]}"


async def make_json_for_server(json_data, user_id):
    json_for_server = copy.deepcopy(json_data)
    items_for_server = list()
    for item in json_for_server.pop("items"):
        now_item = {"itemId": item["itemId"], "itemNumber": item["itemNumber"]}
        items_for_server.append(now_item)

    json_for_server["items"] = items_for_server
    json_for_server["userId"] = user_id
    return json_for_server
