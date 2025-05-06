document.addEventListener("DOMContentLoaded", () => {
    const gameGrid = document.getElementById("game-grid");
    const sunAmount = document.getElementById("sun-amount");
    let sunPoints = 50; // Soles iniciales
    const plants = [];

    // Configuración del tablero de juego (5 filas x 9 columnas)
    const rows = 5;
    const cols = 9;

    function createGameGrid() {
        for (let r = 0; r < rows; r++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            for (let c = 0; c < cols; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;
                rowDiv.appendChild(cell);
            }
            gameGrid.appendChild(rowDiv);
        }
    }

    function updateSunPoints(amount) {
        sunPoints += amount;
        sunAmount.textContent = sunPoints;
    }

    document.querySelectorAll(".plant").forEach(button => {
        button.addEventListener("click", () => {
            const plantType = button.dataset.type;
            placePlant(plantType);
        });
    });

    function placePlant(type) {
        if (sunPoints >= getPlantCost(type)) {
            document.querySelectorAll(".cell").forEach(cell => {
                cell.addEventListener("click", function () {
                    if (!cell.classList.contains("occupied")) {
                        cell.classList.add("occupied", type);
                        plants.push({ type, row: cell.dataset.row, col: cell.dataset.col });
                        updateSunPoints(-getPlantCost(type));
                    }
                }, { once: true });
            });
        }
    }

    function getPlantCost(type) {
        const costs = {
            sunflower: 50,
            "pea-shooter": 100,
            "wall-nut": 75
        };
        return costs[type] || 0;
    }

    function spawnZombie() {
        const row = Math.floor(Math.random() * rows);
        const zombie = document.createElement("div");
        zombie.classList.add("zombie");
        zombie.style.top = `${row * 100}px`;
        zombie.style.left = "800px"; // Aparece en el borde derecho
        gameGrid.appendChild(zombie);

        moveZombie(zombie, row);
    }

    function moveZombie(zombie, row) {
        let position = 800;
        const interval = setInterval(() => {
            position -= 5; // Movimiento de los zombis hacia la izquierda
            zombie.style.left = `${position}px`;

            if (position <= 0) {
                clearInterval(interval);
                alert("¡Los zombis han invadido la casa!");
            }
        }, 100);
    }

    setInterval(spawnZombie, 5000); // Aparece un nuevo zombi cada 5 segundos

    createGameGrid();
});