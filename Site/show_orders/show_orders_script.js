import {animated_page_scroll} from "../tools/animated_page_scroll_tools.js";
import {user_url} from "../URL_storage.js";
import {
    get_data_from_server, send_data_to_server
} from "../tools/networking_tools.js"
import {
    create_element, create_image, seconds_to_time
} from "../tools/graphical_tools.js";


animated_page_scroll(0, ".header_label_wrapper");

let items_element = document.querySelector(".orders");

let tg = window.Telegram.WebApp;
tg.expand();

get_data_from_server(user_url).then((data_from_server) => {
    document.querySelector(".loading_image_wrapper").classList.add("hidden");

    let orders_length = data_from_server["orders"].length;
    let gap_for_animation = 0;
    for (let i = 0; i < orders_length; ++i) {
        let order_wrapper = create_element("div", "order_wrapper");
        gap_for_animation += 0.02;
        order_wrapper.style.animationDelay = `${gap_for_animation}s`;
        let order_info = create_element("div", "order_info");

        let order_id = create_element("div", "order_id", "ID " + data_from_server["orders"][i]["orderId"]);
        let order_time = create_element("div", "order_time", "Заказ на " + seconds_to_time(data_from_server["orders"][i]["time"]));
        let order_status = create_element("div", "order_status");
        if (data_from_server["orders"][i]["status"] === "waiting for payment") {
            order_status.textContent = "Не оплачено ❌";
        } else {
            order_status.textContent = "Оплачено ✅";
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
});

