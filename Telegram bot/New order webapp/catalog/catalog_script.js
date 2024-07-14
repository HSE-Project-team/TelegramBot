import {ItemFromOrder, Order} from "../tools/main_classs.js";
import {get_data_from_server} from "../tools/networking_tools.js";
import {
    cookie_category_test_url, coffee_category_test_url, tea_category_test_url, sandwiches_category_test_url
} from "../URL/URL_storage.js";
import {create_element, create_image} from "../tools/graphical_tools.js";

let container = document.querySelector(".container");
let items = document.querySelector(".items");
let loading_image = document.querySelector(".loading_image");
let choose_time_btn_div = document.querySelector(".choose_time_btn_div");
let choose_time_btn = document.querySelector(".choose_time_btn");
let header_label = document.querySelector(".header_label");

let order = new Order();

order.get_data_from_cash();

let now_category = localStorage["category"];
header_label.textContent = now_category;

let now_category_url = "";

if (now_category === "Печенье") {
    now_category_url = cookie_category_test_url;
} else if (now_category === "Кофе") {
    now_category_url = coffee_category_test_url;
} else if (now_category === "Чай") {
    now_category_url = tea_category_test_url;
} else if (now_category === "Сендвичи") {
    now_category_url = sandwiches_category_test_url;
}

let graphical_items = new Map();

function update_choose_time_btn_label(new_cost) {
    if (new_cost !== 0) {
        choose_time_btn_div.classList.remove("hidden");
        container.classList.add("bottom_container_margin");
        choose_time_btn.textContent = `Посмотреть заказ на ${new_cost} ₽`;
    } else {
        choose_time_btn_div.classList.add("hidden");
        container.classList.remove("bottom_container_margin");
    }
}

get_data_from_server(now_category_url).then((data_from_server) => {
    let response_status = data_from_server[0];
    if (response_status === 200) {
        if (order.user_order.size !== 0) {
            console.log(choose_time_btn_div);
            choose_time_btn_div.classList.remove("hidden");
            container.classList.add("bottom_container_margin");
            choose_time_btn.textContent = `Посмотреть заказ на ${order.order_cost} ₽`;
        }

        loading_image.classList.add("hidden");

        let items_from_server = data_from_server[1]["items"];

        for (let i in items_from_server) {
            let item_id_from_server = items_from_server[i]["itemId"];
            let item_cost_from_server = items_from_server[i]["itemCost"];
            let item_name_from_server = items_from_server[i]["itemName"];

            const is_zero = !(order.user_order.has(item_id_from_server));

            let item = create_element("div", "item");
            let internal_wrapper = create_element("div", "internal_wrapper");
            let item_img_name = create_element("div", "item_img_name");
            let item_cost_button = create_element("div", "item_cost_button");
            let item_img = create_image("item_img", `../images/Кофе.png`);
            let item_name = create_element("div", "item_name", items_from_server[i]["itemName"]);
            let item_cost = create_element("div", "item_cost", `${items_from_server[i]["itemCost"]} ₽`);
            let add_remove_figure = create_element("div", "add_remove_figure");
            let btn_add = create_element("button", "btn_add", "Добавить", !is_zero);
            let btn_plus = create_element("button", "btn_plus", "+", is_zero);
            let btn_minus = create_element("button", "btn_minus", "-", is_zero);
            let order_item_label = create_element("label", "order_item_label", "", is_zero);
            if (!is_zero) {
                order_item_label.textContent = order.user_order.get(item_id_from_server).item_number;
            }

            item_img_name.appendChild(item_img);
            item_img_name.appendChild(item_name);
            item_cost_button.appendChild(item_cost);
            item_cost_button.appendChild(add_remove_figure);
            add_remove_figure.appendChild(btn_add);
            add_remove_figure.appendChild(btn_minus);
            add_remove_figure.appendChild(order_item_label);
            add_remove_figure.appendChild(btn_plus);
            internal_wrapper.appendChild(item_img_name);
            internal_wrapper.appendChild(item_cost_button);
            item.appendChild(internal_wrapper);
            items.appendChild(item);

            graphical_items.set(items_from_server[i]['itemId'], item);

            btn_add.addEventListener("click", () => {
                btn_add.classList.add("hidden");
                btn_plus.classList.remove("hidden");
                btn_minus.classList.remove("hidden");
                order_item_label.classList.remove("hidden");
                order_item_label.textContent = "1";
                order.user_order.set(item_id_from_server, new ItemFromOrder(item_name_from_server, item_cost_from_server, 1));
                order.order_cost += +item_cost_from_server;
                update_choose_time_btn_label(order.order_cost);
                order.push_data_to_cash();
            });

            btn_plus.addEventListener("click", () => {
                let item_from_order = new ItemFromOrder(
                    item_name_from_server,
                    item_cost_from_server,
                    order.user_order.get(item_id_from_server).item_number + 1);

                order.user_order.set(item_id_from_server, item_from_order);
                order_item_label.textContent = order.user_order.get(item_id_from_server).item_number;
                order.order_cost += +item_cost_from_server;
                update_choose_time_btn_label(order.order_cost);
                order.push_data_to_cash();
            });

            btn_minus.addEventListener("click", () => {
                let item_from_order = new ItemFromOrder(
                    item_name_from_server,
                    item_cost_from_server,
                    order.user_order.get(item_id_from_server).item_number - 1);

                order.user_order.set(item_id_from_server, item_from_order);
                order.order_cost -= +item_cost_from_server;
                update_choose_time_btn_label(order.order_cost);
                if (order.user_order.get(item_id_from_server).item_number !== 0) {
                    order_item_label.textContent = order.user_order.get(item_id_from_server).item_number;
                } else {
                    order.user_order.delete(item_id_from_server);
                    btn_add.classList.remove("hidden");
                    btn_plus.classList.add("hidden");
                    btn_minus.classList.add("hidden");
                    order_item_label.classList.add("hidden");
                }
                order.push_data_to_cash();
            });
        }
    }
    for (let id of graphical_items.keys()) {
        graphical_items.get(id).addEventListener("click", (event) => {
            if (!event.target.closest('.add_remove_figure')) {
                console.log(`id: ${id}`);
                console.log(graphical_items.get(id));
            }
        });
    }
});
