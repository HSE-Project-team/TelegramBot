export function clear_local_storage() {
    localStorage.removeItem("user_order");
    localStorage.removeItem("user_order_cost");
    localStorage.removeItem("user_order_comment");
    localStorage.removeItem("user_order_time");
    localStorage.removeItem("category");
    localStorage.removeItem("previous_page");
}