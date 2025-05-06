class Plant {
    constructor(type, row, col) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.health = this.getHealth();
        this.attackPower = this.getAttackPower();
        this.element = this.createElement();
        this.init();
    }

    // Define la vida de cada planta
    getHealth() {
        const healthStats = {
            sunflower: 100,
            "pea-shooter": 150,
            "wall-nut": 300
        };
        return healthStats[this.type] || 100;
    }

    // Define el poder de ataque de cada planta
    getAttackPower() {
        const attackStats = {
            sunflower: 0, // No ataca, solo genera soles
            "pea-shooter": 25,
            "wall-nut": 0 // Solo bloquea
        };
        return attackStats[this.type] || 0;
    }

    // Crea el elemento visual de la planta
    createElement() {
        const plant = document.createElement("div");
        plant.classList.add("plant", this.type);
        plant.style.position = "absolute";
        plant.style.top = `${this.row * 100}px`;
        plant.style.left = `${this.col * 100}px`;
        return plant;
    }

    // Inicializa la planta en el tablero
    init() {
        document.getElementById("game-grid").appendChild(this.element);
        if (this.type === "sunflower") {
            this.generateSun();
        } else if (this.type === "pea-shooter") {
            this.startShooting();
        }
    }

    // Genera soles cada cierto tiempo
    generateSun() {
        setInterval(() => {
            console.log("☀️ Sol generado");
            updateSunPoints(25);
        }, 5000);
    }

    // Dispara guisantes contra los zombis
    startShooting() {
        setInterval(() => {
            const pea = document.createElement("div");
            pea.classList.add("pea");
            pea.style.position = "absolute";
            pea.style.top = `${this.row * 100 + 20}px`;
            pea.style.left = `${this.col * 100 + 50}px`;
            document.getElementById("game-grid").appendChild(pea);

            let position = this.col * 100 + 50;
            const interval = setInterval(() => {
                position += 10;
                pea.style.left = `${position}px`;

                if (position > 900) {
                    clearInterval(interval);
                    pea.remove();
                }
            }, 50);
        }, 2000);
    }
}

// Función para colocar plantas en el tablero
function placePlant(type, row, col) {
    if (sunPoints >= getPlantCost(type)) {
        new Plant(type, row, col);
        updateSunPoints(-getPlantCost(type));
    }
}

console.log("Plants.js cargado correctamente.");