import { validarUsuarioInicio } from "./funcionUsuario.js";
import { cerrarSesion } from "./sesiones.js";

const cerrar = document.querySelector("#cerrarsesion");
let ruta = "./index.html";
cerrarSesion(ruta, cerrar);

const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const btnregistro = document.querySelector(".login-form");
const errorMessage = document.getElementById("error-message");

btnregistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.classList.add("hidden");
    const success = await validarUsuarioInicio(usuario.value, password.value);
    if (!success) {
        errorMessage.textContent = "Usuario no encontrado o contraseña incorrecta";
        errorMessage.classList.remove("hidden");
    }
});