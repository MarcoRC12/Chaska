
import time
import threading
import board
import busio
from flask import Flask, render_template, request
from flask_socketio import SocketIO
from gpiozero import Button
from adafruit_vl53l0x import VL53L0X

app = Flask(__name__)
socketio = SocketIO(app, async_mode="threading")  # sin eventlet

# ========== BOTONES FÍSICOS ==========
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

# ========== SENSOR VL53L0X ==========

i2c = busio.I2C(board.SCL, board.SDA)
vl53 = VL53L0X(i2c)
last_seen = 0
modo_espera = False

def sensor_listener():
    global last_seen, modo_espera
    while True:
        distancia = vl53.range
        print(f"📏 Distancia medida: {distancia} mm")  # 👈 Esto imprime en consola

        actual = time.time()

        if distancia < 800:
            if modo_espera or actual - last_seen > 300:
                print("👤 VL53L0X: detección tras inactividad")
                socketio.emit("redirigir", {"pagina": "index.html"})
                modo_espera = False
            last_seen = actual
        else:
            if actual - last_seen > 300:
                modo_espera = True

        time.sleep(1)

# ========== FLASK ==========
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/option")
def option():
    return render_template("option.html")

@app.route("/press", methods=["POST"])
def press():
    boton = request.form.get("button")
    print(f"[HTML] Botón presionado: {boton}")
    return "", 204

@socketio.on("connect")
def conectado():
    print("🌐 Cliente conectado por SocketIO")

# ========== INICIO ==========
if __name__ == "__main__":
    threading.Thread(target=gpio_listener, daemon=True).start()
    threading.Thread(target=sensor_listener, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)

# Español
@app.route("/es.html")
def es():
    return render_template("es.html")

@app.route("/es/castillo")
def castillo_es():
    return render_template("español/castillo_es.html")

@app.route("/es/mirador")
def mirador_es():
    return render_template("español/mirador_es.html")

@app.route("/es/wayku")
def wayku_es():
    return render_template("español/wayku_es.html")

# Inglés
@app.route("/en.html")
def en():
    return render_template("en.html")

@app.route("/en/castillo")
def castillo_en():
    return render_template("ingles/castillo_en.html")

@app.route("/en/mirador")
def mirador_en():
    return render_template("ingles/mirador_en.html")

@app.route("/en/wayku")
def wayku_en():
    return render_template("ingles/wayku_en.html")

# Quechua
@app.route("/quechua.html")
def quechua():
    return render_template("quechua.html")

@app.route("/quechua/castillo")
def castillo_quechua():
    return render_template("quechua/castillo_quechua.html")

@app.route("/quechua/mirador")
def mirador_quechua():
    return render_template("quechua/mirador_quechua.html")

@app.route("/quechua/wayku")
def wayku_quechua():
    return render_template("quechua/wayku_quechua.html")
