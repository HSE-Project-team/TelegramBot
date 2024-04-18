import {animated_page_scroll} from "../tools/animated_page_scroll_tools.js";
import {
    catalog_url, chocolate_category_test_url,
    coffee_category_test_url,
    cold_drinks_category_test_url,
    cookie_category_test_url
} from "../URL_storage.js";
import {
    get_data_from_server, send_data_to_server
} from "../tools/networking_tools.js"
import {
    create_element,
    create_image,
    show_element_with_animation,
    hide_element_with_animation,
    push_plus_minus_button_animation
} from "../tools/graphical_tools.js";
import {show_error} from "../errors_handler/errors_handler.js";
import {Catalog, Order} from "../main_classs.js";

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

let category = localStorage.getItem("category");
let header_label = document.querySelector(".header_label");
header_label.textContent = category;

let catalog = new Catalog();

let order = new Order();

let graphicCatalogItemCounter = new Map();

let choose_time_btn = document.querySelector(".choose_time_btn");
let choose_time_btn_div = document.querySelector(".choose_time_btn_div");

order.get_data_from_cash();

if (order.user_order.size) {
    document.querySelector(".container").classList.add("bottom_container_margin");
}

let now_category_url = "";

if (category === "Печенье") {
    now_category_url = cookie_category_test_url;
} else if (category === "Кофе") {
    now_category_url = coffee_category_test_url;
} else if (category === "Холодные напитки") {
    now_category_url = cold_drinks_category_test_url;
} else if (category === "Шоколад") {
    now_category_url = chocolate_category_test_url;
} else {
    now_category_url = catalog_url;
}

get_data_from_server(now_category_url).then((data_from_server) => {
    let response_status = data_from_server[0];
    data_from_server = data_from_server[1];

    document.querySelector(".loading_image_wrapper").classList.add("hidden");
    if (response_status === 200) {
        if (order.user_order.size) {
            show_element_with_animation(choose_time_btn_div, "show_choose_time_btn_animation_selector", "hide_choose_time_btn_animation_selector")
            choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
        }

        catalog.size = data_from_server["size"];

        for (let catalog_item of data_from_server["items"]) {
            catalog.addItem(catalog_item["itemId"],
                catalog_item["itemName"],
                "../images/Dish1.png",
                catalog_item["itemCost"]);
        }

        catalog.push_data_to_cash();

        function decrease_item_counter(i, textField) {
            let new_number = order.user_order.get(i);
            if (new_number >= 2) {
                new_number--;
                order.user_order.set(i, new_number);
                textField.textContent = new_number;
            } else {
                order.user_order.delete(i);
                if (order.user_order.size === 0) {
                    hide_element_with_animation(choose_time_btn_div, "show_choose_time_btn_animation_selector", "hide_choose_time_btn_animation_selector")
                    document.querySelector(".container").classList.remove("bottom_container_margin");
                }
                graphicCatalogItems[i].item_btn.classList.remove("hidden");
                graphicCatalogItems[i].item_btn.classList.add("show_btn_add_animation_selector");
                graphicCatalogItems[i].minus_btn.classList.add("hidden");
                graphicCatalogItems[i].plus_btn.classList.add("hidden");
                textField.classList.add("hidden");
                textField.textContent = "0";
            }
            order.order_cost -= +catalog.Items.get(i).item_cost;
            if (order.order_cost !== 0) {
                choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
            }
        }

        let graphicCatalogItems = new Map();

        let gap_for_animation = 0;
        for (let i of catalog.Items.keys()) {
            let is_item_in_order = order.user_order.has(i);
            graphicCatalogItems[i] = create_element("div", "item");
            graphicCatalogItems[i].classList.add("element_appearance_animation_selector");
            gap_for_animation += 0.02;
            graphicCatalogItems[i].style.animationDelay = `${gap_for_animation}s`;
            graphicCatalogItems[i].item_img = create_image("catalog_image", catalog.Items.get(i).item_img, "");
            graphicCatalogItems[i].item_name = create_element("div", "item_name", catalog.Items.get(i).item_name);
            graphicCatalogItems[i].item_name.classList.add("ellipsis_3_lines");

            graphicCatalogItems[i].item_cost = create_element("div", "item_cost", catalog.Items.get(i).item_cost + " ₽");
            graphicCatalogItems[i].item_btn = create_element("button", "btn_add", "Добавить", is_item_in_order);
            graphicCatalogItems[i].add_remove_figures = create_element("div", "add_remove_figure");

            graphicCatalogItems[i].minus_btn = create_element("button", "btn_minus", "-", !is_item_in_order);
            graphicCatalogItems[i].minus_btn.classList.add("show_btn_minus_animation_selector");

            graphicCatalogItemCounter[i] = create_element("label", "order_item_label", "", !is_item_in_order);
            graphicCatalogItemCounter[i].classList.add("show_order_item_label_animation_selector");

            if (is_item_in_order) {
                graphicCatalogItemCounter[i].textContent = order.user_order.get(i);
            }

            graphicCatalogItems[i].plus_btn = create_element("button", "btn_plus", "+", !is_item_in_order);
            graphicCatalogItems[i].plus_btn.classList.add("show_btn_plus_animation_selector");

            graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
                push_plus_minus_button_animation(graphicCatalogItems[i].plus_btn, "plus_minus_buttons_animation_selector", "show_btn_plus_animation_selector");
                increase_item_counter(i, graphicCatalogItemCounter[i]);
                order.push_data_to_cash();
            });

            graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
                push_plus_minus_button_animation(graphicCatalogItems[i].minus_btn, "plus_minus_buttons_animation_selector", "show_btn_minus_animation_selector");
                decrease_item_counter(i, graphicCatalogItemCounter[i]);
                order.push_data_to_cash();
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
            order.push_data_to_cash();
        });

        for (let i of catalog.Items.keys()) {
            graphicCatalogItems[i].item_btn.addEventListener("click", () => {
                order.user_order.set(i, 1);
                show_element_with_animation(choose_time_btn_div, "show_choose_time_btn_animation_selector", "hide_choose_time_btn_animation_selector")
                document.querySelector(".container").classList.add("bottom_container_margin");

                order.order_cost += +catalog.Items.get(i).item_cost;
                choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;

                graphicCatalogItems[i].item_btn.classList.add("hidden");
                graphicCatalogItems[i].minus_btn.classList.remove("hidden");
                graphicCatalogItemCounter[i].classList.remove("hidden");
                graphicCatalogItemCounter[i].textContent = "1";
                graphicCatalogItems[i].plus_btn.classList.remove("hidden");

                order.push_data_to_cash();
            });
        }
    } else {
        show_error(response_status);
    }
});

