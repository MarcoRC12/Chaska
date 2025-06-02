import time
import threading
import board
import busio
from flask import Flask, render_template
from flask_socketio import SocketIO
from gpiozero import Button
from adafruit_vl53l0x import VL53L0X

# ====================
# ⚙️ Configuración base
# ====================
app = Flask(__name__)
socketio = SocketIO(app, async_mode="threading")

# ================
# 🎮 BOTONES FÍSICOS
# ================
buttons = {
    17: "es.html",       # Español
    27: "quechua.html",  # Quechua
    22: "en.html"        # Inglés
}
gpio_buttons = {pin: Button(pin) for pin in buttons}

def gpio_listener():
    while True:
        for pin, btn in gpio_buttons.items():
            if btn.is_pressed:
                destino = buttons[pin]
                print(f"[GPIO] Botón físico activó → {destino}")
                socketio.emit("redirigir", {"pagina": destino})
                time.sleep(0.5)

# ===================
# 📡 SENSOR DE DISTANCIA
# ===================
i2c = busio.I2C(board.SCL, board.SDA)
vl53 = VL53L0X(i2c)
last_seen = time.time()
modo_espera = False

def sensor_listener():
    global last_seen, modo_espera
    while True:
        distancia = vl53.range

        if distancia == 8190:
            print("⚠️ Fuera de rango o sin detección")
            time.sleep(1)
            continue

        print(f"📏 Distancia medida: {distancia} mm")
        actual = time.time()

        if distancia < 800:
            if modo_espera or actual - last_seen > 300:
                print("👤 Detección tras inactividad → Redirigir a index.html")
                socketio.emit("redirigir", {"pagina": "index.html"})
                modo_espera = False
            last_seen = actual
        else:
            if actual - last_seen > 300:
                modo_espera = True

        time.sleep(1)

# ============
# 🌐 RUTAS WEB
# ============
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/es.html")
def es():
    return render_template("es.html")

@app.route("/en.html")
def en():
    return render_template("en.html")

@app.route("/quechua.html")
def quechua():
    return render_template("quechua.html")

# Español
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
@app.route("/quechua/castillo")
def castillo_quechua():
    return render_template("quechua/castillo_quechua.html")

@app.route("/quechua/mirador")
def mirador_quechua():
    return render_template("quechua/mirador_quechua.html")

@app.route("/quechua/wayku")
def wayku_quechua():
    return render_template("quechua/wayku_quechua.html")

# Conexión por Socket.IO
@socketio.on("connect")
def cliente_conectado():
    print("🌐 Cliente conectado por Socket.IO")

# ==========================
# ▶️ Ejecutar aplicación
# ==========================
if __name__ == "__main__":
    threading.Thread(target=gpio_listener, daemon=True).start()
    threading.Thread(target=sensor_listener, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)
