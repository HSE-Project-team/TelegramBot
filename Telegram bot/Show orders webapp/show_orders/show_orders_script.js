import {get_data_from_server} from "../tools/networking_tools.js";
import {user_url} from "../URL/URL_storage.js";
import {create_element, create_image, normalize_time} from "../tools/graphical_tools.js";
import {show_error} from "../errors_handler/errors_handler.js";

let loading_image_wrapper = document.querySelector(".loading_image_wrapper");
let orders = document.querySelector(".orders");

let statuses_for_user = new Map(
    [
        ["waiting for payment", "Ожидает оплаты ⌛️"],
        ["paid and preparing", "Оплачен и уже готовится 💫"],
        ["ready", "Можно забирать 👍"],
        ["received", "Получен 👌"],
        ["cancelled", "Отменён 🌚"]
    ]
);

get_data_from_server(`${user_url}/${window.Telegram.WebApp.initDataUnsafe.user.id.toString()}`).then((data_from_server) => {
    let response_status = data_from_server[0];
    loading_image_wrapper.classList.add("hidden");
    if (response_status === 200) {
        let orders_from_server = data_from_server[1]["orders"];
        for (let order of orders_from_server) {
            let time_from_server = order["time"];
            let status_from_server = order["status"];
            let order_cost_from_server = order["orderCost"];
            let receiving_code_from_server = order["receivingCode"];

            let order_items = order["items"];

            let order_wrapper = create_element("div", "order_wrapper");
            let order_items_wrapper = create_element("div", "order_items_wrapper");
            let order_info_wrapper = create_element("div", "order_info_wrapper");
            let order_time = create_element("label", "order_time", `Заказ на ${normalize_time(time_from_server)}`);
            let order_status = create_element("label", "order_status", statuses_for_user.get(status_from_server));
            let order_cost = create_element("label", "order_cost", `Сумма: ${order_cost_from_server} ₽`);
            let receiving_code_wrapper = create_element("div", "receiving_code_wrapper");
            let receiving_code_label = create_element("label", "receiving_code_label", "Код получения:");

            order_info_wrapper.appendChild(order_time);
            order_info_wrapper.appendChild(order_status);

            if (["paid and preparing", "ready", "received"].indexOf(status_from_server) !== -1) {
                if (!receiving_code_from_server) {
                    receiving_code_from_server = 3248
                }
                let receiving_code = create_element("label", "receiving_code", receiving_code_from_server);
                receiving_code_wrapper.appendChild(receiving_code_label);
                receiving_code_wrapper.appendChild(receiving_code);
                order_info_wrapper.appendChild(receiving_code_wrapper);
            }

            order_wrapper.appendChild(order_info_wrapper);

            for (let item of order_items) {
                let item_category_from_server = item["item"]["itemCategory"];
                let item_cost_from_server = item["item"]["itemCost"];
                let item_name_from_server = item["item"]["itemName"]
                let item_number_from_server = item["itemNumber"];
                let item_id_from_server = item["item"]["itemId"];
                console.log(item_category_from_server);

                let order_item = create_element("div", "order_item");
                let order_item_img = create_image("order_item_img", `../images/${item_category_from_server}.png`);
                let order_item_name = create_element("div", "order_item_name", item_name_from_server);
                let order_item_cost = create_element("div", "order_item_cost", `${item_cost_from_server} ₽/шт.`);

                if (item_number_from_server > 1) {
                    let order_item_number = create_element("span", "order_item_number", ` (x${item_number_from_server})`);
                    order_item_name.appendChild(order_item_number);
                }

                order_item.appendChild(order_item_img);
                order_item.appendChild(order_item_name);
                order_item.appendChild(order_item_cost);
                order_items_wrapper.appendChild(order_item);
            }

            order_wrapper.appendChild(order_items_wrapper);
            order_wrapper.appendChild(order_cost);
            orders.appendChild(order_wrapper);
        }
    } else {
        show_error(response_status);
    }
});

