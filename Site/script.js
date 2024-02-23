let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";

let item_id = "";

// let btn_add_1 = document.querySelector("#btn_add_1");
let btn_add_2 = document.querySelector("#btn_add_2");
let btn_add_3 = document.querySelector("#btn_add_3");
let btn_add_4 = document.querySelector("#btn_add_4");
let btn_add_5 = document.querySelector("#btn_add_5");
let btn_add_6 = document.querySelector("#btn_add_6");

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

function generate_data_for_send(item_id_local, item_counter_local) {
    return `item_id=${item_id_local}, item_counter=${item_counter_local}`;
}

const item = document.getElementById("item1");
const add_remove_figure = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure);

item.replaceChild(add_remove_figure, item.lastElementChild);

btn_add_1 = document.createElement("button");
btn_add_1.textContent = "Добавить";
add_remove_figure.appendChild(btn_add_1);
set_btn_add_style(btn_add_1);

let item_counter_1 = document.createElement("label");


btn_add_1.addEventListener("click", () => {
    btn_add_1.style.display = "none";

    const btn_minus_1 = document.createElement("button");
    btn_minus_1.textContent = "-";

    item_counter_1 = document.createElement("label");
    item_counter_1.textContent = "1";

    const btn_plus_1 = document.createElement("button");
    btn_plus_1.textContent = "+";

    add_remove_figure.appendChild(btn_minus_1);
    add_remove_figure.appendChild(item_counter_1);
    add_remove_figure.appendChild(btn_plus_1);


    btn_plus_1.addEventListener("click", () => {
        let new_number = +item_counter_1.textContent;
        new_number += 1;
        item_counter_1.textContent = new_number + "";

        console.log(generate_data_for_send(item_id, item_counter_1.textContent))
    });

    btn_minus_1.addEventListener("click", () => {
        let new_number = +item_counter_1.textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_counter_1.textContent = new_number + "";
        } else {
            btn_add_1.style.display = "inline-block";
            btn_minus_1.style.display = "none";
            btn_plus_1.style.display = "none";
            item_counter_1.style.display = "none";
            item_counter_1.textContent = "0";
        }

        console.log(generate_data_for_send(item_id, item_counter_1.textContent))
    });


    set_btn_plus_minus_style(btn_plus_1, "+");
    set_btn_plus_minus_style(btn_minus_1, "-");
    set_item_counter_style(item_counter_1);

    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 1!");
        tg.MainButton.show();
        item_id = "1";
    }

    console.log(generate_data_for_send(item_id, item_counter_1.textContent))
})

btn_add_2.addEventListener("click", () => {
    btn_add_2.remove();
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 2!");
        tg.MainButton.show();
        item_id = "2";
    }
})

btn_add_3.addEventListener("click", () => {
    btn_add_3.remove();
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 3!");
        tg.MainButton.show();
        item_id = "3";
    }
})

btn_add_4.addEventListener("click", () => {
    btn_add_4.remove();
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 4!");
        tg.MainButton.show();
        item_id = "4";
    }
})

btn_add_5.addEventListener("click", () => {
    btn_add_5.remove();
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 5!");
        tg.MainButton.show();
        item_id = "5";
    }
})

btn_add_6.addEventListener("click", () => {
    btn_add_6.remove();
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 6!");
        tg.MainButton.show();
        item_id = "6";
    }
})

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(generate_data_for_send(item_id, item_counter_1.textContent));
});