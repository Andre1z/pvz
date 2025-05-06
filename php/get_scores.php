<?php
require_once 'db.php'; // Importamos la conexión a la base de datos

header('Content-Type: application/json');

try {
    // Consulta para obtener las puntuaciones ordenadas de mayor a menor
    $stmt = $pdo->query("SELECT users.username, scores.score, scores.level, scores.played_at 
                         FROM scores 
                         LEFT JOIN users ON scores.user_id = users.id 
                         ORDER BY scores.score DESC 
                         LIMIT 10"); // Limita a las 10 mejores puntuaciones

    $scores = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'data' => $scores
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al obtener las puntuaciones: ' . $e->getMessage()
    ]);
}
?>