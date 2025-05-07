<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$user_id = $_SESSION['user_id'];
$result = $conn->query("SELECT sun_amount, plants, zombies FROM game_sessions WHERE user_id = $user_id");

if ($row = $result->fetch_assoc()) {
    echo json_encode(["status" => "success", "session" => $row]);
} else {
    echo json_encode(["status" => "error", "message" => "No se encontró ninguna sesión guardada"]);
}

$conn->close();
?>