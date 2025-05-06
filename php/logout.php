<?php
session_start();
session_destroy(); // Elimina todas las variables de sesión
header("Location: login.php"); // Redirigir al login después de cerrar sesión
exit();
?>