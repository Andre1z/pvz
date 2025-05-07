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
        <p>Bienvenido, <?= $username ?>. ¡Disfruta del juego!</p>

        <!-- Barra de selección de plantas -->
        <div id="plant-selection">
            <button class="plant-btn" data-plant="sunflower" data-cost="50">
                <img src="assets/images/Sunflower.png" alt="Girasol"> 50 🟡
            </button>
            <button class="plant-btn" data-plant="peashooter" data-cost="100">
                <img src="assets/images/Peashooter.png" alt="Lanzaguisantes"> 100 🟡
            </button>
            <button class="plant-btn" data-plant="Nuez" data-cost="50">
                <img src="assets/images/Nuez.png" alt="Nuez"> 50 🟡
            </button>
        </div>

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

    <footer>
        <p>© <?php echo date("Y"); ?> Andrei | PvZ Web Edition</p>
        <p><a href="php/logout.php">Cerrar sesión</a></p>
    </footer>

    <script src="js/game.js"></script>
    <script>
        // Cargar puntuaciones con AJAX
        document.addEventListener("DOMContentLoaded", function() {
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
        });

        // Mostrar nombre de usuario desde Local Storage
        document.addEventListener("DOMContentLoaded", function() {
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                document.querySelector("p").textContent = `Bienvenido, ${storedUsername}. ¡Disfruta del juego!`;
            }
        });

        // Lógica de selección de plantas
        document.querySelectorAll(".plant-btn").forEach(button => {
            button.addEventListener("click", function() {
                let selectedPlant = this.getAttribute("data-plant");
                let cost = parseInt(this.getAttribute("data-cost"));
                let currentSuns = parseInt(document.getElementById("sun-amount").textContent);

                if (currentSuns >= cost) {
                    document.getElementById("sun-amount").textContent = currentSuns - cost;
                    console.log(`Plantada: ${selectedPlant}`);
                    // Aquí puedes agregar la lógica para colocar la planta en el tablero
                } else {
                    alert("No tienes suficientes soles!");
                }
            });
        });
        let selectedPlant = null; // Variable para almacenar la planta seleccionada

        // Detecta cuando el jugador selecciona una planta
        document.querySelectorAll(".plant-btn").forEach(button => {
            button.addEventListener("click", function() {
                selectedPlant = this.getAttribute("data-plant"); // Guarda la planta seleccionada
            });
        });

        // Detecta cuando el jugador hace clic en una celda de la cuadrícula
        document.querySelectorAll(".grid-cell").forEach(cell => {
            cell.addEventListener("click", function(event) {
                // Si el clic es en un sol, no mostrar la advertencia
                if (event.target.classList.contains("sun")) {
                    return;
                }

                if (selectedPlant) {
                    this.innerHTML = `<img src="assets/images/${selectedPlant}.png" alt="${selectedPlant}" class="plant">`; // Muestra la planta en la celda
                    selectedPlant = null; // Reiniciar selección después de colocar la planta
                }
            });
        });
    </script>
</body>
</html>