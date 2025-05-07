<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['username'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validación extra para evitar registros corruptos
if (!isset($data['score']) || !is_numeric($data['score'])) {
    echo json_encode(["status" => "error", "message" => "Puntuación inválida"]);
    exit();
}

$score = intval($data['score']);

// ✅ Si el usuario ya tiene una puntuación, actualizar en lugar de insertar un nuevo registro
$insertQuery = $conn->prepare("
    INSERT INTO scores (user_id, username, score) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE score = VALUES(score)
");

$insertQuery->bind_param("isi", $user_id, $username, $score);

if ($insertQuery->execute()) {
    echo json_encode(["status" => "success", "message" => "Puntuación guardada correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al guardar la puntuación"]);
}

$insertQuery->close();
$conn->close();
?>