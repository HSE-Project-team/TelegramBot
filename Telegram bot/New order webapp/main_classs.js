export class ItemFromCatalog {
    constructor(item_id, item_name, item_img, item_cost) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.item_img = item_img;
        this.item_cost = item_cost;
    }
}

export class Catalog {
    Items = new Map();
    size = 0;

    addItem(item_id, item_name, item_img, item_cost) {
        this.Items.set(item_id, new ItemFromCatalog(item_id, item_name, item_img, item_cost));
    }

    get_data_from_cash() {
        let catalog_from_catalog_page = JSON.parse(localStorage.getItem("catalog_part"));
        for (let item of catalog_from_catalog_page) {
            this.addItem(item[1]["item_id"], item[1]["item_name"], item[1]["item_img"], item[1]["item_cost"]);
        }
    }

    push_data_to_cash() {
        let catalog_map = new Map();
        let json_catalog = Array.from(this.Items);
        for (let item of json_catalog) {
            catalog_map.set(item[0], item[1]);
        }
        let catalog_part_history = JSON.parse(localStorage.getItem("catalog_part"));
        if (catalog_part_history) {
            for (let item of catalog_part_history) {
                catalog_map.set(item[0], item[1]);
            }
        }
        localStorage.setItem("catalog_part", JSON.stringify(Array.from(catalog_map)));
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
            this.order_time = +localStorage.getItem("user_order_time");
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
