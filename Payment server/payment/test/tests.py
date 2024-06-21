import requests
import json
import pytest


@pytest.fixture(scope="module")
def server_url():
    return "http://localhost:5000"


def create_payment(server_url):
    url = f"{server_url}/create_payment"
    data = {"value": "1234"}
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    return response


def get_payment_link(server_url, payment_id):
    url = f"{server_url}/payment_link/{payment_id}"
    response = requests.get(url)
    return response


def get_payment_status(server_url, payment_id):
    url = f"{server_url}/payment_status/{payment_id}"
    response = requests.get(url)
    return response


def test_create_payment(server_url):
    response = create_payment(server_url)
    assert response.status_code == 200


def test_get_payment_link(server_url):
    response = create_payment(server_url)
    payment_id = response.text
    link_response = get_payment_link(server_url, payment_id)
    assert link_response.status_code == 200


def test_get_payment_status(server_url):
    response = create_payment(server_url)
    payment_id = response.text
    status_response = get_payment_status(server_url, payment_id)
    assert status_response.status_code == 200


if __name__ == "__main__":
    pytest.main()
