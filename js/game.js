// Configuración del juego
const numRows = 5;  // Número de filas en el jardín
const numCols = 9;  // Número de columnas donde plantar
let sunAmount = 50; // Soles disponibles

const gameGrid = document.getElementById("game-grid");
const sunDisplay = document.getElementById("sun-amount");

// Crear la cuadrícula visualmente en HTML
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", () => plantSunflower(cell)); // Evento para plantar girasoles
        gameGrid.appendChild(cell);
    }
}

// Función para plantar girasoles en las celdas disponibles
function plantSunflower(cell) {
    if (sunAmount >= 50 && !cell.hasChildNodes()) { // Coste: 50 soles
        sunAmount -= 50;
        sunDisplay.textContent = sunAmount;

        const sunflower = document.createElement("img");
        sunflower.src = "../assets/sunflower.png"; 
        sunflower.classList.add("plant");
        cell.appendChild(sunflower);

        generateSun(cell);
    }
}

// Función para generar soles en celdas con girasoles
function generateSun(cell) {
    setInterval(() => {
        if (cell.hasChildNodes()) {
            sunAmount += 25; // Cada girasol genera 25 soles con el tiempo
            sunDisplay.textContent = sunAmount;
        }
    }, 5000); // Cada 5 segundos
}

// **SISTEMA DE ZOMBIS**
function spawnZombie() {
    const row = Math.floor(Math.random() * numRows); // Aparece en una fila aleatoria
    const zombie = document.createElement("img");
    zombie.src = "../assets/zombie.png";
    zombie.classList.add("zombie");
    zombie.style.position = "absolute";
    zombie.style.left = "900px"; // Aparece desde la derecha
    zombie.style.top = `${row * 85}px`;

    document.body.appendChild(zombie);
    moveZombie(zombie);
}

function moveZombie(zombie) {
    let position = 900;

    const moveInterval = setInterval(() => {
        position -= 2; // Movimiento lento del zombi
        zombie.style.left = `${position}px`;

        if (position <= 50) { 
            alert("¡Los zombis han llegado a tu casa!");
            clearInterval(moveInterval);
            zombie.remove();
        }
    }, 100);
}

// Generar zombis con el tiempo
setInterval(spawnZombie, 8000); // Cada 8 segundos