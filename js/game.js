// Configuración del juego
const numRows = 5;
const numCols = 9;
let sunAmount = 50;

const gameGrid = document.getElementById("game-grid");
const sunDisplay = document.getElementById("sun-amount");

// Datos de plantas y zombis
const plantData = {
    sunflower: { cooldown: 3400, cost: 50, health: 150 },
    peashooter: { cooldown: 4600, cost: 100, health: 200 },
    walnut: { cooldown: 7000, cost: 50, health: 400 },
    "Nuez": { cooldown: 7000, cost: 50, health: 400 } // Se agregó "Nuez" para que coincida con index.php
};

const zombieData = { health: 210, damage: 20 };

// Imágenes de los elementos del juego
const images = {
    sunflower: "assets/images/Sunflower.png",
    peashooter: "assets/images/Peashooter.png",
    walnut: "assets/images/Nuez.png",
    pea: "assets/images/Pea.png",
    zombie: "assets/images/Zombie.png",
    Nuez: "assets/images/Nuez.png" // Agregar la versión con mayúscula
};

// Crear cuadrícula del juego
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

// Función para plantar una planta
function plantPlant(cell, type) {
    if (!type || !plantData.hasOwnProperty(type)) { 
        console.error(`Error: La planta "${type}" no está definida en plantData.`);
        return;
    }

    if (sunAmount >= plantData[type].cost && !cell.hasChildNodes()) {
        sunAmount -= plantData[type].cost;
        sunDisplay.textContent = sunAmount;

        if (!images[type]) {
            console.error(`Error: No se encontró la imagen para "${type}".`);
            return;
        }

        const plant = document.createElement("img");
        plant.src = images[type]; // Ahora verificamos que la imagen realmente existe
        plant.classList.add("plant");
        cell.appendChild(plant);

        cell.setAttribute("data-health", plantData[type].health);

        if (type === "sunflower") generateSunFromSunflower(cell);
        if (type === "peashooter") startShooting(cell);

        cell.classList.add("cooldown");
        setTimeout(() => cell.classList.remove("cooldown"), plantData[type].cooldown);
    }
}

function generateSun() {
    const gridCells = Array.from(document.querySelectorAll(".grid-cell")); // Asegurar que sea un array
    if (gridCells.length === 0) return; // Evitar errores si no hay celdas disponibles
    
    const randomCell = gridCells[Math.floor(Math.random() * gridCells.length)]; // Seleccionar celda válida

    // Crear el sol como un elemento de texto con emoji
    const sun = document.createElement("span");
    sun.textContent = "☀️";
    sun.classList.add("sun");
    sun.setAttribute("data-value", "25");

    randomCell.appendChild(sun); // Ahora funciona correctamente

    // Evento para recoger el sol
    sun.addEventListener("click", function () {
        sunAmount += parseInt(sun.getAttribute("data-value"));
        sunDisplay.textContent = sunAmount;
        sun.remove();
    });

    // Eliminar el sol si no es recogido después de 5 segundos
    setTimeout(() => {
        if (sun.parentElement) sun.remove();
    }, 5000);
}

setInterval(generateSun, 6000); // Generar un sol cada 6 segundos

// Función para que el Girasol genere soles cada 5 segundos
function generateSunFromSunflower(sunflower) {
    setInterval(() => {
        if (parseInt(sunflower.getAttribute("data-health")) > 0) {
            const sun = document.createElement("span");
            sun.textContent = "☀️";
            sun.classList.add("sun");
            sun.setAttribute("data-value", "50");
            sunflower.appendChild(sun);

            sun.addEventListener("click", function () {
                sunAmount += 50;
                sunDisplay.textContent = sunAmount;
                sun.remove();
            });

            setTimeout(() => {
                if (sun.parentElement) sun.remove();
            }, 5000);
        }
    }, 5000);
}

// Función corregida para que el Lanzaguisantes dispare guisantes cada 2 segundos
function startShooting(cell) {
    setInterval(() => {
        if (parseInt(cell.getAttribute("data-health")) > 0) {
            const pea = document.createElement("span");
            pea.textContent = "🟢";
            pea.classList.add("pea");
            pea.style.position = "absolute";
            pea.style.left = cell.offsetLeft + "px";
            pea.style.top = cell.offsetTop + "px";
            document.body.appendChild(pea);
            movePea(pea);
        }
    }, 2000);
}

// Movimiento de guisantes y daño a los zombis
function movePea(pea) {
    let position = parseInt(pea.style.left);
    const moveInterval = setInterval(() => {
        position += 10;
        pea.style.left = position + "px";

        document.querySelectorAll(".zombie").forEach(zombie => {
            if (position >= zombie.offsetLeft) {
                let zombieHealth = parseInt(zombie.getAttribute("data-health")) - 30;
                zombie.setAttribute("data-health", zombieHealth);

                if (zombieHealth <= 0) zombie.remove();
                clearInterval(moveInterval);
                pea.remove();
            }
        });

        if (position >= 900) {
            clearInterval(moveInterval);
            pea.remove();
        }
    }, 100);
}

// Función para generar zombis cada 12 segundos
function spawnZombie() {
    const row = Math.floor(Math.random() * numRows);
    const zombie = document.createElement("img");
    zombie.src = images.zombie;
    zombie.classList.add("zombie");
    zombie.setAttribute("data-health", 210);

    const initialCell = gridCells[row][numCols - 1];
    initialCell.appendChild(zombie);
    moveZombie(zombie, row, numCols - 1);
}

// Movimiento de zombis y daño a las plantas
function moveZombie(zombie, row, col) {
    const moveInterval = setInterval(() => {
        if (col > 0) {
            const nextCell = gridCells[row][col - 1];

            if (!nextCell.hasChildNodes()) {
                col--;
                nextCell.appendChild(zombie);
            } else {
                let plant = nextCell.querySelector(".plant");

                if (plant) {
                    let plantHealth = parseInt(plant.getAttribute("data-health")) - zombieData.damage;
                    plant.setAttribute("data-health", plantHealth);

                    if (plantHealth <= 0) {
                        plant.remove();
                        col--;
                        nextCell.appendChild(zombie);
                    }
                }
            }
        } else {
            alert("¡Los zombis han llegado a tu casa!");
            clearInterval(moveInterval);
            zombie.remove();
        }
    }, 6000);

    // ✅ Detectar cuando el zombi muere y guardar la puntuación
    const checkZombieHealth = setInterval(() => {
        let zombieHealth = parseInt(zombie.getAttribute("data-health"));

        if (zombieHealth <= 0) {
            sunAmount += 40; // Sumar puntos
            sunDisplay.textContent = sunAmount;

            // Enviar puntuación al servidor
            fetch("php/save_score.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score: sunAmount })
            })
            .then(response => response.json())
            .then(data => console.log("Puntuación guardada:", data))
            .catch(error => console.error("Error al guardar puntuación:", error));

            clearInterval(moveInterval);
            clearInterval(checkZombieHealth);
            zombie.remove();
        }
    }, 500);
}

// Detectar colocación de plantas en la cuadrícula
document.querySelectorAll(".grid-cell").forEach(cell => {
    cell.addEventListener("click", function() {
        if (selectedPlant) {
            plantPlant(this, selectedPlant);
            selectedPlant = null;
        }
    });
});