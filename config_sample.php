<?php
// Configuración de la conexión a la base de datos
define('DB_HOST', '');  // Servidor de la base de datos
define('DB_USER', ''); // Nombre de usuario de MySQL
define('DB_PASS', ''); // Contraseña de MySQL
define('DB_NAME', ''); // Nombre de la base de datos

// Conexión a MySQL con PDO
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Modo de error para detectar problemas
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Establece el modo de recuperación de datos
        PDO::ATTR_EMULATE_PREPARES => false // Mejora la seguridad contra inyecciones SQL
    ]);
} catch (PDOException $e) {
    die("Error en la conexión a la base de datos: " . $e->getMessage());
}

// Configuración general del juego
define('INITIAL_SUN', 50); // Cantidad inicial de soles
define('MAX_LANES', 5);    // Número de filas en el tablero
define('GRID_COLUMNS', 9); // Número de columnas en el tablero

?>