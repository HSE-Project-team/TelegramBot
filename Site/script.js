let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#2d2d2d";
tg.MainButton.color = "#ffbf74";

let item_id = "";

let btn_add_1 = document.querySelector("#btn_add_1");
let btn_add_2 = document.querySelector("#btn_add_2");
let btn_add_3 = document.querySelector("#btn_add_3");
let btn_add_4 = document.querySelector("#btn_add_4");
let btn_add_5 = document.querySelector("#btn_add_5");
let btn_add_6 = document.querySelector("#btn_add_6");

btn_add_1.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 1!");
        tg.MainButton.show();
        item_id = "1";
    }
})

btn_add_2.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 2!");
        tg.MainButton.show();
        item_id = "2";
    }
})

btn_add_3.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 3!");
        tg.MainButton.show();
        item_id = "3";
    }
})

btn_add_4.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 4!");
        tg.MainButton.show();
        item_id = "4";
    }
})

btn_add_5.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 5!");
        tg.MainButton.show();
        item_id = "5";
    }
})

btn_add_6.addEventListener("click", () => {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Выбрано блюдо 6!");
        tg.MainButton.show();
        item_id = "6";
    }
})

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    tg.sendData(item_id);
});
