// Configuración del juego
const numRows = 5;  // Filas en el jardín
const numCols = 9;  // Columnas donde plantar
let sunAmount = 50; // Soles iniciales

const gameGrid = document.getElementById("game-grid");
const sunDisplay = document.getElementById("sun-amount");

// Cooldowns de cada planta
const cooldowns = {
    sunflower: 3400,   // 3.4 segundos
    peashooter: 4600,  // 4.6 segundos
    walnut: 7000       // 7 segundos
};

// Costes de cada planta
const costs = {
    sunflower: 50,
    peashooter: 100,
    walnut: 50
};

// Imágenes de las plantas
const images = {
    sunflower: "assets/images/Sunflower.png",
    peashooter: "assets/images/Peashooter.png",
    walnut: "assets/images/Nuez.png"
};

// Crear la cuadrícula de juego
const gridCells = [];

for (let row = 0; row < numRows; row++) {
    gridCells[row] = [];
    for (let col = 0; col < numCols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        gridCells[row][col] = cell;
        gameGrid.appendChild(cell);
    }
}

// Función para plantar una planta con cooldown y coste
function plantPlant(cell, type) {
    if (sunAmount >= costs[type] && !cell.hasChildNodes()) {
        sunAmount -= costs[type];
        sunDisplay.textContent = sunAmount;

        const plant = document.createElement("img");
        plant.src = images[type]; 
        plant.classList.add("plant");
        cell.appendChild(plant);

        if (type === "sunflower") {
            generateSun(cell);
        } else if (type === "peashooter") {
            startShooting(cell);
        }

        // Cooldown para evitar plantación rápida
        cell.classList.add("cooldown");
        setTimeout(() => {
            cell.classList.remove("cooldown");
        }, cooldowns[type]);
    }
}

// Generación de soles por girasoles
function generateSun(cell) {
    setInterval(() => {
        if (cell.hasChildNodes()) {
            sunAmount += 25;
            sunDisplay.textContent = sunAmount;
        }
    }, 5000);
}

// Disparos del Peashooter contra zombis
function startShooting(cell) {
    setInterval(() => {
        const pea = document.createElement("img");
        pea.src = "assets/images/Peashooter.png";
        pea.classList.add("pea");
        pea.style.position = "absolute";
        pea.style.left = cell.offsetLeft + "px";
        pea.style.top = cell.offsetTop + "px";

        document.body.appendChild(pea);
        movePea(pea);
    }, 2000);
}

// Movimiento del guisante
function movePea(pea) {
    let position = parseInt(pea.style.left);

    const moveInterval = setInterval(() => {
        position += 10;
        pea.style.left = position + "px";

        if (position >= 900) {
            clearInterval(moveInterval);
            pea.remove();
        }
    }, 100);
}

// **ZOMBIS ALINEADOS A LA CUADRÍCULA Y CON VELOCIDAD REDUCIDA**
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

// Movimiento de zombis con velocidad ajustada (60 segundos)
function moveZombie(zombie, row, col) {
    const moveInterval = setInterval(() => {
        if (col > 0) {
            col--; 
            const nextCell = gridCells[row][col];
            nextCell.appendChild(zombie);
        } else {
            alert("¡Los zombis han llegado a tu casa!");
            clearInterval(moveInterval);
            zombie.remove();
        }
    }, 6000); // 60 segundos en total (6000ms por celda)
}

// Generar zombis con el tiempo
setInterval(spawnZombie, 8000);