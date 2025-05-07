// Configuración del juego
const numRows = 5;  // Número de filas en el jardín
const numCols = 9;  // Número de columnas donde plantar
let sunAmount = 50; // Soles disponibles

const gameGrid = document.getElementById("game-grid");
const sunDisplay = document.getElementById("sun-amount");

// Crear la cuadrícula visualmente en HTML
const gridCells = [];

for (let row = 0; row < numRows; row++) {
    gridCells[row] = [];
    for (let col = 0; col < numCols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        gridCells[row][col] = cell;
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
        sunflower.src = "assets/images/Sunflower.png"; 
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

// **ZOMBIS CORREGIDOS PARA SEGUIR LA CUADRÍCULA**
function spawnZombie() {
    const row = Math.floor(Math.random() * numRows); // Aparece en una fila aleatoria
    const zombie = document.createElement("img");
    zombie.src = "assets/images/Zombie.png";
    zombie.classList.add("zombie");

    // Ajustar posición inicial alineada con la cuadrícula
    const initialCell = gridCells[row][numCols - 1]; // Última columna en la fila seleccionada
    initialCell.appendChild(zombie);

    moveZombie(zombie, row, numCols - 1);
}

// Movimiento alineado de los zombis
function moveZombie(zombie, row, col) {
    const moveInterval = setInterval(() => {
        if (col > 0) {
            col--; // Movimiento hacia la izquierda
            const nextCell = gridCells[row][col];
            nextCell.appendChild(zombie);
        } else {
            // Cuando llega a la primera columna, el juego termina
            alert("¡Los zombis han llegado a tu casa!");
            clearInterval(moveInterval);
            zombie.remove();
        }
    }, 1000);
}

// Generar zombis con el tiempo
setInterval(spawnZombie, 8000);