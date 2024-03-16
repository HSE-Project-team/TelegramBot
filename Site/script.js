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

    generate_data_for_send() {
        let answer_string = "Ваш заказ:\n";
        let item_counter = 1;
        for (let key of order.user_order.keys()) {
            answer_string += `${item_counter++}) ${catalog.Items[key].item_name} (${order.user_order.get(key)} шт.) – ${catalog.Items[key].item_cost}\n`;
        }
        answer_string += `\nСумма заказа: ${order.order_cost}`;
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

    document.querySelector(".items").appendChild(graphicCatalogItems[i]);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_img);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_name);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_cost);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].add_remove_figures);
    graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].item_btn);
}

let choose_time_btn = document.createElement("button");
choose_time_btn.className = "choose_time_btn";
choose_time_btn.classList.add("hidden");
document.querySelector(".container").classList.remove("bottom_container_margin");
document.querySelector(".items").appendChild(choose_time_btn);
choose_time_btn.textContent = "Посмотреть заказ";

let time_slider = document.createElement("input");
time_slider.type = "range";

time_slider.min = "0";
time_slider.max = "60";
time_slider.value = "0";
time_slider.className = "time_slider";
document.querySelector(".shopping_cart").appendChild(time_slider);
time_slider.classList.add("hidden");


let choose_time_label = document.createElement("label");
choose_time_label.className = "choose_time_label";
document.querySelector(".shopping_cart").appendChild(choose_time_label);
choose_time_label.classList.add("hidden");

let cansel_choose_time_btn = document.createElement("button");
cansel_choose_time_btn.className = "cansel_choose_time_btn";
document.querySelector(".shopping_cart").appendChild(cansel_choose_time_btn);
cansel_choose_time_btn.textContent = "×";
cansel_choose_time_btn.classList.add("hidden");
document.querySelector(".container").classList.remove("bottom_container_margin");


let now_time = new Time();
choose_time_label.textContent = now_time.get_now_time();

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
    document.querySelector(".items").classList.remove("items");
    choose_time_btn.classList.add("hidden");
    document.querySelector(".container").classList.remove("bottom_container_margin");
    document.querySelector(".shopping_cart").classList.remove("hidden");

    let back_btn = tg.BackButton;
    back_btn.show();
    back_btn.onClick(() => {
        document.querySelector(".shopping_cart").classList.add("hidden");
        document.querySelector(".items").classList.remove("hidden");
        document.querySelector(".items").classList.add("items");
        choose_time_btn.classList.remove("hidden");
        document.querySelector(".container").classList.add("bottom_container_margin");
        back_btn.hide();
    });


    time_slider.classList.remove("hidden");
    choose_time_label.classList.remove("hidden");
    checkout_btn.classList.remove("hidden");
    cansel_choose_time_btn.classList.remove("hidden");
    document.querySelector(".container").classList.add("bottom_container_margin");

    time_slider.addEventListener("input", () => {
        now_time.reset_time();
        now_time.add_to_time(time_slider.value);
        choose_time_label.textContent = now_time.get_time();
        checkout_btn.textContent = "Заказать к " + now_time.get_time();
    });
});

cansel_choose_time_btn.addEventListener("click", () => {
    time_slider.classList.add("hidden");
    choose_time_label.classList.add("hidden");
    cansel_choose_time_btn.classList.add("hidden");
    document.querySelector(".container").classList.remove("bottom_container_margin");
    checkout_btn.classList.add("hidden");
    choose_time_btn.classList.remove("hidden");
    document.querySelector(".container").classList.add("bottom_container_margin");
})


for (let i = 1; i < catalog.size + 1; ++i) {
    graphicCatalogItems[i].item_btn.addEventListener("click", () => {
        order.user_order.set(i, 1);
        choose_time_btn.classList.remove("hidden");
        document.querySelector(".container").classList.add("bottom_container_margin");

        order.order_cost += +catalog.Items[i].item_cost;

        graphicCatalogItems[i].item_btn.classList.add("hidden");

        graphicCatalogItems[i].minus_btn = document.createElement("button");
        graphicCatalogItems[i].minus_btn.textContent = "-";
        graphicCatalogItems[i].minus_btn.className = "btn_minus"

        graphicCatalogItemCounter[i] = document.createElement("label");
        graphicCatalogItemCounter[i].textContent = order.user_order.get(i);
        graphicCatalogItemCounter[i].className = "order_item_label";

        graphicCatalogItems[i].plus_btn = document.createElement("button");
        graphicCatalogItems[i].plus_btn.textContent = "+";
        graphicCatalogItems[i].plus_btn.className = "btn_plus"

        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].minus_btn);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItemCounter[i]);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].plus_btn);

        graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
            let new_number = order.user_order.get(i) + 1;
            order.user_order.set(i, new_number);
            order.order_cost += +catalog.Items[i].item_cost;
            graphicCatalogItemCounter[i].textContent = new_number;
        });

        graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
            let new_number = order.user_order.get(i);
            if (new_number >= 2) {
                new_number--;
                order.user_order.set(i, new_number);
                graphicCatalogItemCounter[i].textContent = new_number;
            } else {
                order.user_order.delete(i);
                if (order.user_order.size === 0) {
                    choose_time_btn.classList.add("hidden");
                    document.querySelector(".container").classList.remove("bottom_container_margin");
                }
                graphicCatalogItems[i].item_btn.classList.remove("hidden");
                graphicCatalogItems[i].minus_btn.classList.add("hidden");
                graphicCatalogItems[i].plus_btn.classList.add("hidden");
                graphicCatalogItemCounter[i].classList.add("hidden");
                graphicCatalogItemCounter[i].textContent = "0";
            }
            order.order_cost -= +catalog.Items[i].item_cost;
        });
    })
}
