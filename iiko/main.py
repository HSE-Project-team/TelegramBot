import requests


def get_api_login():
    try:
        with open('api_login', 'r') as file:
            api_login = file.read().strip()
            return api_login
    except FileNotFoundError:
        print("Файл 'api_login' не найден")
        return None


def get_token(api_login):
    url = 'https://api-ru.iiko.services/api/1/access_token'

    payload = {
        'apiLogin': api_login
    }

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        token = response.json().get('token')
        return token
    else:
        print("Error:", response.status_code)
        return None


def get_organisation_id(api_login):
    token = get_token(api_login)
    if not token:
        return None

    url = 'https://api-ru.iiko.services/api/1/organizations'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        organizations = response.json().get('organizations')
        if organizations:
            return organizations[0]['id']
        else:
            print("No organizations found")
            return None
    else:
        print("Error:", response.status_code)
        return None


def get_menu():
    api_login = get_api_login()
    if not api_login:
        return None

    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    url = 'https://api-ru.iiko.services/api/1/nomenclature'
    headers = {
        'Authorization': f'Bearer {get_token(api_login)}',
        'Content-Type': 'application/json'
    }

    payload = {
        "organizationId": organization_id,
        "startRevision": 0
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        products = response.json().get('products')
        if products:
            menu = {product['name']: product['id'] for product in products}
            return menu
        else:
            print("No products found")
            return None
    else:
        print("Error:", response.status_code)
        return None


def get_terminal_group():
    api_login = get_api_login()
    if not api_login:
        return None

    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    url = 'https://api-ru.iiko.services/api/1/terminal_groups'
    headers = {
        'Authorization': f'Bearer {get_token(api_login)}',
        'Content-Type': 'application/json'
    }

    payload = {
        "organizationIds": [organization_id]
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        terminal_groups = response.json().get('terminalGroups')
        if terminal_groups:
            first_terminal_group_id = terminal_groups[0]['items'][0]['id']
            return first_terminal_group_id
        else:
            print("No terminal groups found")
            return None
    else:
        print("Error:", response.status_code)
        return None


def create_order(order_items):
    api_login = get_api_login()
    if not api_login:
        return None

    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    terminal_group_id = get_terminal_group()
    if not terminal_group_id:
        return None

    url = 'https://api-ru.iiko.services/api/1/order/create'
    headers = {
        'Authorization': f'Bearer {get_token(api_login)}',
        'Content-Type': 'application/json'
    }

    items = []
    for product_id, amount in order_items.items():
        item = {
            "productId": product_id,
            "type": "Product",
            "amount": amount,
            "comment": "Тестовый заказ. Не делать!"
        }
        items.append(item)

    payload = {
        "organizationId": organization_id,
        "terminalGroupId": terminal_group_id,
        "order": {
            "items": items
        }
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        order_info = response.json()
        order_id = order_info.get('orderInfo', {}).get('id')
        if order_id:
            print("Заказ создан. ID заказа:", order_id)
            return order_id
        else:
            print("Ошибка: не удалось получить ID заказа из ответа.")
            return None
    else:
        print("Ошибка при создании заказа:", response.status_code, response.text)
        return None


def get_creation_status(order_id):
    api_login = get_api_login()
    if not api_login:
        return None

    token = get_token(api_login)
    if not token:
        return None

    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    url = 'https://api-ru.iiko.services/api/1/orders/status'
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "organizationId": organization_id,
        "orderIds": [order_id]
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        orders = data.get("orders")
        if orders and len(orders) > 0:
            creation_status = orders[0].get("creationStatus")
            print(f"Статус заказа {order_id}: {creation_status}")
            return creation_status
        else:
            print("Ошибка: заказы не найдены.")
            return None
    else:
        print("Ошибка при получении статуса заказа:", response.status_code, response.text)
        return None


def do_test_order():
    menu = get_menu()
    if not menu:
        print("Не удалось получить меню")
        return

    order_items = {}
    for product_id in list(menu.values())[:3]:
        order_items[product_id] = 0
    print(order_items)
    id = create_delivery(order_items)
    print(id)

    # id = "b0ac0368-9751-4ad0-834b-b56f3cb54793" #create_order(order_items)
    print(get_delivery_status_by_id(id))


import requests
from uuid import uuid4


class Order:
    def __init__(self, organization_id, terminal_group_id, items, phone, complete_before=None, order_type_id=None,
                 order_service_type="DeliveryByClient", comment=None):
        self.organization_id = organization_id
        self.terminal_group_id = terminal_group_id
        self.items = items
        self.complete_before = complete_before
        #"2077-12-31 23:59:59.999"
        self.phone = phone
        self.order_type_id = order_type_id
        self.order_service_type = order_service_type
        self.comment = comment
        self.id = str(uuid4())  # Уникальный ID заказа

    def to_dict(self):
        order_dict = {
            "organizationId": self.organization_id,
            "terminalGroupId": self.terminal_group_id,
            "order": {
                "id": self.id,
                "phone": self.phone,
                "items": self.items,
                "completeBefore" : self.complete_before
            }
        }
        if self.order_type_id:
            order_dict["order"]["orderTypeId"] = self.order_type_id
        if self.order_service_type:
            order_dict["order"]["orderServiceType"] = self.order_service_type
        if self.comment:
            order_dict["order"]["comment"] = self.comment

        return order_dict


def create_delivery(order_items, complete_before=None):
    api_login = get_api_login()
    if not api_login:
        return None

    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    terminal_group_id = get_terminal_group()
    if not terminal_group_id:
        return None

    items = [{"productId": product_id, "type": "Product", "amount": amount, "comment": "Тестовая доставка. Не делать!"}
             for product_id, amount in order_items.items()]

    order = Order(organization_id, terminal_group_id, items, "+70000000000", complete_before)

    url = 'https://api-ru.iiko.services/api/1/deliveries/create'
    headers = {
        'Authorization': f'Bearer {get_token(api_login)}',
        'Content-Type': 'application/json'
    }
    print(order.to_dict())
    response = requests.post(url, json=order.to_dict(), headers=headers)
    print(response.json())

    if response.status_code == 200:
        delivery_id = response.json().get('orderInfo', {}).get('id')
        if delivery_id:
            print(f"Доставка создана. ID доставки: {delivery_id}")
            return delivery_id
        else:
            print("Ошибка: не удалось получить ID доставки из ответа.")
            return None
    else:
        print(f"Ошибка при создании доставки: {response.status_code}, {response.text}")
        return None


def get_delivery_status_by_id(order_id):
    api_login = get_api_login()
    organization_id = get_organisation_id(api_login)
    if not organization_id:
        return None

    url = 'https://api-ru.iiko.services/api/1/deliveries/by_id'
    headers = {
        'Authorization': f'Bearer {get_token(api_login)}',
        'Content-Type': 'application/json'
    }

    payload = {
        "organizationId": organization_id,
        "orderIds": [order_id]
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        print(response.json())
        status = response.json()['orders'][0]['creationStatus']
        return status
    else:
        print(f"Error getting delivery by ID: {response.status_code}, {response.text}")
        return None


if __name__ == "__main__":
    do_test_order()
