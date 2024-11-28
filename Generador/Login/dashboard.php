<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="user.css">
</head>
<body>
    <h1><?php echo htmlspecialchars($_SESSION['user_name']); ?></h1>
    <a href="logout.php">Cerrar sesión</a>

    <!-- Formulario para agregar nueva contraseña -->
    <div class="add-password-form">
        <h3>Agregar Nueva Contraseña</h3>
        <form id="addPasswordForm" onsubmit="return false;">
            <label for="service">Servicio:</label>
            <input type="text" id="service" placeholder="Ej: Gmail" required>

            <label for="username">Usuario:</label>
            <input type="text" id="username" placeholder="Ej: usuario@gmail.com" required>

            <label for="password">Contraseña:</label>
            <input type="password" id="password" placeholder="Contraseña" required>

            <button type="button" onclick="addPassword()">Agregar Contraseña</button>
        </form>
    </div>

    <!-- Tabla para mostrar contraseñas -->
    <h3>Tus Contraseñas</h3>
    <table id="passwordTable">
        <thead>
            <tr>
                <th>Servicio</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Las contraseñas se agregarán dinámicamente aquí -->
        </tbody>
    </table>

    <script src="gestor.js"></script>
</body>
</html>
