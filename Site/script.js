let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";
tg.MainButton.setText("Оформить заказ");
tg.MainButton.show();

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
        answer_string += `order_cost=${this.order_cost}`;
        return answer_string;
    }
}

catalog = new Catalog();

catalog.addItem("Dish1.png", "Блюдо 1", "100");
catalog.addItem("Dish1.png", "Блюдо 2", "200");
catalog.addItem("Dish1.png", "Блюдо 3", "150");
catalog.addItem("Dish1.png", "Блюдо 4", "290");
catalog.addItem("Dish1.png", "Блюдо 5", "175");
catalog.addItem("Dish1.png", "Блюдо 6", "120");

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
            order.order_items[i].textContent = new_number + "";
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

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(order.generate_data_for_send());
});