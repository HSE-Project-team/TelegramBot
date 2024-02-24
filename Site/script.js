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

let item_id_array = new Array(items_number + 1).fill(document.createElement("label"));
let itemsContainer = document.getElementById("items");
let items = new Array(items_number + 1);
let images = new Array(items_number + 1);
let item_names = new Array(items_number + 1);
let btn_add_array = new Array(items_number + 1);
let add_remove_figures = new Array(items_number + 1);
let btn_minus_array = new Array(items_number + 1);
let btn_plus_array = new Array(items_number + 1);

for (let i = 1; i < items_number + 1; ++i) {
    items[i] = document.createElement("div");
    items[i].className = "item";

    images[i] = document.createElement("img");
    images[i].src = "Dish1.png";
    images[i].alt = "";
    images[i].className = "img";

    item_names[i] = document.createElement("div");
    item_names[i].className = "item_name";
    item_names[i].textContent = "Блюдо " + i;

    btn_add_array[i] = document.createElement("button");
    btn_add_array[i].className = "btn_add";
    btn_add_array[i].textContent = "Добавить";

    items[i].appendChild(images[i]);
    items[i].appendChild(item_names[i]);
    items[i].appendChild(btn_add_array[i]);
    itemsContainer.appendChild(items[i]);

    add_remove_figures[i] = document.createElement("figure");
    set_add_remove_figure_style(add_remove_figures[i]);

    items[i].replaceChild(add_remove_figures[i], items[i].lastElementChild);

    add_remove_figures[i].appendChild(btn_add_array[i]);
    set_btn_add_style(btn_add_array[i]);
}

for (let i = 1; i < items_number + 1; ++i) {
    btn_add_array[i].addEventListener("click", () => {

        btn_add_array[i].style.display = "none";

        btn_minus_array[i] = document.createElement("button");
        btn_minus_array[i].textContent = "-";

        item_id_array[i] = document.createElement("label");
        item_id_array[i].textContent = "1";

        btn_plus_array[i] = document.createElement("button");
        btn_plus_array[i].textContent = "+";

        add_remove_figures[i].appendChild(btn_minus_array[i]);
        add_remove_figures[i].appendChild(item_id_array[i]);
        add_remove_figures[i].appendChild(btn_plus_array[i]);

        btn_plus_array[i].addEventListener("click", () => {
            let new_number = +(item_id_array[i].textContent);
            new_number += 1;
            item_id_array[i].textContent = new_number + "";

            console.log(generate_data_for_send(item_id_array));
        });

        btn_minus_array[i].addEventListener("click", () => {
            let new_number = +(item_id_array[i].textContent);
            if (new_number >= 2) {
                new_number -= 1;
                item_id_array[i].textContent = new_number + "";
            } else {
                btn_add_array[i].style.display = "inline-block";
                btn_minus_array[i].style.display = "none";
                btn_plus_array[i].style.display = "none";
                item_id_array[i].style.display = "none";
                item_id_array[i].textContent = "0";
            }

            console.log(generate_data_for_send(item_id_array));
        });

        set_btn_plus_minus_style(btn_plus_array[i], "+");
        set_btn_plus_minus_style(btn_minus_array[i], "-");
        set_item_counter_style(item_id_array[i]);

        console.log(generate_data_for_send(item_id_array));
    })
}

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(generate_data_for_send(item_id_array));
});