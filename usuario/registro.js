import { validarUsuario } from "./funcionUsuario.js";
import { cerrarSesion } from "./sesiones.js";

const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const btnregistro = document.querySelector(".login-form"); 
const cerrar = document.querySelector("#cerrarsesion");
let ruta = "./login.html";

cerrarSesion(ruta, cerrar);

btnregistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const success = await validarUsuario(usuario.value, password.value);
    if (!success) {
        console.log("No se pudo registrar el usuario");
        // Optionally show an error message to the user
    }
});