import {
    create_error_label
} from "/tools/graphical_tools.js";

let error_dict = new Map(
    [
        [500, "Внутренняя ошибка сервера. Повтори попытку чуть позже."],
        [404, "Сервер временно недоступен. Повтори попытку чуть позже."],
    ])

export function show_error(error_number) {
    if (error_dict.has(error_number)) {
        create_error_label(error_number, error_dict.get(error_number));
    } else {
        create_error_label(error_number, "Проверь соединение с интернетом или повтори попытку чуть позже.");
    }
}
