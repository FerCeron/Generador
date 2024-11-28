<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(["error" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['service'], $data['username'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$service = $data['service'];
$username = $data['username'];
$password = $data['password'];

// Hashear la contraseña
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Cifrar la contraseña para mostrarla en el frontend
$cipher_method = 'aes-256-cbc';
$encryption_key = 'tu-clave-secreta';
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cipher_method));
$encrypted_password = openssl_encrypt($password, $cipher_method, $encryption_key, 0, $iv);
$encrypted_password .= '::' . base64_encode($iv);

$conn = new mysqli("localhost", "root", "", "Generador");
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "INSERT INTO password_manager (user_id, service_name, username, password, encrypted_password) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $user_id, $service, $username, $hashed_password, $encrypted_password);
$success = $stmt->execute();

echo json_encode(["success" => $success]);

$stmt->close();
$conn->close();
?>
