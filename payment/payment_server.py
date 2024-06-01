from flask import Flask, render_template, jsonify, request
from payment import process_payment
from yookassa import Payment, Configuration

app = Flask(__name__)
#TODO - сохранять в базу словарь ayment_id confirmation_token, чтоб файлы ссобой не таскать
#TODO Избавиться от запроса к ayment и сделать через запрос к api


def read_confirmation_token():
    with open("confirmation_token", "r") as file:
        confirmation_token = file.read().strip()
    return confirmation_token


def get_host():
    with open("host_credentials", "r") as file:
        host = file.read().strip()
    return host


@app.route('/payment_link/<payment_id>', methods=['GET'])
def get_payment_link(payment_id):
    payment_link = create_payment_link(payment_id)
    return jsonify({"payment_link": payment_link})


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
    value = request.form.get('value')
    if not value:
        return jsonify({"error": "Missing value parameter"}), 400

    payment_id = process_payment(value)
    # payment_link = create_payment_link(payment_id)
    # jsonify({"payment_link": payment_link})
    return jsonify({"payment_id": payment_id})


@app.route('/payment_status/<payment_id>', methods=['GET'])
def get_payment_status(payment_id):
    shop_auth_credentials = read_shop_auth_credentials()
    shop_id = shop_auth_credentials.get("shop_id")
    api_key = shop_auth_credentials.get("api_key")
    Configuration.configure(shop_id, api_key)

    try:
        payment = Payment.find_one(payment_id)
        status = payment.status
        return jsonify({"payment_id": payment_id, "status": status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def read_shop_auth_credentials():
    credentials = {}
    with open("shop_auth_credentials", "r") as file:
        for line in file:
            key, value = line.strip().split(":")
            credentials[key.strip()] = value.strip()
    return credentials


if __name__ == '__main__':
    host = get_host()
    app.run(host=host, port=5000, debug=True, threaded=True)
