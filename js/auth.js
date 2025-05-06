document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const response = await fetch("login.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.status === "success") {
                window.location.href = "../index.php"; // Redirigir tras inicio de sesión
            } else {
                showErrorMessage(loginForm, result.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const response = await fetch("register.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.status === "success") {
                window.location.href = "login.php"; // Redirigir al login tras registro exitoso
            } else {
                showErrorMessage(registerForm, result.message);
            }
        });
    }
});

// Función para mostrar mensajes de error en pantalla
function showErrorMessage(form, message) {
    let errorElement = form.querySelector(".error-message");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.classList.add("error-message");
        form.prepend(errorElement);
    }
    errorElement.textContent = message;
}