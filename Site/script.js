let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";
tg.MainButton.setText("Оформить заказ");
tg.MainButton.show();

const items_number = 4;

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
    // btn_add_object.style.padding = "8px 8px 8px 8px";
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

function generate_data_for_send(data) {
    let answer_string = ""
    for (let i = 1; i < item_id_array.length; ++i) {
        answer_string += `item_id=${i}, item_counter=${data[i].textContent}`
        if (i !== item_id_array.length - 1) {
            answer_string += ", "
        }
    }
    return answer_string;
}

class ItemFromCatalog {
    constructor(item_img, item_name) {
        this.item_img = item_img;
        this.item_name = item_name;
    }
}

class Catalog {
    Items = new Array(1);

    addItem(item) {
        this.Items.push(item);
    }
}

catalog = new Catalog();

catalog.addItem(new ItemFromCatalog("Dish1.png", "Блюдо 1"));
catalog.addItem(new ItemFromCatalog("Dish1.png", "Блюдо 2"));
catalog.addItem(new ItemFromCatalog("Dish1.png", "Блюдо 3"));
catalog.addItem(new ItemFromCatalog("Dish1.png", "Блюдо 4"));

let item_id_array = new Array(items_number + 1).fill(document.createElement("label"));

let itemNewArray = new Array(items_number + 1);

for (let i = 1; i < items_number + 1; ++i) {
    itemNewArray[i] = document.createElement("div");
    itemNewArray[i].className = "item";

    itemNewArray[i].item_img = document.createElement("img");
    itemNewArray[i].item_img.src = catalog.Items[i].item_img;
    itemNewArray[i].item_img.alt = "";
    itemNewArray[i].item_img.className = "img";

    itemNewArray[i].item_title = document.createElement("div");
    itemNewArray[i].item_title.className = "item_name";
    itemNewArray[i].item_title.textContent = catalog.Items[i].item_name;

    itemNewArray[i].item_button = document.createElement("button");
    itemNewArray[i].item_button.className = "btn_add";
    itemNewArray[i].item_button.textContent = "Добавить";

    itemNewArray[i].appendChild(itemNewArray[i].item_img);
    itemNewArray[i].appendChild(itemNewArray[i].item_title);
    itemNewArray[i].appendChild(itemNewArray[i].item_title);
    itemNewArray[i].appendChild(itemNewArray[i].item_button);

    document.getElementById("items").appendChild(itemNewArray[i]);

    itemNewArray[i].add_remove_figures = document.createElement("figure");

    itemNewArray[i].appendChild(itemNewArray[i].add_remove_figures)
    itemNewArray[i].add_remove_figures.appendChild(itemNewArray[i].item_button);

    set_add_remove_figure_style(itemNewArray[i].add_remove_figures);

    console.log(i);
    console.log(itemNewArray[i].lastElementChild);

    set_btn_add_style(itemNewArray[i].item_button);
}

for (let i = 1; i < items_number + 1; ++i) {
    itemNewArray[i].item_button.addEventListener("click", () => {

        itemNewArray[i].item_button.style.display = "none";

        itemNewArray[i].munus_btn = document.createElement("button");
        itemNewArray[i].munus_btn.textContent = "-";

        item_id_array[i] = document.createElement("label");
        item_id_array[i].textContent = "1";

        itemNewArray[i].plus_btn = document.createElement("button");
        itemNewArray[i].plus_btn.textContent = "+";

        itemNewArray[i].add_remove_figures.appendChild(itemNewArray[i].munus_btn);
        itemNewArray[i].add_remove_figures.appendChild(item_id_array[i]);
        itemNewArray[i].add_remove_figures.appendChild(itemNewArray[i].plus_btn);

        itemNewArray[i].plus_btn.addEventListener("click", () => {
            let new_number = +(item_id_array[i].textContent);
            new_number += 1;
            item_id_array[i].textContent = new_number + "";

            console.log(generate_data_for_send(item_id_array));
        });

        itemNewArray[i].munus_btn.addEventListener("click", () => {
            let new_number = +(item_id_array[i].textContent);
            if (new_number >= 2) {
                new_number -= 1;
                item_id_array[i].textContent = new_number + "";
            } else {
                itemNewArray[i].item_button.style.display = "inline-block";
                itemNewArray[i].munus_btn.style.display = "none";
                itemNewArray[i].plus_btn.style.display = "none";
                item_id_array[i].style.display = "none";
                item_id_array[i].textContent = "0";
            }

            console.log(generate_data_for_send(item_id_array));
        });

        set_btn_plus_minus_style(itemNewArray[i].plus_btn, "+");
        set_btn_plus_minus_style(itemNewArray[i].munus_btn, "-");
        set_item_counter_style(item_id_array[i]);

        console.log(generate_data_for_send(item_id_array));
    })
}

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(generate_data_for_send(item_id_array));
});