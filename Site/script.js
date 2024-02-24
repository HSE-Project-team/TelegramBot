let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";
tg.MainButton.setText("Оформить заказ");
tg.MainButton.show();

const items_number = 6;

function set_btn_plus_minus_style(btn_plus_minus_object, sign) {
    btn_plus_minus_object.style.border = "none";
    if (sign === "+") {
        btn_plus_minus_object.style.marginLeft = "7px";
        btn_plus_minus_object.style.borderRadius = "3px 20px 20px 3px";
    } else {
        btn_plus_minus_object.style.marginRight = "7px";
        btn_plus_minus_object.style.borderRadius = "20px 3px 3px 20px";
    }
    btn_plus_minus_object.style.width = "38px";
    btn_plus_minus_object.style.height = "38px";
    btn_plus_minus_object.style.color = "#2d2d2d";
    btn_plus_minus_object.style.backgroundColor = "#ffdaae";
    btn_plus_minus_object.style.transition = "background-color 0.1s linear";
    btn_plus_minus_object.style.fontSize = "15px";
    set_btn_hover_style(btn_plus_minus_object);
}

function set_btn_add_style(btn_add_object) {
    btn_add_object.style.display = "inline-block";
    btn_add_object.style.border = "none";
    btn_add_object.style.borderRadius = "20px";
    btn_add_object.style.width = "100px";
    btn_add_object.style.height = "38px";
    btn_add_object.style.color = "#2d2d2d";
    btn_add_object.style.backgroundColor = "#ffdaae";
    btn_add_object.style.fontSize = "13px";
    set_btn_hover_style(btn_add_object);
}

function set_btn_hover_style(btn_object) {
    btn_object.addEventListener("mouseover", () => {
        btn_object.style.transition = "background-color 0.1s linear";
        btn_object.style.backgroundColor = "#ffe4c4";
    });

    btn_object.addEventListener("mouseout", () => {
        btn_object.style.backgroundColor = "#ffdaae";
    });
}

function set_item_counter_style(item_counter_object) {
    item_counter_object.style.width = "24px";
    item_counter_object.style.fontSize = "18px";
    item_counter_object.style.fontFamily = "'Open Sans', sans-serif";
}

function set_add_remove_figure_style(figure_object) {
    figure_object.style.borderRadius = "20px";
    figure_object.style.width = "100px";
    figure_object.style.height = "38px";
    figure_object.style.display = "flex";
    figure_object.style.justifyContent = "space-between"
    figure_object.style.alignItems = "center";
    figure_object.style.justifyContent = "center";
    figure_object.style.backgroundColor = "#ffdaae";
    figure_object.style.marginTop = "12px";
}

class ItemFromCatalog {
    constructor(item_img, item_name) {
        this.item_img = item_img;
        this.item_name = item_name;
    }
}

class Catalog {
    Items = new Array(1);

    addItem(item_name, item_img) {
        this.Items.push(new ItemFromCatalog(item_name, item_img));
    }
}

class Order {
    order_items = new Array(items_number + 1).fill(document.createElement("label"));

    generate_data_for_send() {
        let answer_string = ""
        for (let i = 1; i < this.order_items.length; ++i) {
            answer_string += `item_id=${i}, item_counter=${this.order_items[i].textContent}`
            if (i !== this.order_items.length - 1) {
                answer_string += ", "
            }
        }
        return answer_string;
    }
}

catalog = new Catalog();
order = new Order();

catalog.addItem("Dish1.png", "Блюдо 1");
catalog.addItem("Dish1.png", "Блюдо 2");
catalog.addItem("Dish1.png", "Блюдо 3");
catalog.addItem("Dish1.png", "Блюдо 4");
catalog.addItem("Dish1.png", "Блюдо 5");
catalog.addItem("Dish1.png", "Блюдо 6");

let graphicCatalogItems = new Array(items_number + 1);

for (let i = 1; i < items_number + 1; ++i) {
    graphicCatalogItems[i] = document.createElement("div");
    graphicCatalogItems[i].className = "item";

    graphicCatalogItems[i].item_img = document.createElement("img");
    graphicCatalogItems[i].item_img.src = catalog.Items[i].item_img;
    graphicCatalogItems[i].item_img.alt = "";
    graphicCatalogItems[i].item_img.className = "img";

    graphicCatalogItems[i].item_name = document.createElement("div");
    graphicCatalogItems[i].item_name.className = "item_name";
    graphicCatalogItems[i].item_name.textContent = catalog.Items[i].item_name;

    graphicCatalogItems[i].item_btn = document.createElement("button");
    graphicCatalogItems[i].item_btn.className = "btn_add";
    graphicCatalogItems[i].item_btn.textContent = "Добавить";

    graphicCatalogItems[i].add_remove_figures = document.createElement("figure");

    document.getElementById("items").appendChild(graphicCatalogItems[i]);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_img);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].item_name);
    graphicCatalogItems[i].appendChild(graphicCatalogItems[i].add_remove_figures);
    graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].item_btn);

    set_add_remove_figure_style(graphicCatalogItems[i].add_remove_figures);
    set_btn_add_style(graphicCatalogItems[i].item_btn);
}

for (let i = 1; i < items_number + 1; ++i) {
    graphicCatalogItems[i].item_btn.addEventListener("click", () => {

        graphicCatalogItems[i].item_btn.style.display = "none";

        graphicCatalogItems[i].munus_btn = document.createElement("button");
        graphicCatalogItems[i].munus_btn.textContent = "-";

        order.order_items[i] = document.createElement("label");
        order.order_items[i].textContent = "1";

        graphicCatalogItems[i].plus_btn = document.createElement("button");
        graphicCatalogItems[i].plus_btn.textContent = "+";

        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].munus_btn);
        graphicCatalogItems[i].add_remove_figures.appendChild(order.order_items[i]);
        graphicCatalogItems[i].add_remove_figures.appendChild(graphicCatalogItems[i].plus_btn);

        graphicCatalogItems[i].plus_btn.addEventListener("click", () => {
            let new_number = +(order.order_items[i].textContent);
            new_number += 1;
            order.order_items[i].textContent = new_number + "";
            console.log(order.generate_data_for_send());
        });

        graphicCatalogItems[i].munus_btn.addEventListener("click", () => {
            let new_number = +(order.order_items[i].textContent);
            if (new_number >= 2) {
                new_number -= 1;
                order.order_items[i].textContent = new_number + "";
            } else {
                graphicCatalogItems[i].item_btn.style.display = "inline-block";
                graphicCatalogItems[i].munus_btn.style.display = "none";
                graphicCatalogItems[i].plus_btn.style.display = "none";
                order.order_items[i].style.display = "none";
                order.order_items[i].textContent = "0";
            }
            console.log(order.generate_data_for_send());
        });

        set_btn_plus_minus_style(graphicCatalogItems[i].plus_btn, "+");
        set_btn_plus_minus_style(graphicCatalogItems[i].munus_btn, "-");
        set_item_counter_style(order.order_items[i]);

        console.log(order.generate_data_for_send());
    })
}

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(order.generate_data_for_send());
});
