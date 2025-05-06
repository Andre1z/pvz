<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Plants vs Zombies - Web</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>🌱 Plants vs Zombies - Web Edition 🧟‍♂️</h1>
    </header>

    <nav>
        <a href="?page=register">Registrarse</a>
        <a href="?page=login">Iniciar sesión</a>
    </nav>

    <main>
        <?php
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
            if ($page === "register") {
                require_once "php/register.php";
            } elseif ($page === "login") {
                require_once "php/login.php";
            }
        }
        ?>
    </main>

    <script src="js/auth.js"></script>
</body>
</html>