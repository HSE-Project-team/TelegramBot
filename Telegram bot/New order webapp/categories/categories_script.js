import {categories_url} from "../URL/URL_storage.js";
import {
    get_data_from_server
} from "../tools/networking_tools.js"
import {
    create_element, create_image
} from "../tools/graphical_tools.js";
import {show_error} from "../errors_handler/errors_handler.js";
import {Order} from "../tools/main_classs.js";

let order = new Order();
order.get_data_from_cash();

let container = document.querySelector(".container");
let choose_time_btn = document.querySelector(".choose_time_btn");
let choose_time_btn_div = document.querySelector(".choose_time_btn_div");
let loading_image_wrapper = document.querySelector(".loading_image_wrapper");

function proportional_elements_change(elements) {
    elements.forEach(element => {
        element.style.height = element.offsetWidth + 'px';
    });
}

get_data_from_server(categories_url).then((data_from_server) => {
    let response_status = data_from_server[0];
    loading_image_wrapper.classList.add("hidden");
    if (response_status === 200) {
        let categories = data_from_server[1];
        for (let item in categories) {
            let category_link = create_element("a", "category_link");
            let category_div = create_element("div", "category_div");
            let category_name = create_element("div", "category_name");
            let category_image = create_image("category_image", `images/${categories[item]}.png`);

            category_name.textContent = categories[item];
            category_link.href = "catalog/catalog.html"

            category_div.appendChild(category_image);
            category_div.appendChild(category_name);
            category_link.appendChild(category_div);
            container.appendChild(category_link);

            category_link.addEventListener("click", () => {
                localStorage.setItem("category", category_link.textContent);
            });
        }

        proportional_elements_change(document.querySelectorAll('.category_link'));

        if (order.user_order.size !== 0) {
            container.classList.add("bottom_container_margin");
            choose_time_btn.textContent = `Посмотреть заказ на ${order.order_cost} ₽`;
            choose_time_btn_div.classList.remove("hidden");
        }
    } else {
        show_error(response_status);
    }
});
window.addEventListener('resize', function () {
    proportional_elements_change(document.querySelectorAll('.category_link'));
});

choose_time_btn_div.addEventListener("click", function () {
    localStorage.setItem("previous_page", "categories");
});
