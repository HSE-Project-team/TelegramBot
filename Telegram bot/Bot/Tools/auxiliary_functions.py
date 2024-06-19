import copy


def normalize_time(full_time):
    separated_time = full_time.split(" ")[1].split(":")
    return f"{separated_time[0]}:{separated_time[1]}"


def make_json_for_server(json_data, user_id):
    json_for_server = copy.deepcopy(json_data)
    items_for_server = list()
    for item in json_for_server.pop("items"):
        items_for_server.append([item["itemId"], item["itemNumber"]])

    json_for_server["items"] = items_for_server
    json_for_server["userId"] = user_id
    return json_for_server
