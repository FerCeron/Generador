<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Generador";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        if ($usuario['correo_verificado'] == 0) {
            $verificationCode = rand(100000, 999999);
            $_SESSION['verification_code'] = $verificationCode;
            $_SESSION['email_to_verify'] = $usuario['email'];

            mail($usuario['email'], "Código de Verificación", "Tu código de verificación es: $verificationCode");

            echo json_encode(['status' => 'verify_email']);
            exit;
        }

        if (password_verify($contrasena, $usuario['password'])) {
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_name'] = $usuario['nombre'];
            $_SESSION['user_email'] = $usuario['email'];

            echo json_encode(['status' => 'success']);
            exit;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta.']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado.']);
        exit;
    }
}

$conn->close();
?>
