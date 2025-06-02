from flask import Flask, render_template, request
from flask_socketio import SocketIO
from gpiozero import Button
import threading
import time

app = Flask(__name__)
socketio = SocketIO(app, async_mode="threading")  # evita eventlet

buttons = {
    17: "attractions",
    27: "restaurants",
    22: "hotels",
    23: "other"
}

gpio_buttons = {pin: Button(pin) for pin in buttons}

def gpio_listener():
    while True:
        for pin, btn in gpio_buttons.items():
            if btn.is_pressed:
                nombre = buttons[pin]
                print(f"[GPIO] Se presionó: {nombre}")
                socketio.emit("disparar_click_virtual", {"boton": nombre})
                time.sleep(0.5)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/press", methods=["POST"])
def press():
    boton = request.form.get("button")
    print(f"[HTML] Botón presionado: {boton}")
    return "", 204

if __name__ == "__main__":
    thread = threading.Thread(target=gpio_listener)
    thread.daemon = True
    thread.start()
    socketio.run(app, host="0.0.0.0", port=5000)
