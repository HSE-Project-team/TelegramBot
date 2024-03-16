let tg = window.Telegram.WebApp;
tg.expand();

class ItemFromCatalog {
    constructor(item_img, item_name, item_cost) {
        this.item_img = item_img;
        this.item_name = item_name;
        this.item_cost = item_cost + " ₽";
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
    order_items = new Array(catalog.size + 1).fill(document.createElement("label"));

    order_cost = 0;

    generate_data_for_send() {
        let answer_string = "";
        for (let i = 1; i < this.order_items.length; ++i) {
            answer_string += `item_id=${i}, item_counter=${this.order_items[i].textContent}`
            answer_string += ", "
        }
        answer_string += `order_cost=${this.order_cost}, `;
        answer_string += `order_time=${now_time.get_time()}`
        return answer_string;
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

document.getElementById("shopping_cart").style.display = "none";

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
    graphicCatalogItems[i].item_cost.textContent = catalog.Items[i].item_cost;

    graphicCatalogItems[i].item_btn = document.createElement("button");
    graphicCatalogItems[i].item_btn.className = "btn_add";
    graphicCatalogItems[i].item_btn.textContent = "Добавить";

    graphicCatalogItems[i].add_remove_figures = document.createElement("figure");
    graphicCatalogItems[i].add_remove_figures.className = "add_remove_figure";

    document.getElementById("items").appendChild(graphicCatalogItems[i]);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_img);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_name);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_cost);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].add_remove_figures);
    graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].item_btn);
}

let choose_time_btn = document.createElement("button");
choose_time_btn.className = "choose_time_btn";
document.getElementById("items").appendChild(choose_time_btn);
choose_time_btn.textContent = "Посмотреть заказ";

let time_slider = document.createElement("input");
time_slider.type = "range";

time_slider.min = "0";
time_slider.max = "60";
time_slider.value = "0";
time_slider.className = "time_slider";
document.getElementById("shopping_cart").appendChild(time_slider);
time_slider.style.display = "none";


let choose_time_label = document.createElement("label");
choose_time_label.className = "choose_time_label";
document.getElementById("shopping_cart").appendChild(choose_time_label);
choose_time_label.style.display = "none";

let cansel_choose_time_btn = document.createElement("button");
cansel_choose_time_btn.className = "cansel_choose_time_btn";
document.getElementById("shopping_cart").appendChild(cansel_choose_time_btn);
cansel_choose_time_btn.textContent = "×";
cansel_choose_time_btn.style.display = "none";

let now_time = new Time();
choose_time_label.textContent = now_time.get_now_time();

let checkout_btn = document.createElement("button");
checkout_btn.className = "checkout_btn";
document.getElementById("shopping_cart").appendChild(checkout_btn);
checkout_btn.textContent = "Заказать к " + now_time.get_time();
checkout_btn.style.display = "none";

checkout_btn.addEventListener("click", () => {
    console.log(order.generate_data_for_send());
    tg.sendData(order.generate_data_for_send());
});

choose_time_btn.addEventListener("click", () => {
    document.getElementById("items").style.display = "none";
    document.getElementById("shopping_cart").style.display = "inline-block";
    document.getElementById("shopping_cart").style.backgroundColor = "red";

    let back_btn = tg.BackButton;
    back_btn.show();
    back_btn.onClick(() => {
        document.getElementById("shopping_cart").style.display = "none";
        document.getElementById("items").style.display = "grid";
        back_btn.hide();
    });

    time_slider.style.display = "inline-block";
    choose_time_label.style.display = "inline-block";
    checkout_btn.style.display = "inline-block";
    cansel_choose_time_btn.style.display = "inline-block";

    time_slider.addEventListener("input", () => {
        now_time.reset_time();
        now_time.add_to_time(time_slider.value);
        choose_time_label.textContent = now_time.get_time();
        checkout_btn.textContent = "Заказать к " + now_time.get_time();
    });

});

cansel_choose_time_btn.addEventListener("click", () => {
    time_slider.style.display = "none";
    choose_time_label.style.display = "none";
    cansel_choose_time_btn.style.display = "none";
    checkout_btn.style.display = "none";
    choose_time_btn.style.display = "inline-block";

})


for (let i = 1; i < catalog.size + 1; ++i) {
    graphicCatalogItems[i].item_btn.addEventListener("click", () => {
        order.order_cost += parseInt(graphicCatalogItems[i].item_cost.textContent);

        graphicCatalogItems[i].item_btn.style.display = "none";

        graphicCatalogItems[i].minus_btn = document.createElement("button");
        graphicCatalogItems[i].minus_btn.textContent = "-";
        graphicCatalogItems[i].minus_btn.className = "btn_minus"

        order.order_items[i] = document.createElement("label");
        order.order_items[i].textContent = "1";
        order.order_items[i].className = "order_item_label";

        graphicCatalogItems[i].plus_btn = document.createElement("button");
        graphicCatalogItems[i].plus_btn.textContent = "+";
        graphicCatalogItems[i].plus_btn.className = "btn_plus"

        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].minus_btn);
        graphicCatalogItems[i].add_remove_figures.appendChild(order.order_items[i]);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].plus_btn);

        graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
            let new_number = +(order.order_items[i].textContent);
            new_number += 1;
            order.order_cost += parseInt(graphicCatalogItems[i].item_cost.textContent);
            order.order_items[i].textContent = new_number;
            console.log(order.generate_data_for_send());
        });

        graphicCatalogItems[i].minus_btn.addEventListener("click", () => {
            let new_number = +(order.order_items[i].textContent);
            if (new_number >= 2) {
                new_number -= 1;
                order.order_items[i].textContent = new_number + "";
            } else {
                graphicCatalogItems[i].item_btn.style.display = "inline-block";
                graphicCatalogItems[i].minus_btn.style.display = "none";
                graphicCatalogItems[i].plus_btn.style.display = "none";
                order.order_items[i].style.display = "none";
                order.order_items[i].textContent = "0";
            }
            order.order_cost -= parseInt(graphicCatalogItems[i].item_cost.textContent);
            console.log(order.generate_data_for_send());
        });

        console.log(order.generate_data_for_send());
    })
}
