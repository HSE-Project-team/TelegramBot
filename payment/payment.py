from enum import Enum

import requests
import time
from yookassa import Payment
from yookassa import Configuration
import random
import string


def read_shop_auth_credentials():
    credentials = {}
    with open("credentials/shop_auth_credentials", "r") as file:
        for line in file:
            key, value = line.strip().split(":")
            credentials[key.strip()] = value.strip()
    return credentials


def create_payment_response(value, idempotence_key, shop_id, api_key):
    url = "https://api.yookassa.ru/v3/payments"
    headers = {
        "Content-Type": "application/json",
        "Idempotence-Key": idempotence_key
    }
    auth = (shop_id, api_key)
    print(auth)
    data = {
        "amount": {
            "value": value,
            "currency": "RUB"
        },
        "confirmation": {
            "type": "embedded"
        },
        "capture": True,
        "description": "Test"
    }

    response = requests.post(url, json=data, headers=headers, auth=auth)

    if response.status_code == 200:
        return response.json()
    else:
        print("Ошибка при создании платежа:", response.text)
        print(data)
        return None


def create_payment(value, shop_id, api_key):
    response = None
    idempotence_key = -1
    while response is None or response['status'] != 'pending':
        idempotence_key = generate_idempotence_key()
        print(idempotence_key, "Idempotence Key")
        response = create_payment_response(value, idempotence_key, shop_id, api_key)
        print(response, "response")
    print("Платеж успешно создан")
    print(idempotence_key, "idempotence_key")
    return response


def save_in_file(data, file_name):
    with open(file_name, "w") as file:
        file.write(data)


def monitor_payment_status(payment_id):
    while True:
        payment = Payment.find_one(payment_id)
        status = payment.status
        print("Статус платежа:", status)

        if status in ["succeeded", "canceled"]:
            break

        time.sleep(5)


def generate_idempotence_key(length=32):
    characters = string.ascii_letters + string.digits
    key = ''.join(random.choice(characters) for _ in range(length))
    return key


def map_status_to_backend(status):

    status_mapper = {
        "pending": "waiting for payment",
        "waiting_for_capture": "waiting for payment",
        "succeeded": "paid and preparing",
        "canceled": "cancelled"
    }

    return status_mapper[status]


def process_payment(value):
    print(value, "VALUE")
    shop_auth_credentials = read_shop_auth_credentials()
    shop_id = shop_auth_credentials.get("shop_id")
    api_key = shop_auth_credentials.get("api_key")
    Configuration.configure(shop_id, api_key)

    payment_data = create_payment(value, shop_id, api_key)

    payment_id = payment_data.get("id")
    print(payment_id, 'paymant_id')
    print(payment_data)
    confirmation_token = payment_data["confirmation"]["confirmation_token"]
    save_in_file(confirmation_token, "temporary_data/confirmation_token")
    save_in_file(payment_id, "temporary_data/payment_id")
    return payment_id


if __name__ == '__main__':
    value = 12345
    process_payment(value)
