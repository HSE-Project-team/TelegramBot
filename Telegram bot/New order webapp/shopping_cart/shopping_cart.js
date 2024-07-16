import {ItemFromOrder, Order} from "../tools/main_classs.js";
import {
    create_element, create_image, create_input, show_element_with_animation, simplify_time_for_user
} from "../tools/graphical_tools.js";
import {get_data_from_server} from "../tools/networking_tools.js";
import {free_order_time_url} from "../URL/URL_storage.js";
import {show_error} from "../errors_handler/errors_handler.js";

let tg = window.Telegram.WebApp;
tg.expand();

let order = new Order();
order.get_data_from_cash();

let order_cost = document.querySelector(".order_cost");
order_cost.textContent = `Сумма: ${order.order_cost} ₽`;

let shopping_cart_items = document.querySelector(".shopping_cart_items");
let loading_image_wrapper = document.querySelector(".loading_image_wrapper");
let shopping_cart = document.querySelector(".shopping_cart");
let checkout_btn = document.querySelector(".checkout_btn");
let free_time_wrapper = document.querySelector(".free_time_wrapper");
let order_comment = document.querySelector(".order_comment");
let back_button = document.querySelector(".back_button");
let empty_shopping_cart_label = document.querySelector(".empty_shopping_cart_label");

function display_free_time_buttons(free_time_list) {
    for (let free_time of free_time_list) {
        const free_time_button = create_input("free_time_button", "free_time", "radio", free_time, free_time);
        const free_time_label = create_element("label", "free_time_label", simplify_time_for_user(free_time));
        free_time_label.htmlFor = free_time_button.id;

        free_time_wrapper.appendChild(free_time_button);
        free_time_wrapper.appendChild(free_time_label);

        free_time_button.addEventListener("click", () => {
            checkout_btn.removeAttribute("disabled");
            checkout_btn.textContent = `Заказать к ${free_time_label.textContent} на ${order.order_cost} ₽`;
            order.order_time = free_time_button.value;

            let time_buttons = document.querySelectorAll(".free_time_label");
            for (let time_button of time_buttons) {
                time_button.classList.remove("show_free_time_label_animation_selector");
                time_button.classList.add("hide_free_time_label_animation_selector");
            }
            free_time_label.classList.add("show_free_time_label_animation_selector");
            free_time_label.classList.remove("hide_free_time_label_animation_selector");
        });
    }
}

function generate_data_for_send() {
    let object_for_send = {
        time: "", userId: "", items: [], orderCost: "", comment: ""
    };

    for (let id of order.user_order.keys()) {
        let copy_item_for_send = {
            itemId: "", itemNumber: "", itemName: "", itemCost: ""
        };

        let order_item = order.user_order.get(id);

        copy_item_for_send.itemId = id;
        copy_item_for_send.itemNumber = order_item.item_number;
        copy_item_for_send.itemName = order_item.item_name;
        copy_item_for_send.itemCost = order_item.item_cost;

        object_for_send.items.push(copy_item_for_send);
    }

    object_for_send.time = order.order_time;
    object_for_send.orderCost = order.order_cost;
    object_for_send.comment = order.order_comment;

    return JSON.stringify(object_for_send);
}

let previous_page = localStorage.getItem("previous_page");
if (previous_page === "categories") {
    back_button.href = "../index.html";
}

if (order.order_cost !== 0) {
    loading_image_wrapper.classList.remove("hidden");
    get_data_from_server(free_order_time_url).then((data_from_server) => {
        let response_status = data_from_server[0];
        loading_image_wrapper.classList.add("hidden");
        if (response_status === 200) {
            checkout_btn.textContent = "Выберите время";
            checkout_btn.setAttribute('disabled', '');
            checkout_btn.classList.remove("hidden");
            shopping_cart.classList.remove("hidden");

            let time_from_server = data_from_server[1]["times"];

            display_free_time_buttons(time_from_server);
        } else {
            show_error(response_status);
        }
    });

    if (order.order_comment !== "") {
        order_comment.value = order.order_comment;
    }

    let order_items = order["user_order"];
    for (let item of order_items.keys()) {
        let now_item = order_items.get(item);

        let shopping_item = create_element("div", "shopping_item");
        let shopping_item_img = create_image("shopping_item_img", `../images/products/${item}.png`);
        let shopping_cart_item_name = create_element("div", "shopping_cart_item_name", now_item["item_name"]);
        let buttons_and_cost_wrapper = create_element("div", "buttons_and_cost_wrapper");
        let shopping_cart_add_remove_figure = create_element("div", "shopping_cart_add_remove_figure");
        let shopping_cart_plus_btn = create_element("button", "shopping_cart_plus_btn", "+");
        let shopping_cart_minus_btn = create_element("button", "shopping_cart_minus_btn", "-");
        let shopping_cart_item_label = create_element("label", "shopping_cart_item_label", now_item["item_number"]);
        let item_cost = create_element("label", "item_cost", `${now_item["item_cost"]} ₽/шт.`);

        shopping_item.appendChild(shopping_item_img);
        shopping_item.appendChild(shopping_cart_item_name);
        shopping_item.appendChild(buttons_and_cost_wrapper);
        buttons_and_cost_wrapper.appendChild(shopping_cart_add_remove_figure);
        buttons_and_cost_wrapper.appendChild(item_cost);
        shopping_cart_add_remove_figure.appendChild(shopping_cart_minus_btn);
        shopping_cart_add_remove_figure.appendChild(shopping_cart_item_label);
        shopping_cart_add_remove_figure.appendChild(shopping_cart_plus_btn);
        shopping_cart_items.appendChild(shopping_item);

        shopping_cart_plus_btn.addEventListener("click", () => {
            let item_from_order = new ItemFromOrder(order.user_order.get(item).item_name, order.user_order.get(item).item_cost, order.user_order.get(item).item_number + 1);

            order.user_order.set(item, item_from_order);
            shopping_cart_item_label.textContent = order.user_order.get(item).item_number;
            order.order_cost += order.user_order.get(item).item_cost;
            order_cost.textContent = `Сумма: ${order.order_cost} ₽`;
            if (!checkout_btn.disabled) {
                checkout_btn.textContent = `Заказать к ${simplify_time_for_user(order.order_time)} на ${order.order_cost} ₽`;
            }
            order.push_data_to_cash();
        });

        shopping_cart_minus_btn.addEventListener("click", () => {
            let item_from_order = new ItemFromOrder(order.user_order.get(item).item_name, order.user_order.get(item).item_cost, order.user_order.get(item).item_number - 1);

            order.user_order.set(item, item_from_order);
            order.order_cost -= order.user_order.get(item).item_cost;
            if (order.user_order.get(item).item_number !== 0) {
                shopping_cart_item_label.textContent = order.user_order.get(item).item_number;
            } else {
                order.user_order.delete(item);
                shopping_item.classList.add("hidden");
                if (order.order_cost === 0) {
                    shopping_cart.classList.add("hidden");
                    checkout_btn.classList.add("hidden");
                    empty_shopping_cart_label.classList.remove("hidden");
                }
            }
            order_cost.textContent = `Сумма: ${order.order_cost} ₽`;
            if (!checkout_btn.disabled) {
                checkout_btn.textContent = `Заказать к ${simplify_time_for_user(order.order_time)} на ${order.order_cost} ₽`;
            }
            order.push_data_to_cash();
        });
    }
} else {
    empty_shopping_cart_label.classList.remove("hidden");
}

checkout_btn.addEventListener("click", () => {
    let order_comment = document.querySelector(".order_comment");
    order.order_comment = order_comment.value;
    localStorage.clear();
    tg.sendData(generate_data_for_send());
});

back_button.addEventListener("click", () => {
    let order_comment = document.querySelector(".order_comment");
    order.order_comment = order_comment.value;
    order.push_data_to_cash();
});

let now_page_position_y = window.scrollY;

order_comment.addEventListener("input", () => {
    order.order_comment = order_comment.value;
    localStorage.setItem("user_order_comment", order.order_comment);
});

shopping_cart.addEventListener('touchstart', (event) => {
    if (!event.target.closest('.order_comment')) {
        now_page_position_y = window.scrollY;
        document.querySelector(".order_comment").tabIndex = -1;
        document.querySelector(".shopping_cart").tabIndex = 1;
        document.querySelector("body").focus();
        window.scrollTo(0, now_page_position_y);
    }
});
