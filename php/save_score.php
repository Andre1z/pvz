<?php
require_once 'db.php';
session_start();

header('Content-Type: application/json');

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Debe iniciar sesión para guardar su puntuación.']);
    exit();
}

// Obtener los datos enviados
$data = json_decode(file_get_contents("php://input"), true);
$score = isset($data['score']) ? intval($data['score']) : null;

if ($score === null || $score < 0) {
    echo json_encode(['status' => 'error', 'message' => 'Puntuación inválida.']);
    exit();
}

try {
    // Guardar la puntuación en la base de datos
    $stmt = $pdo->prepare("INSERT INTO scores (user_id, username, score) VALUES (:user_id, :username, :score)");
    $stmt->execute([
        ':user_id' => $_SESSION['user_id'],
        ':username' => $_SESSION['username'],
        ':score' => $score
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada correctamente.']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar la puntuación: ' . $e->getMessage()]);
}
?>