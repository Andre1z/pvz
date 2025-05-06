<?php
// Configuración de la base de datos
define('DB_HOST', ''); // Servidor de la base de datos
define('DB_NAME', '');  // Nombre de la base de datos
define('DB_USER', '');      // Usuario de la base de datos (XAMPP usa "root" por defecto)
define('DB_PASS', '');          // Contraseña (vacía en XAMPP)

// Opciones de seguridad para sesiones
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
session_start();
?>