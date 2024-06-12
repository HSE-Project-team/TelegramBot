import requests
import json

def create_payment(value):
    url = "http://localhost:5000/create_payment"
    data = {"value": value}

    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    return response.json()


def get_payment_link(payment_id):
    url = f"http://localhost:5000/payment_link/{payment_id}"
    response = requests.get(url)
    return response.json()


def get_payment_status(payment_id):
    url = f"http://localhost:5000/payment_status/{payment_id}"
    response = requests.get(url)
    return response.json()


def test_payment_flow():
    payment_id_response = create_payment("1234")
    print(payment_id_response)
    payment_id = payment_id_response["payment_id"]

    payment_link_response = get_payment_link(payment_id)
    print(payment_link_response)
    payment_link = payment_link_response["payment_link"]
    print(payment_link)

    status_response = get_payment_status(payment_id)
    payment_status = status_response.get("status")

    print("Payment ID:", payment_id)
    print("Payment Link:", payment_link)
    print("Payment Status:", payment_status)


if __name__ == "__main__":
    test_payment_flow()
