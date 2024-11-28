<?php
header("Content-Type: application/json");

// Mostrar errores para depuración (solo en desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Generador";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Función para generar una contraseña segura
function generarPassword($longitud, $incluirMayusculas, $incluirMinusculas, $incluirNumeros, $incluirEspeciales) {
    $caracteres = '';
    if ($incluirMayusculas) $caracteres .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if ($incluirMinusculas) $caracteres .= 'abcdefghijklmnopqrstuvwxyz';
    if ($incluirNumeros) $caracteres .= '0123456789';
    if ($incluirEspeciales) $caracteres .= '!@#$%^&*()';

    if (empty($caracteres)) {
        return null; // No se seleccionaron opciones
    }

    $password = '';
    for ($i = 0; $i < $longitud; $i++) {
        $password .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }

    return $password;
}

// Procesar los datos enviados desde el cliente
if (isset($_POST['crearCuenta']) && $_POST['crearCuenta'] === 'true') {
    // Lógica para crear cuenta
    $nombre = $_POST['nombre'] ?? '';
    $edad = (int)($_POST['edad'] ?? 0);
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $genero = $_POST['genero'] ?? '';
    $longitud = (int)($_POST['longitud'] ?? 12); // Longitud predeterminada
    $email = $_POST['email'] ?? '';
    $incluirMayusculas = isset($_POST['incluirMayusculas']) && $_POST['incluirMayusculas'] === 'true';
    $incluirMinusculas = isset($_POST['incluirMinusculas']) && $_POST['incluirMinusculas'] === 'true';
    $incluirNumeros = isset($_POST['incluirNumeros']) && $_POST['incluirNumeros'] === 'true';
    $incluirEspeciales = isset($_POST['incluirEspeciales']) && $_POST['incluirEspeciales'] === 'true';

    if (empty($nombre) || $edad <= 0 || empty($fechaNacimiento) || empty($genero) || empty($email)) {
        echo json_encode(["error" => "Todos los campos son obligatorios."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "El formato del correo electrónico no es válido."]);
        exit;
    }

    // Verificar si el correo ya está registrado
    $sqlCheckEmail = "SELECT id FROM usuarios WHERE email = ?";
    $stmtCheckEmail = $conn->prepare($sqlCheckEmail);
    if (!$stmtCheckEmail) {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
        exit;
    }
    $stmtCheckEmail->bind_param('s', $email);
    $stmtCheckEmail->execute();
    $resultCheckEmail = $stmtCheckEmail->get_result();

    if ($resultCheckEmail->num_rows > 0) {
        echo json_encode(["error" => "El correo electrónico ya está registrado."]);
        $stmtCheckEmail->close();
        exit;
    }
    $stmtCheckEmail->close();

    $passwordGenerada = generarPassword($longitud, $incluirMayusculas, $incluirMinusculas, $incluirNumeros, $incluirEspeciales);
    if (!$passwordGenerada) {
        echo json_encode(["error" => "No se puede generar una contraseña sin opciones válidas."]);
        exit;
    }

    $hashedPassword = password_hash($passwordGenerada, PASSWORD_BCRYPT);
    $qrCode = $passwordGenerada; // Puedes generar un código QR real si lo necesitas

    $sql = "INSERT INTO usuarios (nombre, edad, fecha_nacimiento, genero, longitud, password, qr_code, email) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
        exit;
    }
    $stmt->bind_param(
        'sississs',
        $nombre,
        $edad,
        $fechaNacimiento,
        $genero,
        $longitud,
        $hashedPassword,
        $qrCode,
        $email
    );

    if ($stmt->execute()) {
        // Devuelve la contraseña generada y el código QR
        echo json_encode([
            "message" => "Cuenta creada exitosamente.",
            "password" => $passwordGenerada,
            "qr_code" => $qrCode
        ]);
    } else {
        echo json_encode(["error" => "Error al ejecutar la consulta: " . $stmt->error]);
    }

    $stmt->close();
} elseif (isset($_POST['longitud'])) {
    // Lógica para solo generar una contraseña
    $longitud = (int)$_POST['longitud'];
    $incluirMayusculas = isset($_POST['incluirMayusculas']) && $_POST['incluirMayusculas'] === 'true';
    $incluirMinusculas = isset($_POST['incluirMinusculas']) && $_POST['incluirMinusculas'] === 'true';
    $incluirNumeros = isset($_POST['incluirNumeros']) && $_POST['incluirNumeros'] === 'true';
    $incluirEspeciales = isset($_POST['incluirEspeciales']) && $_POST['incluirEspeciales'] === 'true';

    $passwordGenerada = generarPassword($longitud, $incluirMayusculas, $incluirMinusculas, $incluirNumeros, $incluirEspeciales);
    if (!$passwordGenerada) {
        echo json_encode(["error" => "No se puede generar una contraseña sin opciones válidas."]);
        exit;
    }

    echo json_encode([
        "password" => $passwordGenerada,
        "qr_code" => $passwordGenerada,
        "message" => "Contraseña generada exitosamente."
    ]);
} else {
    echo json_encode(["error" => "Solicitud inválida."]);
}

$conn->close();
