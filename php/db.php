<?php
require_once '../config.php'; // Importamos la configuración

try {
    // Conexión a MySQL usando PDO
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Modo de error para detectar problemas
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Devuelve datos como array asociativo
        PDO::ATTR_EMULATE_PREPARES => false // Mejora la seguridad contra inyecciones SQL
    ]);
} catch (PDOException $e) {
    die("Error en la conexión a la base de datos: " . $e->getMessage());
}
?>