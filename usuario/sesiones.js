
const localUsuario = localStorage.getItem("usuario")

function crearSesion(usuario){

    if(localUsuario ===null){
        localStorage.setItem("usuario",usuario)
    }
}


function cerrarSesion(ruta, cerrarSesion){


    if(localUsuario === null){
        cerrarSesion.textContent ="Iniciar Sesion"
    }else{
        cerrarSesion.textContent = "cerrar Sesion"
    }


    cerrarSesion.addEventListener("click", ()=>{
        
        if(localUsuario === null){
            
            cerrarSesion.textContent ="Iniciar Sesion"
            cerrarSesion.href = ruta;
        }else{
            
            localStorage.removeItem("usuario")
            cerrarSesion.textContent ="cerrar Sesion"
        }
        location.reload();
    })
}
export {crearSesion,cerrarSesion}


