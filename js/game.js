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
        cell.addEventListener("click", () => plantSunflower(cell));
        gameGrid.appendChild(cell);
    }
}

// Función para plantar girasoles
function plantSunflower(cell) {
    if (sunAmount >= 50 && !cell.hasChildNodes()) {
        sunAmount -= 50;
        sunDisplay.textContent = sunAmount;

        const sunflower = document.createElement("img");
        sunflower.src = "../assets/sunflower.png"; 
        sunflower.classList.add("plant");
        cell.appendChild(sunflower);

        generateSun(cell);
    }
}

// Generación de soles con el tiempo
function generateSun(cell) {
    setInterval(() => {
        if (cell.hasChildNodes()) {
            sunAmount += 25;
            sunDisplay.textContent = sunAmount;
        }
    }, 5000);
}

// **ZOMBIS ALINEADOS A LA CUADRÍCULA**
function spawnZombie() {
    const row = Math.floor(Math.random() * numRows); // Aparece en una fila aleatoria
    const zombie = document.createElement("img");
    zombie.src = "../assets/zombie.png";
    zombie.classList.add("zombie");

    // Ajustar posición inicial alineada con la cuadrícula
    zombie.style.position = "absolute";
    zombie.style.left = "900px"; // Inicia desde el borde derecho
    zombie.style.top = `${row * 85}px`;

    document.getElementById("game-container").appendChild(zombie);
    moveZombie(zombie, row);
}

// Movimiento alineado de los zombis
function moveZombie(zombie, row) {
    let position = 900;
    const cellSize = 80; // Tamaño de cada celda en px

    const moveInterval = setInterval(() => {
        position -= 2; // Movimiento lento del zombi
        zombie.style.left = `${position}px`;

        // Verificar si el zombi llega al final de la cuadrícula (casa del jugador)
        if (position <= 50) {
            alert("¡Los zombis han llegado a tu casa!");
            clearInterval(moveInterval);
            zombie.remove();
        }
    }, 100);
}

// Generar zombis con el tiempo
setInterval(spawnZombie, 8000);