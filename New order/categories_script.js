import {animated_page_scroll} from "./tools/animated_page_scroll_tools.js";
import {categories_url} from "./URL_storage.js";
import {
    get_data_from_server, send_data_to_server
} from "./tools/networking_tools.js"
import {
    create_element,
    create_image,
    show_element_with_animation,
    hide_element_with_animation,
    push_plus_minus_button_animation, create_error_label
} from "./tools/graphical_tools.js";
import {show_error} from "./errors_handler/errors_handler.js";

let categories = document.querySelector(".categories");
let back_btn_to_menu = document.querySelector(".back_btn_to_menu");
let header_label = document.querySelector(".header_label");
let page_header = document.querySelector(".page_header");
back_btn_to_menu.classList.add("hidden");
header_label.classList.add("header_label_categories");
page_header.classList.add("page_header_categories");

animated_page_scroll(0, ".header_label_wrapper");

get_data_from_server(categories_url).then((data_from_server) => {
    let response_status = data_from_server[0];
    data_from_server = data_from_server[1];
    document.querySelector(".loading_image_wrapper").classList.add("hidden");
    if (response_status === 200) {
        let gap_for_animation = 0;
        for (let item in data_from_server) {
            let category_div = create_element("div", "category_div");
            let category_link = create_element("a", "category_link", data_from_server[item]);
            category_link.href = "catalog/catalog.html"
            category_div.appendChild(category_link);
            categories.appendChild(category_div);
            category_div.addEventListener("click", () => {
                localStorage.setItem("category", category_div.children[0].textContent);
            });
            gap_for_animation += 0.03;
            category_div.style.animationDelay = `${gap_for_animation}s`;
        }
    } else {
        show_error(response_status);
    }
});

