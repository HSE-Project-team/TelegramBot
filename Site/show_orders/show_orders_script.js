let tg = window.Telegram.WebApp;
tg.expand();

let back_btn_show_orders = tg.BackButton;
back_btn_show_orders.show();

let url_addresses = {
    user_url: "https://api.npoint.io/df9386412941a86767d4"
};

async function get_data_from_server(url) {
    const response = await fetch(url);
    return await response.json();
}

function create_element(element_type, class_name = "", text_content = "", is_hidden = false) {
    let element_variable = document.createElement(element_type);
    if (class_name !== "") {
        element_variable.className = class_name;
    }
    if (text_content !== "") {
        element_variable.textContent = text_content;
    }
    if (is_hidden) {
        element_variable.classList.add("hidden");
    }
    return element_variable;
}

function create_image(class_name = "", src, alt) {
    let element_variable = document.createElement("img");
    element_variable.className = class_name;
    element_variable.src = src;
    element_variable.alt = alt;
    return element_variable;
}

function seconds_to_time(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
}


let items_element = document.querySelector(".orders");
console.log(items_element);

get_data_from_server(url_addresses.user_url).then((data_from_server) => {
    let orders_length = data_from_server["orders"].length;
    for (let i = 0; i < orders_length; ++i) {
        let order_wrapper = create_element("div", "order_wrapper");
        let order_info = create_element("div", "order_info");

        let order_id = create_element("div", "order_id", "ID " + data_from_server["orders"][i]["orderId"]);
        let order_time = create_element("div", "order_time", "Заказ на " + seconds_to_time(data_from_server["orders"][i]["time"]));
        let order_status = create_element("div", "order_status");
        if (data_from_server["orders"][i]["status"] === "waiting for payment") {
            order_status.textContent = "Не оплачено ❌";
        } else {
            order_status.textContent = "Оплачено ✅";
        }

        order_info.appendChild(order_id);
        order_info.appendChild(order_time);
        order_info.appendChild(order_status);
        order_wrapper.appendChild(order_info);

        for (let item of data_from_server["orders"][i]["items"]) {
            let order_item = create_element("div", "order_item");
            let order_item_img = create_image("order_item_img", "Dish1.png", "");
            let order_item_name = create_element("div", "order_item_name", item["item"]["itemName"]);
            let order_item_cost = create_element("div", "order_item_cost", item["item"]["itemCost"] + " ₽/шт.");
            let order_item_number = create_element("div", "order_item_number", item["itemNumber"] + " шт.");

            order_wrapper.appendChild(order_item);
            order_item.appendChild(order_item_img);
            order_item.appendChild(order_item_name);
            order_item.appendChild(order_item_cost);
            order_item.appendChild(order_item_number);
        }
        items_element.appendChild(order_wrapper);
    }
});