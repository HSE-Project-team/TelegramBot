import {animated_page_scroll} from "../tools/animated_page_scroll_tools.js";
import {catalog_url} from "../URL_storage.js";
import {
    get_data_from_server, send_data_to_server
} from "../tools/networking_tools.js"
import {
    create_element, create_image
} from "../tools/graphical_tools.js";
import {Catalog, Order} from "../main_classs.js";

animated_page_scroll(0, ".header_label_wrapper");
animated_page_scroll(0, ".header_label_wrapper");

let tg = window.Telegram.WebApp;
tg.expand();

function increase_item_counter(i, textField) {
    let new_number = order.user_order.get(i) + 1;
    order.user_order.set(i, new_number);
    order.order_cost += +catalog.Items.get(i).item_cost;
    choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
    textField.textContent = new_number;
}

let catalog = new Catalog();

let order = new Order();

let graphicCatalogItemCounter = new Map();

let choose_time_btn = document.querySelector(".choose_time_btn");
let choose_time_btn_div = document.querySelector(".choose_time_btn_div");

order.get_data_from_cash();

if (order.user_order.size) {
    document.querySelector(".container").classList.add("bottom_container_margin");
    choose_time_btn_div.classList.remove("hidden");
    choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
}

get_data_from_server(catalog_url).then((data_from_server) => {

    catalog.size = data_from_server["size"];

    for (let catalog_item of data_from_server["items"]) {
        catalog.addItem(catalog_item["itemId"],
            catalog_item["itemName"],
            "../images/Dish1.png",
            catalog_item["itemCost"]);
    }

    function decrease_item_counter(i, textField) {
        let new_number = order.user_order.get(i);
        if (new_number >= 2) {
            new_number--;
            order.user_order.set(i, new_number);
            textField.textContent = new_number;
        } else {
            order.user_order.delete(i);
            if (order.user_order.size === 0) {
                choose_time_btn_div.classList.add("hidden");
                document.querySelector(".container").classList.remove("bottom_container_margin");
            }
            graphicCatalogItems[i].item_btn.classList.remove("hidden");
            graphicCatalogItems[i].minus_btn.classList.add("hidden");
            graphicCatalogItems[i].plus_btn.classList.add("hidden");
            textField.classList.add("hidden");
            textField.textContent = "0";
        }
        order.order_cost -= +catalog.Items.get(i).item_cost;
        choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
    }

    let graphicCatalogItems = new Map();

    for (let i of catalog.Items.keys()) {
        let is_item_in_order = order.user_order.has(i);

        graphicCatalogItems[i] = create_element("div", "item");
        graphicCatalogItems[i].item_img = create_image("catalog_image", catalog.Items.get(i).item_img, "");
        graphicCatalogItems[i].item_name = create_element("div", "item_name", catalog.Items.get(i).item_name);
        graphicCatalogItems[i].item_cost = create_element("div", "item_cost", catalog.Items.get(i).item_cost + " ₽");
        graphicCatalogItems[i].item_btn = create_element("button", "btn_add", "Добавить", is_item_in_order);
        graphicCatalogItems[i].add_remove_figures = create_element("div", "add_remove_figure");


        graphicCatalogItems[i].minus_btn = create_element("button", "btn_minus", "-", !is_item_in_order);

        graphicCatalogItemCounter[i] = create_element("label", "order_item_label", "", !is_item_in_order);

        if (is_item_in_order) {
            graphicCatalogItemCounter[i].textContent = order.user_order.get(i);
        }

        graphicCatalogItems[i].plus_btn = create_element("button", "btn_plus", "+", !is_item_in_order);

        graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
            increase_item_counter(i, graphicCatalogItemCounter[i]);
        });

        graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
            decrease_item_counter(i, graphicCatalogItemCounter[i]);
        });

        document.querySelector(".items").appendChild(graphicCatalogItems[i]);
        graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_img);
        graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_name);
        graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_cost);
        graphicCatalogItems[i].appendChild(graphicCatalogItems[i].add_remove_figures);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].item_btn);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].minus_btn);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItemCounter[i]);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].plus_btn);
    }

    choose_time_btn_div.addEventListener("click", () => {
        localStorage.clear();
        catalog.push_data_to_cash();
        order.push_data_to_cash();
    });

    for (let i of catalog.Items.keys()) {
        graphicCatalogItems[i].item_btn.addEventListener("click", () => {
            order.user_order.set(i, 1);
            choose_time_btn_div.classList.remove("hidden");
            document.querySelector(".container").classList.add("bottom_container_margin");

            order.order_cost += +catalog.Items.get(i).item_cost;
            choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;

            graphicCatalogItems[i].item_btn.classList.add("hidden");
            graphicCatalogItems[i].minus_btn.classList.remove("hidden");
            graphicCatalogItemCounter[i].classList.remove("hidden");
            graphicCatalogItemCounter[i].textContent = "1";
            graphicCatalogItems[i].plus_btn.classList.remove("hidden");
        });
    }
});

