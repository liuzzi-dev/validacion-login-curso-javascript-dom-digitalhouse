document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });

    emailInput.addEventListener("blur", function () {
        validateEmail();
    });

    emailInput.addEventListener("change", function () {
        clearError(emailError);
    });

    passwordInput.addEventListener("change", function () {
        clearError(passwordError);
    });

    confirmPasswordInput.addEventListener("change", function () {
        clearError(confirmPasswordError);
    });

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            // Guardar email en el localStorage y generar un JSON en consola
            alert("Has ingresado con exito");
        }
    }

    function validateEmail() {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = emailInput.value.trim();
        const isValidEmail = emailRegex.test(emailValue);

        if (!isValidEmail) {
            showError(emailError, "Ingrese un email válido.");
            return false;
        }

        return true;
    }

    function validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        const passwordValue = passwordInput.value.trim();
        const isValidPassword = passwordRegex.test(passwordValue);

        // Verificar longitud mínima
        if (passwordValue.length < 6) {
            showError(passwordError, "La contraseña debe tener al menos 6 caracteres.");
            return false;
        }

        // Verificar requisitos de la contraseña
        if (!isValidPassword) {
            showError(
                passwordError,
                "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
            );
            return false;
        }

        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, "Las contraseñas no coinciden.");
            return false;
        }

        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }

    function clearError(errorElement) {
        errorElement.innerHTML = "";
        errorElement.style.display = "none";
    }
});
