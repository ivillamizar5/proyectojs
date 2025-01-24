import { validarUsuarioInicio } from "./funcionUsuario.js";
import { cerrarSesion } from "./sesiones.js";


const cerrar = document.querySelector("#cerrarsesion");
let ruta = "./index.html"
cerrarSesion(ruta,cerrar)

const usuario = document.getElementById("usuario")
const password = document.getElementById("password")
const btnregistro = document.querySelector(".login-form"); 


btnregistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("aca")
    await validarUsuarioInicio(usuario.value, password.value)
})
