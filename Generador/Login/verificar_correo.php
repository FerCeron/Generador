<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigoIngresado = $_POST['codigo'];

    if ($codigoIngresado == $_SESSION['verification_code']) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "Generador";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $email = $_SESSION['email_to_verify'];
        $sql = "UPDATE usuarios SET correo_verificado = 1 WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $email);
        $stmt->execute();

        echo "Correo verificado exitosamente. Puedes iniciar sesión.";
        unset($_SESSION['verification_code'], $_SESSION['email_to_verify']);
    } else {
        echo "Código incorrecto.";
    }
}
?>
