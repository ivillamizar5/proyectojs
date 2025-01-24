import { crearTarea, mostrarTareas } from "./funcionesTareas.js";
import { cerrarSesion } from "./usuario/sesiones.js";
const cerrar = document.querySelector("#cerrarsesion");
let ruta = "../usuario/index.html"
cerrarSesion(ruta,cerrar)

/* datos tareas */
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fechaInicio = document.getElementById("fecha-inicio");
const fechaFin = document.getElementById("fecha-fin");
const estado = document.getElementById("estado");
const formTarea = document.getElementById("form-tarea");
const pendiente = document.getElementById("pendiente");
const progreso = document.getElementById("progreso");
const completado = document.getElementById("completado");


async function validarTarea(e) {
    e.preventDefault();
    
    let valorEstado = estado.value;

    let fechaInicio1 = new Date(fechaInicio.value);
    let fechaFin1 = new Date(fechaFin.value);
    let usuario = localStorage.getItem("usuario")
    if (valorEstado === "pendiente") {
        await crearTarea((titulo.value).trim(), (descripcion.value).trim(), fechaInicio1, fechaFin1, valorEstado, usuario)
    }

    if (valorEstado === "progreso") {
        await crearTarea((titulo.value).trim(), (descripcion.value).trim(), fechaInicio1, fechaFin1, valorEstado,usuario)
    }

    if (valorEstado === "completada") {
        await crearTarea((titulo.value).trim(), (descripcion.value).trim(), fechaInicio1, fechaFin1, valorEstado,)
    }
}




async function pintarTareas() {
    let usuario = localStorage.getItem("usuario")
    if (usuario === null){
        alert("debe iniciar sesion");
        window.localStorage.href ="../usuario/index.html"
    }else{
        let data = await mostrarTareas(usuario);
        for (const key in data) {
            data[key].forEach(tareas => {
                const fechainicio = new Date(tareas.fechaInicio);
                const fechafinal = new Date(tareas.fechaFin);
                let diainicio = fechainicio.getDate();
                let mesinicio = fechainicio.getMonth();
                let anioinicio = fechainicio.getFullYear();
                let diaFin = fechafinal.getDate();
                let mesFin = fechafinal.getMonth(); 
                let aniofin = fechafinal.getFullYear();
                if (tareas.estado === "pendiente") {
                    pendiente.innerHTML += `<form class="border " >  
                    <input value ="${tareas.id}" id="id"> </input>
                    <input value ="${tareas.titulo}" id="titulo"> </input>
                    <textarea  value ="${tareas.descripcion}" id="titulo">${tareas.descripcion} </textarea>
                    <input type="date" value ="${anioinicio}-${("0" + (mesinicio+ 1)).slice(-2)}-${diainicio}" class="fechaInicio"> </input>
                    <input type="date" value ="${aniofin}-${("0" + (mesFin+ 1)).slice(-2)}-${diaFin}" class="fechaFin"> </input>
                    <button class="border" class ="editar"> Editar </button> 
                    <button class="border" class="eliminar" > Eliminar </button> 
                    </form>`
                }
    
                if (tareas.estado === "progreso") {
                    progreso.innerHTML += `<form class="border " >  
                    <input value ="${tareas.id}" id="id"> </input>
                    <input value ="${tareas.titulo}" id="titulo"> </input>
                    <textarea  value ="${tareas.descripcion}" id="titulo">${tareas.descripcion} </textarea>
                    <input type="date" value ="${anioinicio}-${("0" + (mesinicio+ 1)).slice(-2)}-${diainicio}" class="fechaInicio"> </input>
                    <input type="date" value ="${aniofin}-${("0" + (mesFin+ 1)).slice(-2)}-${diaFin}" class="fechaFin"> </input>
                    <button class="border" class ="editar"> Editar </button> 
                    <button class="border" class="eliminar" > Eliminar </button> 
                    </form>`
                }
    
                if (tareas.estado === "completado") {
                    completado.innerHTML += `<form class="border " >  
                    <input value ="${tareas.id}" id="id"> </input>
                    <input value ="${tareas.titulo}" id="titulo"> </input>
                    <textarea  value ="${tareas.descripcion}" id="titulo">${tareas.descripcion} </textarea>
                    <input type="date" value ="${anioinicio}-${("0" + (mesinicio+ 1)).slice(-2)}-${diainicio}" class="fechaInicio"> </input>
                    <input type="date" value ="${aniofin}-${("0" + (mesFin+ 1)).slice(-2)}-${diaFin}" class="fechaFin"> </input>
                    <button class="border" class ="editar"> Editar </button> 
                    <button class="border" class="eliminar" > Eliminar </button> 
                    </form>`
                }
            });
        }
    }

}





pintarTareas()
formTarea.addEventListener("submit", validarTarea)











