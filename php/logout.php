<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <script>
        localStorage.removeItem("username"); // Eliminar el usuario de localStorage
        window.location.href = "login.php"; // Redirigir al usuario
    </script>
</body>
</html>
<?php
session_start();
session_destroy(); // Elimina todas las variables de sesión
header("Location: login.php"); // Redirigir al login después de cerrar sesión
exit();
?>