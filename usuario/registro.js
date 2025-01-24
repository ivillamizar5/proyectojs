
import { validarUsuario } from "./funcionUsuario.js";
import { cerrarSesion } from "./sesiones.js";

const usuario = document.getElementById("usuario")
const password = document.getElementById("password")
const btnregistro = document.querySelector(".login-form"); 

const cerrar = document.querySelector("#cerrarsesion");
let ruta = "./index.html"

cerrarSesion(ruta,cerrar)

btnregistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = await validarUsuario(usuario.value, password.value)
  
    if(valido.length === 0){
        console.log("aca")
       
    }
   
})














