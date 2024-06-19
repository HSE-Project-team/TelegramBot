import {animated_page_scroll} from "./tools/animated_page_scroll_tools.js";
import {user_url} from "./URL_storage.js";
import {
    get_data_from_server, send_data_to_server
} from "./tools/networking_tools.js"
import {
    create_element, create_error_label, create_image, normalize_time
} from "./tools/graphical_tools.js";
import {show_error} from "./errors_handler/errors_handler.js";


animated_page_scroll(0, ".header_label_wrapper");

let items_element = document.querySelector(".orders");

let tg = window.Telegram.WebApp;
tg.expand();

try {
    document.querySelector(".header_label_wrapper").textContent = window.Telegram.WebApp.initDataUnsafe.user.id.toString();
} catch (e) {
    console.log("We are not in Telegram, can't give you user.id")
}

get_data_from_server(user_url).then((data_from_server) => {
    // console.log(`${user_url}/${window.Telegram.WebApp.initDataUnsafe.user.id.toString()}`)
    let response_status = data_from_server[0];
    data_from_server = data_from_server[1];
    console.log(data_from_server);
    document.querySelector(".loading_image_wrapper").classList.add("hidden");

    if (response_status === 200) {
        let orders_length = data_from_server["orders"].length;
        let gap_for_animation = 0;
        for (let i = 0; i < orders_length; ++i) {
            let order_wrapper = create_element("div", "order_wrapper");
            order_wrapper.classList.add("show_orders_appearance_animation_selector");
            gap_for_animation += 0.02;
            order_wrapper.style.animationDelay = `${gap_for_animation}s`;
            let order_info = create_element("div", "order_info");

            let order_id = create_element("div", "order_id", "ID " + data_from_server["orders"][i]["orderId"]);
            let order_time = create_element("div", "order_time", "Заказ на " + normalize_time(data_from_server["orders"][i]["time"]));
            let order_status = create_element("div", "order_status");
            if (data_from_server["orders"][i]["status"] === "waiting for payment") {
                order_status.textContent = "Ожидает оплаты ⌛️";
            } else if (data_from_server["orders"][i]["status"] === "paid and preparing") {
                order_status.textContent = "Оплачен и уже готовится 💫";
            } else if (data_from_server["orders"][i]["status"] === "ready") {
                order_status.textContent = "Можно забирать ✅";
            } else if (data_from_server["orders"][i]["status"] === "received") {
                order_status.textContent = "Получен 👌";
            } else {
                order_status.textContent = "Отменён ❌";
            }

            order_info.appendChild(order_id);
            order_info.appendChild(order_time);
            order_info.appendChild(order_status);
            order_wrapper.appendChild(order_info);

            for (let item of data_from_server["orders"][i]["items"]) {
                let order_item = create_element("div", "order_item");
                let order_item_img = create_image("order_item_img", "../images/Dish1.png", "");
                let order_item_name = create_element("div", "order_item_name", item["item"]["itemName"]);
                let order_item_cost = create_element("div", "order_item_cost", item["item"]["itemCost"] + " ₽/шт.");
                let order_item_number = create_element("div", "order_item_number", item["itemNumber"] + " шт.");
                let order_item_cost_number_wrapper = create_element("div", "order_item_cost_number_wrapper");

                order_wrapper.appendChild(order_item);
                order_item.appendChild(order_item_img);
                order_item.appendChild(order_item_name);
                order_item_cost_number_wrapper.appendChild(order_item_cost);
                order_item_cost_number_wrapper.appendChild(order_item_number);
                order_item.appendChild(order_item_cost_number_wrapper);

            }
            items_element.appendChild(order_wrapper);
        }
    } else {
        show_error(response_status);
    }
});

