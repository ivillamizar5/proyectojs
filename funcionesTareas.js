async function crearTarea(titulo,descripcion, fechaInicio, fechaFin, estado , idusuario){
    try {

        const result = await fetch("http://localhost:3000/tareas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                titulo,
                descripcion, 
                fechaInicio, 
                fechaFin, 
                estado,
                idusuario
            })
        });

        if(!result.ok){
            throw new Error("Error al crear la tarea")
        }
    } catch (error) {
        console.log(error)
    }
}




async function mostrarTareas(usuario){


    try {
        const result = await fetch(`http://localhost:3000/tareas?idusuario=${usuario}`)
        if(!result.ok){
            throw new Error("Error al crear la tarea")
        }

        const data = await result.json();
        let obt = {"pendiente":[], "progreso":[], "completada":[]};

        data.forEach(e => {
            
            if(e.estado === "pendiente"){
                obt["pendiente"].push(e)
            }
            
            if(e.estado === "progreso"){
                obt["progreso"].push(e)
            }

            if(e.estado === "completada"){
                obt["completada"].push(e)
            }

        });

        return obt;


    } catch (error) {
        console.log(error)
    }
}




async function eliminarTarea(id){


    try {

        const result = await fetch(`http://localhost:3000/tareas/${id}`,{
            method:"DELETE",
        });

        if(!result.ok){
            throw new Error("Error al crear la tarea")
        }
    } catch (error) {
        console.log(error)
    }

}





export{crearTarea,mostrarTareas, eliminarTarea}
