<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);
$sun_amount = intval($data['sun_amount']);
$plants = $data['plants'];
$zombies = $data['zombies'];

// ✅ Insertar una nueva sesión si no existe
$insertQuery = $conn->prepare("
    INSERT INTO game_sessions (user_id, sun_amount, plants, zombies) 
    VALUES (?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE 
    sun_amount = VALUES(sun_amount), plants = VALUES(plants), zombies = VALUES(zombies), last_updated = NOW()
");

$insertQuery->bind_param("iiss", $user_id, $sun_amount, $plants, $zombies);

if ($insertQuery->execute()) {
    echo json_encode(["status" => "success", "message" => "Sesión guardada correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al guardar la sesión"]);
}

$insertQuery->close();
$conn->close();
?>