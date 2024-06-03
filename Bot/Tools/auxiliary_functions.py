import copy
from math import floor


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
    items_for_server = list()
    for item in json_for_server.pop("items"):
        items_for_server.append([item["itemId"], item["itemNumber"]])

    json_for_server["items"] = items_for_server
    json_for_server["userId"] = user_id
    return json_for_server
