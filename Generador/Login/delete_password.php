<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(["error" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "ID de contraseña requerido"]);
    exit;
}

$id = $data['id'];
$user_id = $_SESSION['user_id'];

$conn = new mysqli("localhost", "root", "", "Generador");
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "DELETE FROM password_manager WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $user_id);
$success = $stmt->execute();

echo json_encode(["success" => $success]);

$stmt->close();
$conn->close();
?>
