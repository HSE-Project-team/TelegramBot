let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";
tg.MainButton.setText("Оформить заказ");
tg.MainButton.show();

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

// -------------------------------------
let item1 = document.getElementById("item1");
let add_remove_figure_1 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_1);

item1.replaceChild(add_remove_figure_1, item1.lastElementChild);

let btn_add_1 = document.createElement("button");
btn_add_1.textContent = "Добавить";
add_remove_figure_1.appendChild(btn_add_1);
set_btn_add_style(btn_add_1);

// -------------------------------------
let item2 = document.getElementById("item2");
let add_remove_figure_2 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_2);

item2.replaceChild(add_remove_figure_2, item2.lastElementChild);

let btn_add_2 = document.createElement("button");
btn_add_2.textContent = "Добавить";
add_remove_figure_2.appendChild(btn_add_2);
set_btn_add_style(btn_add_2);

// -------------------------------------
let item3 = document.getElementById("item3");
let add_remove_figure_3 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_3);

item3.replaceChild(add_remove_figure_3, item3.lastElementChild);

let btn_add_3 = document.createElement("button");
btn_add_3.textContent = "Добавить";
add_remove_figure_3.appendChild(btn_add_3);
set_btn_add_style(btn_add_3);

// -------------------------------------
let item4 = document.getElementById("item4");
let add_remove_figure_4 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_4);

item4.replaceChild(add_remove_figure_4, item4.lastElementChild);

let btn_add_4 = document.createElement("button");
btn_add_4.textContent = "Добавить";
add_remove_figure_4.appendChild(btn_add_4);
set_btn_add_style(btn_add_4);

// -------------------------------------
let item5 = document.getElementById("item5");
let add_remove_figure_5 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_5);

item5.replaceChild(add_remove_figure_5, item5.lastElementChild);

let btn_add_5 = document.createElement("button");
btn_add_5.textContent = "Добавить";
add_remove_figure_5.appendChild(btn_add_5);
set_btn_add_style(btn_add_5);

// -------------------------------------
let item6 = document.getElementById("item6");
let add_remove_figure_6 = document.createElement("figure");
set_add_remove_figure_style(add_remove_figure_6);

item6.replaceChild(add_remove_figure_6, item6.lastElementChild);

let btn_add_6 = document.createElement("button");
btn_add_6.textContent = "Добавить";
add_remove_figure_6.appendChild(btn_add_6);
set_btn_add_style(btn_add_6);
// -------------------------------------

let item_id_array = new Array(7);


item_id_array[1] = document.createElement("label");
item_id_array[2] = document.createElement("label");
item_id_array[3] = document.createElement("label");
item_id_array[4] = document.createElement("label");
item_id_array[5] = document.createElement("label");
item_id_array[6] = document.createElement("label");


btn_add_1.addEventListener("click", () => {
    btn_add_1.style.display = "none";

    let btn_minus_1 = document.createElement("button");
    btn_minus_1.textContent = "-";

    item_id_array[1] = document.createElement("label");
    item_id_array[1].textContent = "1";

    let btn_plus_1 = document.createElement("button");
    btn_plus_1.textContent = "+";

    add_remove_figure_1.appendChild(btn_minus_1);
    add_remove_figure_1.appendChild(item_id_array[1]);
    add_remove_figure_1.appendChild(btn_plus_1);

    btn_plus_1.addEventListener("click", () => {
        let new_number = +(item_id_array[1].textContent);
        new_number += 1;
        item_id_array[1].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_1.addEventListener("click", () => {
        let new_number = +(item_id_array[1].textContent);
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[1].textContent = new_number + "";
        } else {
            btn_add_1.style.display = "inline-block";
            btn_minus_1.style.display = "none";
            btn_plus_1.style.display = "none";
            item_id_array[1].style.display = "none";
            item_id_array[1].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });

    set_btn_plus_minus_style(btn_plus_1, "+");
    set_btn_plus_minus_style(btn_minus_1, "-");
    set_item_counter_style(item_id_array[1]);

    console.log(generate_data_for_send(item_id_array));
})

btn_add_2.addEventListener("click", () => {
    btn_add_2.style.display = "none";

    let btn_minus_2 = document.createElement("button");
    btn_minus_2.textContent = "-";

    item_id_array[2] = document.createElement("label");
    item_id_array[2].textContent = "1";

    let btn_plus_2 = document.createElement("button");
    btn_plus_2.textContent = "+";

    add_remove_figure_2.appendChild(btn_minus_2);
    add_remove_figure_2.appendChild(item_id_array[2]);
    add_remove_figure_2.appendChild(btn_plus_2);


    btn_plus_2.addEventListener("click", () => {
        let new_number = +item_id_array[2].textContent;
        new_number += 1;
        item_id_array[2].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_2.addEventListener("click", () => {
        let new_number = +item_id_array[2].textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[2].textContent = new_number + "";
        } else {
            btn_add_2.style.display = "inline-block";
            btn_minus_2.style.display = "none";
            btn_plus_2.style.display = "none";
            item_id_array[2].style.display = "none";
            item_id_array[2].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });


    set_btn_plus_minus_style(btn_plus_2, "+");
    set_btn_plus_minus_style(btn_minus_2, "-");
    set_item_counter_style(item_id_array[2]);

    console.log(generate_data_for_send(item_id_array));
})

btn_add_3.addEventListener("click", () => {
    btn_add_3.style.display = "none";

    let btn_minus_3 = document.createElement("button");
    btn_minus_3.textContent = "-";

    item_id_array[3] = document.createElement("label");
    item_id_array[3].textContent = "1";

    let btn_plus_3 = document.createElement("button");
    btn_plus_3.textContent = "+";

    add_remove_figure_3.appendChild(btn_minus_3);
    add_remove_figure_3.appendChild(item_id_array[3]);
    add_remove_figure_3.appendChild(btn_plus_3);


    btn_plus_3.addEventListener("click", () => {
        let new_number = +item_id_array[3].textContent;
        new_number += 1;
        item_id_array[3].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_3.addEventListener("click", () => {
        let new_number = +item_id_array[3].textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[3].textContent = new_number + "";
        } else {
            btn_add_3.style.display = "inline-block";
            btn_minus_3.style.display = "none";
            btn_plus_3.style.display = "none";
            item_id_array[3].style.display = "none";
            item_id_array[3].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });


    set_btn_plus_minus_style(btn_plus_3, "+");
    set_btn_plus_minus_style(btn_minus_3, "-");
    set_item_counter_style(item_id_array[3]);

    console.log(generate_data_for_send(item_id_array));
})

btn_add_4.addEventListener("click", () => {
    btn_add_4.style.display = "none";

    let btn_minus_4 = document.createElement("button");
    btn_minus_4.textContent = "-";

    item_id_array[4] = document.createElement("label");
    item_id_array[4].textContent = "1";

    let btn_plus_4 = document.createElement("button");
    btn_plus_4.textContent = "+";

    add_remove_figure_4.appendChild(btn_minus_4);
    add_remove_figure_4.appendChild(item_id_array[4]);
    add_remove_figure_4.appendChild(btn_plus_4);


    btn_plus_4.addEventListener("click", () => {
        let new_number = +item_id_array[4].textContent;
        new_number += 1;
        item_id_array[4].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_4.addEventListener("click", () => {
        let new_number = +item_id_array[4].textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[4].textContent = new_number + "";
        } else {
            btn_add_4.style.display = "inline-block";
            btn_minus_4.style.display = "none";
            btn_plus_4.style.display = "none";
            item_id_array[4].style.display = "none";
            item_id_array[4].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });


    set_btn_plus_minus_style(btn_plus_4, "+");
    set_btn_plus_minus_style(btn_minus_4, "-");
    set_item_counter_style(item_id_array[4]);

    console.log(generate_data_for_send(item_id_array));
})

btn_add_5.addEventListener("click", () => {
    btn_add_5.style.display = "none";

    let btn_minus_5 = document.createElement("button");
    btn_minus_5.textContent = "-";

    item_id_array[5] = document.createElement("label");
    item_id_array[5].textContent = "1";

    let btn_plus_5 = document.createElement("button");
    btn_plus_5.textContent = "+";

    add_remove_figure_5.appendChild(btn_minus_5);
    add_remove_figure_5.appendChild(item_id_array[5]);
    add_remove_figure_5.appendChild(btn_plus_5);


    btn_plus_5.addEventListener("click", () => {
        let new_number = +item_id_array[5].textContent;
        new_number += 1;
        item_id_array[5].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_5.addEventListener("click", () => {
        let new_number = +item_id_array[5].textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[5].textContent = new_number + "";
        } else {
            btn_add_5.style.display = "inline-block";
            btn_minus_5.style.display = "none";
            btn_plus_5.style.display = "none";
            item_id_array[5].style.display = "none";
            item_id_array[5].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });


    set_btn_plus_minus_style(btn_plus_5, "+");
    set_btn_plus_minus_style(btn_minus_5, "-");
    set_item_counter_style(item_id_array[5]);

    console.log(generate_data_for_send(item_id_array));
})

btn_add_6.addEventListener("click", () => {
    btn_add_6.style.display = "none";

    let btn_minus_6 = document.createElement("button");
    btn_minus_6.textContent = "-";

    item_id_array[6] = document.createElement("label");
    item_id_array[6].textContent = "1";

    let btn_plus_6 = document.createElement("button");
    btn_plus_6.textContent = "+";

    add_remove_figure_6.appendChild(btn_minus_6);
    add_remove_figure_6.appendChild(item_id_array[6]);
    add_remove_figure_6.appendChild(btn_plus_6);


    btn_plus_6.addEventListener("click", () => {
        let new_number = +item_id_array[6].textContent;
        new_number += 1;
        item_id_array[6].textContent = new_number + "";

        console.log(generate_data_for_send(item_id_array));
    });

    btn_minus_6.addEventListener("click", () => {
        let new_number = +item_id_array[6].textContent;
        if (new_number >= 2) {
            new_number -= 1;
            item_id_array[6].textContent = new_number + "";
        } else {
            btn_add_6.style.display = "inline-block";
            btn_minus_6.style.display = "none";
            btn_plus_6.style.display = "none";
            item_id_array[6].style.display = "none";
            item_id_array[6].textContent = "0";
        }

        console.log(generate_data_for_send(item_id_array));
    });


    set_btn_plus_minus_style(btn_plus_6, "+");
    set_btn_plus_minus_style(btn_minus_6, "-");
    set_item_counter_style(item_id_array[6]);

    console.log(generate_data_for_send(item_id_array));
})

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(generate_data_for_send(item_id_array));
});