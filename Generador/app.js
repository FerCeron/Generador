document.addEventListener('DOMContentLoaded', () => {
    // Calcular la fecha máxima permitida (18 años o más)
    const hoy = new Date();
    const añoMaximo = hoy.getFullYear() - 18;
    const mesMaximo = hoy.getMonth() + 1; // Los meses comienzan en 0
    const diaMaximo = hoy.getDate();

    // Formatear la fecha máxima en formato YYYY-MM-DD
    const maxFecha = `${añoMaximo}-${mesMaximo.toString().padStart(2, '0')}-${diaMaximo.toString().padStart(2, '0')}`;

    // Configurar la fecha máxima en el input de fecha de nacimiento
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    fechaNacimientoInput.setAttribute('max', maxFecha);

    // Evento para calcular la edad automáticamente
    fechaNacimientoInput.addEventListener('input', () => {
        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const edad = calcularEdad(fechaNacimiento);

        const edadInput = document.getElementById('edad');
        edadInput.value = edad ? edad : '';

        // Validar si es mayor de 18 años
        if (edad < 18) {
            alert("Debes ser mayor de 18 años.");
            fechaNacimientoInput.value = '';
            edadInput.value = '';
        }
    });
});

// Función para calcular la edad basada en la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento || isNaN(fechaNacimiento)) return null;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    // Ajustar si no ha cumplido años este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    return edad >= 0 ? edad : null;
}

// Función para validar el nombre completo
function validarNombreCompleto(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/; // Al menos un nombre y un apellido
    if (!regex.test(nombre)) {
        return "El nombre completo debe contener al menos un nombre y un apellido, sin números ni caracteres especiales.";
    }
    return null;
}

// Función para validar el email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular simple para el correo electrónico
    if (!regex.test(email)) {
        return "Por favor, ingresa un correo electrónico válido.";
    }
    return null;
}

// Función para validar que todos los campos estén completos
function validarCampos(nombre, fechaNacimiento, genero, longitud, email) {
    if (!nombre || !fechaNacimiento || !genero || !longitud || !email) {
        return "Por favor, completa todos los campos requeridos.";
    }
    if (longitud < 8 || longitud > 20) {
        return "La longitud de la contraseña debe estar entre 8 y 20 caracteres.";
    }
    return null;
}

const generarPassword = () => {
    const longitud = parseInt(document.getElementById('longitud').value.trim());
    const incluirMayusculas = document.getElementById('uppercase').checked;
    const incluirMinusculas = document.getElementById('lowercase').checked;
    const incluirNumeros = document.getElementById('numbers').checked;
    const incluirEspeciales = document.getElementById('special').checked;

    // Validar la longitud de la contraseña
    if (!longitud || longitud < 8 || longitud > 20) {
        alert("La longitud de la contraseña debe estar entre 8 y 20 caracteres.");
        return;
    }

    // Crear el cuerpo de la solicitud
    const data = new FormData();
    data.append('longitud', longitud);
    data.append('incluirMayusculas', incluirMayusculas);
    data.append('incluirMinusculas', incluirMinusculas);
    data.append('incluirNumeros', incluirNumeros);
    data.append('incluirEspeciales', incluirEspeciales);

    // Enviar la solicitud al backend
    fetch('generar_password.php', {
        method: 'POST',
        body: data,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
        })
        .then(result => {
            if (result.error) {
                alert("Error: " + result.error);
            } else {
                // Mostrar la contraseña generada
                document.getElementById('passwordResult').textContent = `Contraseña generada: ${result.password}`;
                
                // Generar el QR con la contraseña
                generarQRCode(result.qr_code);
                document.getElementById('downloadPdfBtn').style.display = 'block';

                alert(result.message); // Mensaje de éxito
            }
        })
        .catch(error => {
            console.error('Error al intentar generar la contraseña:', error);
            alert("Error al intentar generar la contraseña.");
        });
};

// Función para generar el código QR
function generarQRCode(texto) {
    const qrContainer = document.getElementById('qrCode');
    qrContainer.innerHTML = ''; // Limpia cualquier contenido previo
    new QRCode(qrContainer, {
        text: texto,
        width: 256,
        height: 256,
    });
    qrContainer.style.display = 'flex';
}


const generarPasswordYGuardar = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const longitud = parseInt(document.getElementById('longitud').value.trim());
    const email = document.getElementById('email').value.trim();

    const incluirMayusculas = document.getElementById('uppercase').checked;
    const incluirMinusculas = document.getElementById('lowercase').checked;
    const incluirNumeros = document.getElementById('numbers').checked;
    const incluirEspeciales = document.getElementById('special').checked;

    // Validar campos
    if (!nombre || !edad || !fechaNacimiento || !genero || !longitud || !email) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
    }

    const data = new FormData();
    data.append('nombre', nombre);
    data.append('edad', edad);
    data.append('fechaNacimiento', fechaNacimiento);
    data.append('genero', genero);
    data.append('longitud', longitud);
    data.append('email', email);
    data.append('incluirMayusculas', incluirMayusculas);
    data.append('incluirMinusculas', incluirMinusculas);
    data.append('incluirNumeros', incluirNumeros);
    data.append('incluirEspeciales', incluirEspeciales);
    data.append('crearCuenta', 'true');

    fetch('generar_password.php', {
        method: 'POST',
        body: data,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
        })
        .then(result => {
            if (result.error) {
                alert("Error: " + result.error);
            } else {
                // Mostrar la contraseña generada
                document.getElementById('passwordResult').textContent = `Contraseña generada: ${result.password}`;
                
                // Generar el QR con la contraseña
                generarQRCode(result.qr_code);
                document.getElementById('downloadPdfBtn').style.display = 'block';

                alert(result.message); // Mensaje de éxito
            }
        })
        .catch(error => {
            console.error('Error al intentar crear la cuenta:', error);
            alert("Error al intentar crear la cuenta.");
        });
};

// Función para generar el código QR
function generarQRCode(texto) {
    const qrContainer = document.getElementById('qrCode');
    qrContainer.innerHTML = ''; // Limpia cualquier contenido previo
    new QRCode(qrContainer, {
        text: texto,
        width: 256,
        height: 256,
    });
    qrContainer.style.display = 'flex';
}



// Función para copiar la contraseña al portapapeles
function copiarPassword() {
    const passwordText = document.getElementById('passwordResult').textContent.split(": ")[1];
    navigator.clipboard.writeText(passwordText).then(() => {
        const notification = document.getElementById('copyNotification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar la contraseña:', err);
    });
}

// Función para descargar solo el código QR centrado en PDF
function descargarQRComoPDF() {
    const qrCodeElement = document.getElementById('qrCode').querySelector('img'); // Selecciona la imagen del QR
    if (!qrCodeElement) {
        alert("Primero genera el código QR.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener la imagen en base64
    const qrCodeDataUrl = qrCodeElement.src;

    // Dimensiones del PDF y del QR
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const qrSize = 100; // Tamaño del QR en el PDF en mm (ajustable)

    // Coordenadas para centrar el QR
    const x = (pageWidth - qrSize) / 2;
    const y = (pageHeight - qrSize) / 2;

    // Agregar la imagen del QR al PDF centrado
    doc.addImage(qrCodeDataUrl, 'PNG', x, y, qrSize, qrSize);

    // Guardar el archivo PDF
    doc.save("codigo_qr.pdf");
}

function evaluarPassword() {
    const password = document.getElementById('passwordToEvaluate').value.trim();

    if (!password) {
        alert("Por favor, ingresa una contraseña para evaluar.");
        return;
    }

    const resultado = calcularSeguridadPassword(password);

    // Mostrar nivel de seguridad y puntuación
    document.getElementById('securityLevel').textContent = resultado.nivel;
    document.getElementById('passwordScore').textContent = resultado.puntuacion;

    // Mostrar recomendaciones en una lista
    const recommendationsList = document.getElementById('passwordRecommendations');
    recommendationsList.innerHTML = ''; // Limpiar lista anterior
    resultado.recomendaciones.forEach(recomendacion => {
        const listItem = document.createElement('li');
        listItem.textContent = recomendacion;
        recommendationsList.appendChild(listItem);
    });
}

// Función para calcular la puntuación y nivel de seguridad de una contraseña
function calcularSeguridadPassword(password) {
    let puntuacion = 0;
    const recomendaciones = [];

    // Evaluar longitud
    if (password.length >= 8) {
        puntuacion += 20;
    } else {
        recomendaciones.push("La contraseña debe tener al menos 8 caracteres.");
    }

    // Evaluar uso de mayúsculas
    if (/[A-Z]/.test(password)) {
        puntuacion += 20;
    } else {
        recomendaciones.push("Incluye al menos una letra mayúscula.");
    }

    // Evaluar uso de minúsculas
    if (/[a-z]/.test(password)) {
        puntuacion += 20;
    } else {
        recomendaciones.push("Incluye al menos una letra minúscula.");
    }

    // Evaluar uso de números
    if (/\d/.test(password)) {
        puntuacion += 20;
    } else {
        recomendaciones.push("Incluye al menos un número.");
    }

    // Evaluar uso de caracteres especiales
    if (/[^a-zA-Z0-9]/.test(password)) {
        puntuacion += 20;
    } else {
        recomendaciones.push("Incluye al menos un carácter especial (!, @, #, etc.).");
    }

    // Detectar patrones comunes
    const patronesComunes = ["12345", "password", "qwerty", "11111"];
    if (patronesComunes.some(patron => password.toLowerCase().includes(patron))) {
        puntuacion -= 30;
        recomendaciones.push("Evita usar patrones comunes como '12345' o 'password'.");
    }

    // Determinar nivel de seguridad
    let nivel = "Débil";
    if (puntuacion >= 80) nivel = "Fuerte";
    else if (puntuacion >= 50) nivel = "Aceptable";

    return {
        puntuacion: Math.max(0, puntuacion), // Evitar puntuaciones negativas
        nivel,
        recomendaciones
    };
}
