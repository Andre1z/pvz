<?php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    try {
        // Obtener el usuario desde la base de datos
        $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = :username");
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'Credenciales inválidas.']);
            exit;
        }

        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;

        echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso.', 'username' => $username]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en la autenticación: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>