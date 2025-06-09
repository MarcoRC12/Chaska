const socket = io();
let reinicioTimeout;

// Función para redirigir al inicio después de inactividad
function iniciarReinicio() {
  if (reinicioTimeout) clearTimeout(reinicioTimeout);
  reinicioTimeout = setTimeout(() => {
    console.log("⏳ Inactividad detectada → Redirigiendo a inicio");
    window.location.href = "/";
  }, 1 * 60 * 1000); // 2 minutos en milisegundos
}

// Escucha evento del sensor o movimiento
socket.on("connect", () => {
  console.log("✅ Socket conectado (reinicio.js)");
  iniciarReinicio(); // iniciar el temporizador al conectarse
});

socket.on("redirigir", (data) => {
  iniciarReinicio(); // reinicia el contador al detectar sensor
  if (data.pagina) {
    console.log("🔁 Redirección desde sensor:", data.pagina);
    window.location.href = data.pagina;
  }
});

socket.on("presionar_boton", () => {
  iniciarReinicio(); // reiniciar también si se presiona un botón físico
});
