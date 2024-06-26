import requests
import json


def create_payment(value):
    url = "http://localhost:5000/create_payment"
    data = {"value": value}

    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    return response


def get_payment_link(payment_id):
    url = f"http://localhost:5000/payment_link/{payment_id}"
    response = requests.get(url)
    return response


def get_payment_status(payment_id):
    url = f"http://localhost:5000/payment_status/{payment_id}"
    response = requests.get(url)
    return response


def test_payment_flow():
    payment_id_response = create_payment("1234")
    payment_id = payment_id_response.text

    payment_link_response = get_payment_link(payment_id)
    payment_link = payment_link_response.text

    status_response = get_payment_status(payment_id)
    payment_status = status_response.text

    print("Payment ID:", payment_id)
    print("Payment Link:", payment_link)
    print("Payment Status:", payment_status)


if __name__ == "__main__":
    test_payment_flow()