from flask import Flask, render_template, jsonify, request
from payment import process_payment

app = Flask(__name__)


def read_confirmation_token():
    with open("confirmation_token", "r") as file:
        confirmation_token = file.read().strip()
    return confirmation_token


def get_host():
    with open("host_credentials", "r") as file:
        host = file.read().strip()
    return host


@app.route('/')
def render_payment_form():
    confirmation_token = read_confirmation_token()
    return render_template('payment_form.html', confirmation_token=confirmation_token)


def create_payment_link(payment_id):
    host = get_host()
    payment_link = f"http://{host}:5000/pay/{payment_id}"
    return payment_link


@app.route('/pay/<payment_id>', methods=['GET'])
def pay_order(payment_id):
    return render_payment_form()


@app.route('/create_payment', methods=['POST'])
def handle_create_payment():
    value = request.form.get('value')
    if not value:
        return jsonify({"error": "Missing value parameter"}), 400

    payment_id = process_payment(value)
    payment_link = create_payment_link(payment_id)
    return jsonify({"payment_link": payment_link})


if __name__ == '__main__':
    host = get_host()
    app.run(host=host, port=5000, debug=True, threaded=True)
