// Configuración de la ruleta
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const opciones = ["TOMA TODO", "TAZA CON  CUCHARA", "DESCUENTO BALON 10 SOLES", "DESCUENTO BALON 20 SOLES", "RECARGA GRATIS", "Premio 6", "Premio 7", "Premio 8", "Premio 9", "Premio 10"];
let anguloActual = 0;

function dibujarRuleta() {
    const anguloPorOpcion = (2 * Math.PI) / opciones.length;
    opciones.forEach((opcion, i) => {
        const anguloInicio = anguloActual + i * anguloPorOpcion;
        const anguloFin = anguloInicio + anguloPorOpcion;
        ctx.beginPath();
        ctx.arc(150, 150, 150, anguloInicio, anguloFin);
        ctx.lineTo(150, 150);
        ctx.fillStyle = i % 2 === 0 ? "lightblue" : "lightgreen";
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(anguloInicio + anguloPorOpcion / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(opcion, 100, 0);
        ctx.restore();
    });
}
dibujarRuleta();

// Girar la ruleta
document.getElementById("start-ruleta").addEventListener("click", () => {
    let angulo = 0;
    const tiempoGiro = 3000;
    const start = Date.now();
    const interval = setInterval(() => {
        angulo += 0.2;
        anguloActual += angulo;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(anguloActual);
        ctx.translate(-150, -150);
        dibujarRuleta();
        ctx.restore();
        if (Date.now() - start > tiempoGiro) {
            clearInterval(interval);
            const premioIndex = Math.floor(((anguloActual % (2 * Math.PI)) / (2 * Math.PI)) * opciones.length);
            alert(`¡Ganaste: ${opciones[premioIndex]}!`);
        }
    }, 16);
});

// Configuración del lector QR
const qrReader = new Html5Qrcode("qr-reader");
qrReader.start({ facingMode: "environment" }, {}, qrCodeMessage => {
    qrReader.stop(); // Detener el lector QR después de reconocer un código
    document.getElementById("start-ruleta").style.display = "block"; // Mostrar botón
    document.getElementById("ruleta").style.display = "block"; // Mostrar la ruleta
});