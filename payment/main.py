from flask import Flask, render_template, jsonify, request
from payment import process_payment
from yookassa import Payment, Configuration

app = Flask(__name__)


def read_confirmation_token():
    with open("temporary_data/confirmation_token", "r") as file:
        confirmation_token = file.read().strip()
    return confirmation_token


def get_host():
    with open("credentials/host_credentials", "r") as file:
        host = file.read().strip()
    return host


def read_shop_auth_credentials():
    credentials = {}
    with open("credentials/shop_auth_credentials", "r") as file:
        for line in file:
            key, value = line.strip().split(":")
            credentials[key.strip()] = value.strip()
    return credentials


@app.route('/payment_link/<payment_id>', methods=['GET'])
def get_payment_link(payment_id):
    payment_link = create_payment_link(payment_id)
    return str(payment_link), 200


def create_payment_link(payment_id):
    host = get_host()
    payment_link = f"http://{host}:5000/pay/{payment_id}"
    return payment_link


@app.route('/')
def render_payment_form():
    confirmation_token = read_confirmation_token()
    return render_template('payment_form.html', confirmation_token=confirmation_token)


@app.route('/pay/<payment_id>', methods=['GET'])
def pay_order(payment_id):
    return render_payment_form()


@app.route('/create_payment', methods=['POST'])
def handle_create_payment():
    data = request.json
    value = data.get('value')
    if not value:
        return str("error: Missing value parameter"), 400

    payment_id = process_payment(value)
    return str(payment_id), 200


@app.route('/payment_status/<payment_id>', methods=['GET'])
def get_payment_status(payment_id):
    shop_auth_credentials = read_shop_auth_credentials()
    shop_id = shop_auth_credentials.get("shop_id")
    api_key = shop_auth_credentials.get("api_key")
    Configuration.configure(shop_id, api_key)

    try:
        payment = Payment.find_one(payment_id)
        status = payment.status
        return str(status), 200
    except Exception as e:
        return "error" + str(e), 500


if __name__ == '__main__':
    host = get_host()
    app.run(host=host, port=5000, debug=True, threaded=True)
