import { crearSesion } from "./sesiones.js";


async function validarUsuario(usuario,password){
    try {
        const result = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}&&password=${password}`);

        if(!result.ok){
            throw new Error("Error al crear el usuario")
        }
        const data = await result.json();
        if(data.length === 0){
             crearSesion(usuario);
            await crearUsuario(usuario,password)
            window.location.href = "../index.html";
            }else{
            console.log("usuario ya creado")
        }
    } catch (error) {
        console.log(error)
    }
}



async function validarUsuarioInicio(usuario,password){
    try {
        console.log("Aca")
        const result = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}&&password=${password}`);

        if(!result.ok){
            throw new Error("Error al crear el usuario")
        }
        const data = await result.json();
        if(data.length === 0){
            console.log("usuario no se ha creado")
            }else{
                crearSesion(usuario);
                window.location.href = "../index.html";
            
        }
    } catch (error) {
        console.log(error)
    }
}






async function crearUsuario(usuario,password){
    try {
        const result = await fetch("http://localhost:3000/usuarios",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                usuario,
                password, 
            })
        });

        if(!result.ok){
            throw new Error("Error al crear el usuario")
        }
    } catch (error) {
        console.log(error)
    }
}


export{validarUsuario,validarUsuarioInicio}


