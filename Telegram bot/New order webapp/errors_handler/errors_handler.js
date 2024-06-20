import {
    create_error_label
} from "/tools/graphical_tools.js";

export function show_error(error_number) {
    if (error_number === 500) {
        create_error_label(error_number, "Внутренняя ошибка сервера.");
    } else if (error_number === 404) {
        create_error_label(error_number, "Сервер временно недоступен.");
    } else {
        create_error_label("", "Проверьте соединение с интернетом или повторите попытку позже.");
    }
}
