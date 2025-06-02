import time
from adafruit_vl53l0x import VL53L0X
import board
import busio
from flask import Flask, render_template
from flask_socketio import SocketIO
import eventlet

eventlet.monkey_patch()

# Inicializar I2C y sensor
i2c = busio.I2C(board.SCL, board.SDA)
vl53 = VL53L0X(i2c)

app = Flask(__name__)
socketio = SocketIO(app)

last_seen = time.time()

@app.route('/')
def index():
    return render_template("index.html")

def detectar_presencia():
    global last_seen
    in_homepage = True

    while True:
        distancia = vl53.range
        actual = time.time()

        if distancia < 800:
            if actual - last_seen > 300:  # 5 minutos
                print("👤 Nueva detección tras espera")
                socketio.emit("redirigir", {"pagina": "index.html"})
            last_seen = actual
        time.sleep(1)

@socketio.on('connect')
def handle_connect():
    print("💻 Web conectada al socket")

if __name__ == "__main__":
    import threading
    threading.Thread(target=detectar_presencia).start()
    socketio.run(app, host="0.0.0.0", port=5000)
