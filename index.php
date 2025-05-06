<?php
session_start();

// Verificamos si el usuario ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    header("Location: php/login.php"); // Redirigir al login si no está autenticado
    exit();
}
?>
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
        <a href="php/logout.php">Cerrar sesión</a>
    </nav>

    <main>
        <p>Bienvenido, <?php echo $_SESSION['username']; ?>. ¡Disfruta del juego!</p>

        <div id="game-container">
            <!-- Aquí irá el juego -->
            <div id="game-grid"></div>
            <p>Soles: <span id="sun-amount">50</span></p>
        </div>
    </main>

    <script src="js/game.js"></script>
</body>
</html>