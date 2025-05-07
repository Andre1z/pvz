# 🌱 Plants vs Zombies - Web Edition 🧟‍♂️  

## 📌 Descripción  
Plants vs Zombies - Web Edition es una versión web del clásico juego, donde los jugadores deben defender su jardín plantando diversas plantas para evitar la invasión de zombis.  

Este proyecto utiliza **HTML, CSS, JavaScript y PHP**, con almacenamiento de datos en **MySQL** para guardar sesiones y puntuaciones.  

---

## 📂 Estructura del Proyecto  
```plaintext
├── assets/              # Contiene imágenes, íconos y sonidos del juego
├── css/                 # Archivos de estilos para la interfaz del juego
├── js/                  # Contiene la lógica del juego (game.js, zombies.js)
├── php/                 # Scripts para gestión de sesiones y puntuaciones
│   ├── config.php       # Configuración de conexión a MySQL
│   ├── save_game_session.php  # Guarda progreso del usuario
│   ├── get_game_session.php   # Recupera progreso del usuario
│   ├── save_score.php   # Guarda puntuaciones
│   ├── get_scores.php   # Recupera puntuaciones
│   ├── login.php        # Sistema de autenticación
│   ├── logout.php       # Cierre de sesión
├── index.php            # Página principal del juego
├── game_sessions.sql    # Script para crear la tabla de sesiones en MySQL
└── README.md            # Archivo de información del proyecto
## ⚙️ Instalación y Configuración

### 1️⃣ Requisitos
- Servidor web local (XAMPP, WAMP o similar)

- PHP 7.4+

- MySQL

- Navegador moderno (Chrome, Firefox)

### 2️⃣ Configuración de la Base de Datos
1. Importa game_sessions.sql en MySQL:
```sql
mysql -u usuario -p nombre_base_datos < game_sessions.sql
```
2. Configura php/config.php con tus credenciales de MySQL:
```php
<?php
$conn = new mysqli("localhost", "usuario", "contraseña", "nombre_base_datos");
if ($conn->connect_error) die("Conexión fallida: " . $conn->connect_error);
?>
```
3️⃣ Ejecutar el Proyecto
1. Coloca todos los archivos dentro de tu servidor local (htdocs para XAMPP).

2. Abre http://localhost/pvz en tu navegador.

3. ¡Empieza a jugar! 🌱🧟‍♂️✨

## 🎮 Cómo Jugar
- Planta Girasoles para generar soles y comprar más plantas.

- Usa Lanzaguisantes para atacar a los zombis.

- Coloca Nueces para bloquear su avance.

- Recoge los soles y mejora tu defensa contra la invasión.

## 🏆 Sistema de Puntuaciones
- Derrotar un zombi +40 puntos.

- La puntuación se guarda automáticamente en la base de datos scores.

- Se muestra la tabla de mejores jugadores en index.php.

## 🚀 Desarrollo y Contribución
- Si deseas mejorar el proyecto, sigue estos pasos:

- Fork del repositorio.

- Crea una nueva rama git checkout -b nueva-caracteristica.

- Realiza mejoras y envía un Pull Request.