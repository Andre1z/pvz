<?php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Validación básica
    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Hash seguro de la contraseña
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Verificar si el usuario ya existe en la tabla `users` de la base de datos `pvz`
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
        $stmt->execute([':username' => $username]);

        if ($stmt->fetch()) {
            echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario ya está en uso.']);
            exit();
        }

        // Insertar el nuevo usuario en `users`
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $stmt->execute([':username' => $username, ':password' => $hashedPassword]);

        echo json_encode(['status' => 'success', 'message' => 'Cuenta creada correctamente.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al registrar usuario: ' . $e->getMessage()]);
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de usuario</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <h2>Registro de usuario</h2>
    <form id="register-form" method="POST">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Registrarse</button>
    </form>

    <script src="../js/auth.js"></script>
</body>
</html>