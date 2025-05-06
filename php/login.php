<?php
session_start();
require_once 'db.php';

// Si la solicitud es POST, procesamos el login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Validar que los campos no estén vacíos
    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    try {
        // Buscar el usuario en la base de datos
        $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = :username");
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();

        // Verificar la contraseña hasheada con `password_verify()`
        if (!$user || !password_verify($password, $user['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'Credenciales inválidas.']);
            exit();
        }

        // Iniciar sesión y almacenar datos del usuario
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;

        echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso.', 'username' => $username]);
        exit();
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en la autenticación: ' . $e->getMessage()]);
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <h2>Iniciar sesión</h2>
    <form id="login-form" method="POST">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Entrar</button>
    </form>

    <script src="../js/auth.js"></script>
</body>
</html>