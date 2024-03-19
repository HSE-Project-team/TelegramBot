let tg = window.Telegram.WebApp;
tg.expand();

class ItemFromCatalog {
    constructor(item_img, item_name, item_cost) {
        this.item_img = item_img;
        this.item_name = item_name;
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
        let answer_string = "Ваш заказ:\n";
        let item_counter = 1;
        for (let key of order.user_order.keys()) {
            answer_string += `${item_counter++}) ${catalog.Items[key].item_name} (${order.user_order.get(key)} шт.) – ${catalog.Items[key].item_cost}\n`;
        }
        answer_string += `\nСумма заказа: ${order.order_cost}\nВремя заказа: ${order.order_time}`;
        console.log(answer_string);
        return answer_string
    }
}

class Time {
    constructor() {
        this.hours = +(new Date().getHours());
        this.minutes = +(new Date().getMinutes());
    }

    reset_time() {
        this.hours = +(new Date().getHours());
        this.minutes = +(new Date().getMinutes());
    }

    add_to_time(gap) {
        this.minutes += +(gap);
        if (this.minutes >= 60) {
            this.minutes %= 60;
            this.hours += 1;
        }
    }

    get_now_time() {
        return this.format_time(new Date().getHours()) + ":" + this.format_time(new Date().getMinutes());
    }

    get_time() {
        return this.format_time(this.hours) + ":" + this.format_time(this.minutes);
    }

    format_time(time) {
        if (+time < 10) {
            return "0" + time;
        } else {
            return time;
        }
    }
}

catalog = new Catalog();

document.querySelector(".shopping_cart").classList.add("hidden");

catalog.addItem("Dish1.png", "Пельмени сибирские", "100");
catalog.addItem("Dish1.png", "Окрошка настоящая", "200");
catalog.addItem("Dish1.png", "Щи старорусские с яблоками", "150");
catalog.addItem("Dish1.png", "Утиная грудка с грушей томлёной", "290");
catalog.addItem("Dish1.png", "Биточки из медведя", "175");
catalog.addItem("Dish1.png", "Бифстекс из кабана", "45");
catalog.addItem("Dish1.png", "Жаренина изкартофеля", "444");
catalog.addItem("Dish1.png", "Нежное сливочное мороженое", "67");

order = new Order();

let graphicCatalogItems = new Array(catalog.size + 1);
let graphicCatalogItemCounter = new Array(catalog.size + 1).fill(document.createElement("label"));

for (let i = 1; i < catalog.size + 1; ++i) {
    graphicCatalogItems[i] = document.createElement("div");
    graphicCatalogItems[i].className = "item";

    graphicCatalogItems[i].item_img = document.createElement("img");
    graphicCatalogItems[i].item_img.src = catalog.Items[i].item_img;
    graphicCatalogItems[i].item_img.alt = "";
    graphicCatalogItems[i].item_img.className = "img";

    graphicCatalogItems[i].item_name = document.createElement("div");
    graphicCatalogItems[i].item_name.className = "item_name";
    graphicCatalogItems[i].item_name.textContent = catalog.Items[i].item_name;

    graphicCatalogItems[i].item_cost = document.createElement("div");
    graphicCatalogItems[i].item_cost.className = "item_cost";
    graphicCatalogItems[i].item_cost.textContent = catalog.Items[i].item_cost + " ₽";

    graphicCatalogItems[i].item_btn = document.createElement("button");
    graphicCatalogItems[i].item_btn.className = "btn_add";
    graphicCatalogItems[i].item_btn.textContent = "Добавить";

    graphicCatalogItems[i].add_remove_figures = document.createElement("figure");
    graphicCatalogItems[i].add_remove_figures.className = "add_remove_figure";

    graphicCatalogItems[i].minus_btn = document.createElement("button");
    graphicCatalogItems[i].minus_btn.textContent = "-";
    graphicCatalogItems[i].minus_btn.className = "btn_minus"
    graphicCatalogItems[i].minus_btn.classList.add("hidden");

    graphicCatalogItemCounter[i] = document.createElement("label");
    graphicCatalogItemCounter[i].className = "order_item_label";
    graphicCatalogItemCounter[i].classList.add("hidden");

    graphicCatalogItems[i].plus_btn = document.createElement("button");
    graphicCatalogItems[i].plus_btn.textContent = "+";
    graphicCatalogItems[i].plus_btn.className = "btn_plus"
    graphicCatalogItems[i].plus_btn.classList.add("hidden");

    graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
        increase_item_counter(i, graphicCatalogItemCounter[i]);
    });

    graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
        decrease_item_counter(i, "none", "catalog", graphicCatalogItemCounter[i]);
        console.log(order.user_order);
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

let free_time_array = ["12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55"];
draw_free_time_in_shopping_cart(free_time_array);

let choose_time_btn = document.createElement("button");
choose_time_btn.className = "choose_time_btn";
choose_time_btn.classList.add("hidden");
document.querySelector(".container").classList.remove("bottom_container_margin");
document.querySelector(".items").appendChild(choose_time_btn);
choose_time_btn.textContent = "Посмотреть заказ";

let time_slider = document.createElement("input");

let time_slider_area = document.querySelector(".time_slider_area");


function draw_free_time_in_shopping_cart(free_time_array) {
    let time_slider_area = document.querySelector(".time_slider_area");

    let buttons_wrapper = document.createElement("div");
    buttons_wrapper.className = "buttons_wrapper";
    time_slider_area.appendChild(buttons_wrapper);

    for (let free_time of free_time_array) {
        let free_time_button = document.createElement("input");
        free_time_button.name = "free_time";
        free_time_button.type = "radio";
        free_time_button.className = "free_time_button";
        free_time_button.value = free_time;
        free_time_button.id = free_time;
        let free_time_label = document.createElement("label");
        free_time_label.textContent = free_time;
        free_time_label.htmlFor = free_time;
        free_time_label.className = "free_time_label";
        buttons_wrapper.appendChild(free_time_button);
        buttons_wrapper.appendChild(free_time_label);

        free_time_button.addEventListener("click", () => {
            checkout_btn.textContent = "Заказаьть к " + free_time_button.value;
            order.order_time = free_time_button.value;

            let time_buttons = buttons_wrapper.children;
            for (let time_button of time_buttons) {
                if (time_button.className.includes("free_time_label")) {
                    time_button.classList.remove("selected_time");
                    time_button.classList.add("not_selected_time");
                }
                console.log(time_button);
            }
            free_time_label.classList.add("selected_time");
            free_time_label.classList.remove("not_selected_time");

        });
    }
}

let now_time = new Time();

let checkout_btn = document.createElement("button");
checkout_btn.className = "checkout_btn";
document.querySelector(".shopping_cart").appendChild(checkout_btn);
checkout_btn.textContent = "Заказать к " + now_time.get_time();
checkout_btn.classList.add("hidden");

checkout_btn.addEventListener("click", () => {
    tg.sendData(order.generate_data_for_send());
});

choose_time_btn.addEventListener("click", () => {
    document.querySelector(".items").classList.add("hidden");
    choose_time_btn.classList.add("hidden");
    document.querySelector(".container").classList.remove("bottom_container_margin");
    document.querySelector(".shopping_cart").classList.remove("hidden");
    document.querySelector(".empty_shopping_cart_label").classList.add("hidden");
    document.querySelector(".shopping_cart_items").classList.remove("hidden");
    document.querySelector(".time_slider_area").classList.remove("hidden");
    console.log(document.querySelector(".shopping_cart").classList);

    let shopping_cart_items = document.querySelector(".shopping_cart_items");
    for (let key of order.user_order.keys()) {
        let shopping_item = document.createElement("div");
        shopping_cart_items.appendChild(shopping_item);
        shopping_item.className = "shopping_item";

        let shopping_cart_item_img = document.createElement("img");
        shopping_cart_item_img.alt = "";
        shopping_cart_item_img.src = catalog.Items[key].item_img;
        shopping_cart_item_img.className = "shopping_item_img";

        let shopping_cart_item_name = document.createElement("div");
        shopping_cart_item_name.textContent = catalog.Items[key].item_name;
        shopping_cart_item_name.className = "shopping_cart_item_name";

        let shopping_cart_item_cost = document.createElement("div");
        shopping_cart_item_cost.textContent = catalog.Items[key].item_cost + " ₽/шт.";
        shopping_cart_item_cost.className = "shopping_cart_item_cost";

        let shopping_cart_add_remove_figure = document.createElement("figure");
        shopping_cart_add_remove_figure.className = "shopping_cart_add_remove_figure"

        let shopping_cart_minus_btn = document.createElement("button");
        shopping_cart_minus_btn.textContent = "-";
        shopping_cart_minus_btn.className = "shopping_cart_minus_btn"

        let shopping_cart_item_label = document.createElement("label");
        shopping_cart_item_label.textContent = order.user_order.get(key);
        shopping_cart_item_label.className = "shopping_cart_item_label";

        let shopping_cart_plus_btn = document.createElement("button");
        shopping_cart_plus_btn.textContent = "+";
        shopping_cart_plus_btn.className = "shopping_cart_plus_btn";

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
            console.log(order.user_order);
        });

        shopping_cart_plus_btn.addEventListener("click", () => {
            increase_item_counter(key, shopping_cart_item_label);
        });
    }

    let back_btn = tg.BackButton;
    back_btn.show();

    back_btn.onClick(() => {
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
                console.log("old_item_label: " + old_item_label);
                console.log("elem: " + order.user_order.get(i + 1));
                console.log(items.children[i].querySelector(".add_remove_figure"));
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

    time_slider.classList.remove("hidden");
    checkout_btn.classList.remove("hidden");
    document.querySelector(".container").classList.add("bottom_container_margin");

    time_slider.addEventListener("input", () => {
        now_time.reset_time();
        now_time.add_to_time(time_slider.value);
        checkout_btn.textContent = "Заказать к " + now_time.get_time();
        order.order_time = now_time.get_time();
    });
});

for (let i = 1; i < catalog.size + 1; ++i) {
    graphicCatalogItems[i].item_btn.addEventListener("click", () => {
        order.user_order.set(i, 1);
        console.log(order.user_order);
        choose_time_btn.classList.remove("hidden");
        document.querySelector(".container").classList.add("bottom_container_margin");

        order.order_cost += +catalog.Items[i].item_cost;

        graphicCatalogItems[i].item_btn.classList.add("hidden");
        graphicCatalogItems[i].minus_btn.classList.remove("hidden");
        graphicCatalogItemCounter[i].classList.remove("hidden");
        graphicCatalogItemCounter[i].textContent = "1";
        graphicCatalogItems[i].plus_btn.classList.remove("hidden");

        console.log(graphicCatalogItems[i].add_remove_figures);
    })
}

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
    console.log(order.user_order);
}

function increase_item_counter(i, textField) {
    let new_number = order.user_order.get(i) + 1;
    order.user_order.set(i, new_number);
    order.order_cost += +catalog.Items[i].item_cost;
    textField.textContent = new_number;
    console.log(order.user_order);
}
