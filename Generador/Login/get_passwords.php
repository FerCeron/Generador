<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(["error" => "No autorizado"]);
    exit;
}

$user_id = $_SESSION['user_id'];

$conn = new mysqli("localhost", "root", "", "Generador");
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "SELECT id, service_name, username, encrypted_password FROM password_manager WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$passwords = [];
$cipher_method = 'aes-256-cbc';
$encryption_key = 'tu-clave-secreta';

while ($row = $result->fetch_assoc()) {
    // Descifrar la contraseña para mostrarla en el frontend
    list($encrypted_data, $iv) = explode('::', $row['encrypted_password']);
    $iv = base64_decode($iv);
    $row['decrypted_password'] = openssl_decrypt($encrypted_data, $cipher_method, $encryption_key, 0, $iv);

    $passwords[] = $row;
}

echo json_encode($passwords);

$stmt->close();
$conn->close();
?>
