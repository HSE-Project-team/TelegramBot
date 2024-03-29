export function create_element(element_type, class_name = "", text_content = "", is_hidden = false) {
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

export function create_image(class_name = "", src, alt) {
    let element_variable = document.createElement("img");
    element_variable.className = class_name;
    element_variable.src = src;
    element_variable.alt = alt;
    return element_variable;
}

export function create_input(class_name = "", name, type, value, id) {
    let element_variable = document.createElement("input");
    element_variable.className = class_name;
    element_variable.name = name;
    element_variable.type = type;
    element_variable.value = value;
    element_variable.id = id;
    return element_variable;
}

export function seconds_to_time(seconds) {
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

export function show_element_with_animation(element_name, animation_class_show, animation_class_hide) {
    element_name.classList.remove("hidden");
    element_name.classList.remove(animation_class_hide);
    element_name.classList.add(animation_class_show);
}

export function hide_element_with_animation(element_name, animation_class_show, animation_class_hide) {
    element_name.classList.add(animation_class_hide);
    element_name.classList.remove(animation_class_show);
}

export function create_error_label(error_number, error_text) {
    let error_labels_wrapper = document.querySelector(".error_labels_wrapper");
    let error_number_label = document.querySelector(".error_number_label");
    let error_text_label = document.querySelector(".error_text_label");
    error_number_label.textContent = `Ошибка ${error_number}`;
    error_text_label.textContent = error_text;
    error_labels_wrapper.classList.remove("hidden");
}
