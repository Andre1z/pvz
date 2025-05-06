<?php
require_once 'db.php'; // Importamos la conexión a la base de datos

header('Content-Type: application/json');

// Verificamos si se han enviado datos por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;
    $score = isset($_POST['score']) ? intval($_POST['score']) : 0;
    $level = isset($_POST['level']) ? intval($_POST['level']) : 1;

    try {
        // Insertar la nueva puntuación en la base de datos
        $stmt = $pdo->prepare("INSERT INTO scores (user_id, score, level) VALUES (:user_id, :score, :level)");
        $stmt->execute([
            ':user_id' => $user_id,
            ':score' => $score,
            ':level' => $level
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Puntuación guardada correctamente.'
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error al guardar la puntuación: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido.'
    ]);
}
?>