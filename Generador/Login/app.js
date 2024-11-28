document.getElementById('scanQRButton').addEventListener('click', () => {
    const readerDiv = document.getElementById("reader");
    readerDiv.style.display = 'block';

    // Crear una instancia del lector QR
    const qrReader = new Html5Qrcode("reader");

    let lastErrorTime = 0; // Variable para controlar la frecuencia de los mensajes de error

    qrReader.start(
        { facingMode: "environment" }, // Usa la cámara trasera si está disponible
        { fps: 10, qrbox: 250 },        // Configuración de fps y tamaño del cuadro QR
        (decodedText) => {
            // Al detectar el QR, coloca el texto decodificado en el campo de contraseña
            document.getElementById('contrasenaInput').value = decodedText;
            
            // Detener el escaneo y ocultar el lector
            qrReader.stop();
            readerDiv.style.display = 'none';
        },
        (errorMessage) => {
            // Mostrar el mensaje de error una vez cada 10 segundos
            const now = Date.now();
            if (now - lastErrorTime > 10000) { // 10000 ms = 10 segundos
                console.warn("Error en el escaneo o en la cámara:", errorMessage);
                lastErrorTime = now;
            }
        }
    ).catch(err => {
        // Manejo de errores si no se puede iniciar el lector
        console.error("No se pudo iniciar el lector de QR:", err);
        alert("No se pudo iniciar la cámara. Asegúrate de tener permisos.");
    });
});
