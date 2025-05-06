<?php
require_once 'config.php';

try {
    // Crear una conexión PDO segura
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Modo de errores con excepciones
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Modo de obtención de datos por defecto
        PDO::ATTR_EMULATE_PREPARES => false  // Evita emulación de consultas preparadas
    ]);
} catch (PDOException $e) {
    // Manejo de errores en la conexión
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
?>