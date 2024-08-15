export class ItemFromOrder {
    constructor(item_name, item_cost, item_number, item_category) {
        this.item_name = item_name;
        this.item_cost = item_cost;
        this.item_number = item_number;
        this.item_category = item_category;
    }
}

export class Order {
    user_order = new Map();

    order_cost = 0;
    order_time = "";
    order_comment = "";

    get_data_from_cash() {
        let order_from_shopping_cart_page = JSON.parse(localStorage.getItem("user_order"));
        if (order_from_shopping_cart_page) {
            for (let item of order_from_shopping_cart_page) {
                this.user_order.set(item[0], item[1]);
            }
        }
        if (localStorage.getItem("user_order_cost")) {
            this.order_cost = +localStorage.getItem("user_order_cost");
        }
        if (localStorage.getItem("user_order_comment")) {
            this.order_comment = localStorage.getItem("user_order_comment");
        }
        if (localStorage.getItem("user_order_time")) {
            this.order_time = localStorage.getItem("user_order_time");
        }
    }

    push_data_to_cash() {
        let json_order = JSON.stringify(Array.from(this.user_order));
        localStorage.setItem("user_order", json_order);
        localStorage.setItem("user_order_cost", this.order_cost.toString());
        localStorage.setItem("user_order_comment", this.order_comment.toString());
        localStorage.setItem("user_order_time", this.order_time.toString());
    }
}
