<?php
require_once 'php/config.php';

// Verificamos si la sesión ya está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verificamos si el usuario ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    header("Location: php/login.php");
    exit();
}

// Definir el nombre de usuario si está disponible en la sesión
$username = isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : "Invitado";
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Plants vs Zombies - Web Edition</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>🌱 Plants vs Zombies - Web Edition 🧟‍♂️</h1>
    </header>

    <main>
        <p>Bienvenido, <span id="username-display">Invitado</span>. ¡Disfruta del juego!</p>

        <div id="game-container">
            <div id="game-grid"></div>
            <p>Soles: <span id="sun-amount">50</span></p>
        </div>

        <h2>🏆 Tabla de puntuaciones</h2>
        <table id="score-table">
            <thead>
                <tr>
                    <th>Jugador</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody>
                <!-- Las puntuaciones se cargarán aquí con AJAX -->
            </tbody>
        </table>
    </main>

    <script src="js/game.js"></script>
    <script>
        // Cargar puntuaciones con AJAX
        fetch("php/get_scores.php")
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const tbody = document.querySelector("#score-table tbody");
                tbody.innerHTML = "";

                data.scores.forEach(score => {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${score.username}</td><td>${score.score}</td>`;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => console.error("Error al obtener puntuaciones:", error));
        document.addEventListener("DOMContentLoaded", function() {
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                document.getElementById("username-display").textContent = storedUsername;
            }
        });
    </script>
    <footer>
        <p>© <?php echo date("Y"); ?> Andrei | PvZ Web Edition</p>
        <p><a href="php/logout.php">Cerrar sesión</a></p>
    </footer>
</body>
</html>