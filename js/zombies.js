// Configuración de los zombis
const zombieSpawnInterval = 12000; // Tiempo entre cada generación de zombis

// Función para generar zombis
function spawnZombie() {
    const row = Math.floor(Math.random() * numRows); // Seleccionar fila aleatoria
    const zombie = document.createElement("img");
    zombie.src = images.zombie;
    zombie.classList.add("zombie");
    zombie.setAttribute("data-health", zombieData.health);
    zombie.dataset.row = row; // Guardar la fila del zombi

    const initialCell = gridCells[row][numCols - 1]; // Última columna en la fila seleccionada
    initialCell.appendChild(zombie);
    moveZombie(zombie, row, numCols - 1);
}

// Función para mover zombis y atacar plantas
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
}

// Iniciar generación de zombis en el juego
setInterval(spawnZombie, zombieSpawnInterval);