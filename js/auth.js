document.addEventListener("DOMContentLoaded", () => {
    // Manejar el formulario de registro
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);

            fetch("php/register.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("¡Cuenta creada correctamente!");
                    window.location.href = "login.html"; // Redirigir a login tras éxito
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => console.error("Error en la solicitud:", error));
        });
    }

    // Manejar el formulario de inicio de sesión
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);

            fetch("php/login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Inicio de sesión exitoso. Bienvenido, " + data.username);
                    window.location.href = "dashboard.html"; // Redirigir tras éxito
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => console.error("Error en la solicitud:", error));
        });
    }
});