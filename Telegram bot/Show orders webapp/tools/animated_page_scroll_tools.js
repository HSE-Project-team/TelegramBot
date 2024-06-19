let animated_page_scroll_algorithm = (end, duration) => {
    let start = window.scrollY;
    let change = end - start;
    let current_time = 0;

    function easeInOutAnimation(time, start, change, duration) {
        time /= duration / 2;
        if (time < 1) {
            return (change / 2) * time * time + start;
        }
        time--;
        return (-change / 2) * (time * (time - 2) - 1) + start;
    }

    function animate_scroll() {
        if (window.scrollY < 10) {
            current_time += 2;
        } else if (window.scrollY < 40) {
            current_time += 3;
        } else if (window.scrollY < 70) {
            current_time += 4;
        } else if (window.scrollY < 400) {
            current_time += 10;
        } else {
            current_time += 20;
        }
        window.scrollTo(0, easeInOutAnimation(current_time, start, change, duration));
        if (current_time < duration) {
            requestAnimationFrame(animate_scroll);
        }
    }

    animate_scroll();
}

export function animated_page_scroll(end_point, element_class) {
    document.querySelector(element_class).addEventListener("click", () => {
        if (window.scrollY < 50) {
            animated_page_scroll_algorithm(end_point, 50);
        } else if (window.scrollY < 100) {
            animated_page_scroll_algorithm(end_point, 100);
        } else if (window.scrollY < 200) {
            animated_page_scroll_algorithm(end_point, 200);
        } else if (window.scrollY < 400) {
            animated_page_scroll_algorithm(end_point, 250);
        } else if (window.scrollY < 500) {
            animated_page_scroll_algorithm(end_point, 300);
        } else if (window.scrollY < 550) {
            animated_page_scroll_algorithm(end_point, 400);
        } else {
            animated_page_scroll_algorithm(end_point, 600);
        }
    });
}

