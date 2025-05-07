<?php
require_once 'config.php';

header("Content-Type: application/json");

try {
    $result = $conn->query("SELECT username, MAX(score) AS score FROM scores GROUP BY username ORDER BY score DESC");

    $scores = [];
    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }

    // ✅ Si no hay puntuaciones, devolver un JSON vacío
    if (empty($scores)) {
        echo json_encode(["status" => "success", "scores" => []]); // JSON sin errores
    } else {
        echo json_encode(["status" => "success", "scores" => $scores]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error en consulta SQL: " . $e->getMessage()]);
}

$conn->close();
?>