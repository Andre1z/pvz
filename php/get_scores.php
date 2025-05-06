<?php
require_once 'db.php';

header('Content-Type: application/json');

try {
    // Obtener las puntuaciones desde la base de datos
    $stmt = $pdo->prepare("SELECT username, score FROM scores ORDER BY score DESC LIMIT 10");
    $stmt->execute();
    $scores = $stmt->fetchAll();

    echo json_encode(['status' => 'success', 'scores' => $scores]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al obtener puntuaciones: ' . $e->getMessage()]);
}
?>