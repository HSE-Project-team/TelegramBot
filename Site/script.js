let url_addresses = {
    catalog_url: "https://api.npoint.io/e8788c3df8ed585a512f",
    free_order_time_url: "https://api.npoint.io/bb051384b63b14a8cdd8"
};

let tg = window.Telegram.WebApp;
tg.expand();

let back_btn = tg.BackButton;
back_btn.hide();

class ItemFromCatalog {
    constructor(item_name, item_img, item_cost) {
        this.item_name = item_name;
        this.item_img = item_img;
        this.item_cost = item_cost;
    }
}

class Catalog {
    Items = new Array(1);
    size = 0;

    addItem(item_name, item_img, item_cost) {
        this.Items.push(new ItemFromCatalog(item_name, item_img, item_cost));
        this.size += 1;
    }
}

class Order {
    user_order = new Map();

    order_cost = 0;
    order_time = "";

    generate_data_for_send() {
        let data_for_send = {
            order: [],
            cost: 0,
            time: ""
        };
        for (let key of order.user_order.keys()) {
            data_for_send.order.push([catalog.Items[key].item_name, order.user_order.get(key), catalog.Items[key].item_cost]);
        }
        data_for_send.cost = order.order_cost;
        data_for_send.time = order.order_time;

        data_for_send = JSON.stringify(data_for_send);

        return data_for_send;
    }
}

function increase_item_counter(i, textField) {
    let new_number = order.user_order.get(i) + 1;
    order.user_order.set(i, new_number);
    order.order_cost += +catalog.Items[i].item_cost;
    choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
    textField.textContent = new_number;
}

function draw_free_time_in_shopping_cart(free_time_array) {
    let time_slider_area = document.querySelector(".time_slider_area");

    let buttons_wrapper = create_element("div", "buttons_wrapper");
    time_slider_area.appendChild(buttons_wrapper);

    for (let free_time of free_time_array) {
        let free_time_button = create_input("free_time_button", "free_time", "radio", free_time, free_time);
        let free_time_label = create_element("label", "free_time_label", free_time);
        free_time_label.htmlFor = free_time;

        buttons_wrapper.appendChild(free_time_button);
        buttons_wrapper.appendChild(free_time_label);

        free_time_button.addEventListener("click", () => {
            checkout_btn.removeAttribute("disabled");
            checkout_btn.textContent = `Заказать к ${free_time_button.value} • ${order.order_cost} ₽`;
            order.order_time = free_time_button.value;

            let time_buttons = buttons_wrapper.children;
            for (let time_button of time_buttons) {
                if (time_button.className.includes("free_time_label")) {
                    time_button.classList.remove("selected_time");
                    time_button.classList.add("not_selected_time");
                }
            }
            free_time_label.classList.add("selected_time");
            free_time_label.classList.remove("not_selected_time");
        });
    }
}

function create_element(element_type, class_name = "", text_content = "", is_hidden = false) {
    let element_variable = document.createElement(element_type);
    if (class_name !== "") {
        element_variable.className = class_name;
    }
    if (text_content !== "") {
        element_variable.textContent = text_content;
    }
    if (is_hidden) {
        element_variable.classList.add("hidden");
    }
    return element_variable;
}

function create_image(class_name = "", src, alt) {
    let element_variable = document.createElement("img");
    element_variable.className = class_name;
    element_variable.src = src;
    element_variable.alt = alt;
    return element_variable;
}

function create_input(class_name = "", name, type, value, id) {
    let element_variable = document.createElement("input");
    element_variable.className = class_name;
    element_variable.name = name;
    element_variable.type = type;
    element_variable.value = value;
    element_variable.id = id;
    return element_variable;
}

function seconds_to_time(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
}

document.querySelector(".shopping_cart").classList.add("hidden");

let catalog = new Catalog();

order = new Order();

let graphicCatalogItemCounter = new Array(catalog.size + 1).fill(create_element("label"));

async function get_data_from_server(url) {
    const response = await fetch(url);
    console.log(response.status);
    if (response.status === 404) {
        let error_404_label = document.querySelector(".error_404_label");
        error_404_label.classList.remove("hidden");
    } else {
        return await response.json();
    }
}

get_data_from_server(url_addresses.catalog_url).then((data_from_server) => {
    if (data_from_server) {
        for (let catalog_item of data_from_server["catalog"]) {
            catalog.addItem(catalog_item["name"], catalog_item["img"], catalog_item["cost"]);
        }

        let graphicCatalogItems = new Array(catalog.size + 1);

        function decrease_item_counter(i, object_to_delete, location, textField) {
            let new_number = order.user_order.get(i);
            if (new_number >= 2) {
                new_number--;
                order.user_order.set(i, new_number);
                textField.textContent = new_number;
            } else {
                order.user_order.delete(i);
                if (order.user_order.size === 0) {
                    if (location === "catalog") {
                        choose_time_btn.classList.add("hidden");
                        document.querySelector(".container").classList.remove("bottom_container_margin");
                    } else {
                        object_to_delete.classList.add("hidden");
                        return -1;
                    }
                }
                if (location === "catalog") {
                    graphicCatalogItems[i].item_btn.classList.remove("hidden");
                    graphicCatalogItems[i].minus_btn.classList.add("hidden");
                    graphicCatalogItems[i].plus_btn.classList.add("hidden");
                    textField.classList.add("hidden");
                    textField.textContent = "0";
                } else {
                    object_to_delete.classList.add("hidden");
                }
            }
            order.order_cost -= +catalog.Items[i].item_cost;
            choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;
        }

        for (let i = 1; i < catalog.size + 1; ++i) {
            graphicCatalogItems[i] = create_element("div", "item");
            graphicCatalogItems[i].item_img = create_image("catalog_image", catalog.Items[i].item_img, "");
            graphicCatalogItems[i].item_name = create_element("div", "item_name", catalog.Items[i].item_name);
            graphicCatalogItems[i].item_cost = create_element("div", "item_cost", catalog.Items[i].item_cost + " ₽");
            graphicCatalogItems[i].item_btn = create_element("button", "btn_add", "Добавить");
            graphicCatalogItems[i].add_remove_figures = create_element("div", "add_remove_figure");

            graphicCatalogItems[i].minus_btn = create_element("button", "btn_minus", "-", true);

            graphicCatalogItemCounter[i] = create_element("label", "order_item_label", "", true);

            graphicCatalogItems[i].plus_btn = create_element("button", "btn_plus", "+", true);

            graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
                increase_item_counter(i, graphicCatalogItemCounter[i]);
            });

            graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
                decrease_item_counter(i, "none", "catalog", graphicCatalogItemCounter[i]);
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

        choose_time_btn.addEventListener("click", () => {
            get_data_from_server(url_addresses.free_order_time_url).then((data_from_server) => {
                let free_time_array = [];
                for (let free_time of data_from_server["freetime"]) {
                    console.log(free_time);
                    free_time_array.push(seconds_to_time(free_time));
                }

                draw_free_time_in_shopping_cart(free_time_array);
            });


            document.querySelector(".container").classList.remove("bottom_container_margin");
            document.querySelector(".items").classList.add("hidden");
            choose_time_btn.classList.add("hidden");
            document.querySelector(".shopping_cart").classList.remove("hidden");
            document.querySelector(".empty_shopping_cart_label").classList.add("hidden");
            document.querySelector(".shopping_cart_items").classList.remove("hidden");
            document.querySelector(".time_slider_area").classList.remove("hidden");

            let shopping_cart_items = document.querySelector(".shopping_cart_items");
            for (let key of order.user_order.keys()) {
                let shopping_item = create_element("div", "shopping_item");
                shopping_cart_items.appendChild(shopping_item);

                let shopping_cart_item_img = create_image("shopping_item_img", catalog.Items[key].item_img, "");
                let shopping_cart_item_name = create_element("div", "shopping_cart_item_name", catalog.Items[key].item_name);
                let shopping_cart_item_cost = create_element("div", "shopping_cart_item_cost", catalog.Items[key].item_cost + " ₽/шт.");
                let shopping_cart_add_remove_figure = create_element("div", "shopping_cart_add_remove_figure");
                let shopping_cart_minus_btn = create_element("button", "shopping_cart_minus_btn", "-");
                let shopping_cart_item_label = create_element("label", "shopping_cart_item_label", order.user_order.get(key));
                let shopping_cart_plus_btn = create_element("button", "shopping_cart_plus_btn", "+");

                shopping_cart_add_remove_figure.appendChild(shopping_cart_minus_btn);
                shopping_cart_add_remove_figure.appendChild(shopping_cart_item_label);
                shopping_cart_add_remove_figure.appendChild(shopping_cart_plus_btn);

                shopping_item.appendChild(shopping_cart_item_img);
                shopping_item.appendChild(shopping_cart_item_name);
                shopping_item.appendChild(shopping_cart_add_remove_figure);
                shopping_item.appendChild(shopping_cart_item_cost);

                shopping_cart_minus_btn.addEventListener("click", () => {
                    decrease_item_counter(key, shopping_item, "shopping cart", shopping_cart_item_label);
                    if (order.user_order.size === 0) {
                        shopping_cart_items.classList.add("hidden");
                        time_slider_area.classList.add("hidden");
                        checkout_btn.classList.add("hidden");
                        let empty_shopping_cart_label = document.querySelector(".empty_shopping_cart_label");
                        empty_shopping_cart_label.classList.remove("hidden");
                    }
                });

                shopping_cart_plus_btn.addEventListener("click", () => {
                    increase_item_counter(key, shopping_cart_item_label);
                });
            }

            back_btn.show();

            back_btn.onClick(() => {
                document.querySelector(".container").classList.add("bottom_container_margin");

                let shopping_cart = document.querySelector(".shopping_cart");
                shopping_cart.classList.add("hidden");
                let items = document.getElementById("items");
                items.classList.remove("hidden");
                if (order.user_order.size > 0) {
                    document.querySelector(".choose_time_btn").classList.remove("hidden");
                }

                for (let item of shopping_cart_items.children) {
                    item.classList.add("hidden");
                }

                for (let i = 0; i < items.children.length; ++i) {
                    if (items.children[i].className === "item") {
                        let old_item_label = items.children[i].querySelector(".add_remove_figure .order_item_label");
                        if (old_item_label) {
                            if (order.user_order.has(i + 1)) {
                                old_item_label.textContent = order.user_order.get(i + 1);
                            } else {
                                graphicCatalogItems[i + 1].item_btn.classList.remove("hidden");
                                graphicCatalogItemCounter[i + 1].classList.add("hidden");
                                graphicCatalogItems[i + 1].minus_btn.classList.add("hidden");
                                graphicCatalogItems[i + 1].plus_btn.classList.add("hidden");
                            }

                        }
                    }
                }
                back_btn.hide();
            });
            checkout_btn.classList.remove("hidden");
        });

        for (let i = 1; i < catalog.size + 1; ++i) {
            graphicCatalogItems[i].item_btn.addEventListener("click", () => {
                order.user_order.set(i, 1);
                choose_time_btn.classList.remove("hidden");
                document.querySelector(".container").classList.add("bottom_container_margin");

                order.order_cost += +catalog.Items[i].item_cost;
                choose_time_btn.textContent = `Посмотреть заказ • ${order.order_cost} ₽`;

                graphicCatalogItems[i].item_btn.classList.add("hidden");
                graphicCatalogItems[i].minus_btn.classList.remove("hidden");
                graphicCatalogItemCounter[i].classList.remove("hidden");
                graphicCatalogItemCounter[i].textContent = "1";
                graphicCatalogItems[i].plus_btn.classList.remove("hidden");
            });
        }
    }
})

let choose_time_btn = create_element("button", "choose_time_btn", "Посмотреть заказ", true);
document.querySelector(".container").classList.remove("bottom_container_margin");
document.querySelector(".items").appendChild(choose_time_btn);

let time_slider_area = document.querySelector(".time_slider_area");

let checkout_btn = document.querySelector(".checkout_btn");
checkout_btn.textContent = "Выберите время";
checkout_btn.setAttribute('disabled', '');
checkout_btn.classList.add("hidden");

checkout_btn.addEventListener("click", () => {
    tg.sendData(order.generate_data_for_send());
});


