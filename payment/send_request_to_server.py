import requests
import time


def get_host():
    with open("host_credentials", "r") as file:
        host = file.read().strip()
    return host


def send_request():
    time.sleep(5)  # Ждем, пока сервер запустится
    response = requests.post(f'http://{get_host()}:5000/create_payment', data={'value': '1234'})
    if response.status_code == 200:
        print('Payment link:', response.json()['payment_link'])
    else:
        print('Error:', response.json())


if __name__ == '__main__':
    send_request()
