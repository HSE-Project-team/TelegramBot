import requests
import time
from yookassa import Payment
from yookassa import Configuration


def monitor_payment_status(payment_id):
    while True:
        payment = Payment.find_one(payment_id)
        status = payment.status
        print("Статус платежа:", status)

        if status in ["succeeded", "canceled"]:
            break

        time.sleep(5)


def read_shop_auth_credentials():
    credentials = {}
    with open("shop_auth_credentials", "r") as file:
        for line in file:
            key, value = line.strip().split(":")
            credentials[key.strip()] = value.strip()
    return credentials


if __name__ == '__main__':
    shop_auth_credentials = read_shop_auth_credentials()
    shop_id = shop_auth_credentials.get("shop_id")
    api_key = shop_auth_credentials.get("api_key")
    Configuration.configure(shop_id, api_key)
    payment_id = '2ddb0942-000f-5000-9000-10c68c02511a'
    print(shop_id, api_key)
    monitor_payment_status(payment_id)
