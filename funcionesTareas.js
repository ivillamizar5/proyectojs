async function crearTarea(titulo, descripcion, fechaInicio, fechaFin, estado, idusuario) {
    try {
        const result = await fetch("http://localhost:3000/tareas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                descripcion, 
                fechaInicio, 
                fechaFin, 
                estado,
                idusuario
            })
        });
        if (!result.ok) {
            throw new Error("Error al crear la tarea");
        }
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function mostrarTareas(usuario) {
    try {
        const result = await fetch(`http://localhost:3000/tareas?idusuario=${usuario}`);
        if (!result.ok) {
            throw new Error("Error al obtener las tareas");
        }
        const data = await result.json();
        let obt = { "pendiente": [], "progreso": [], "completada": [] };
        data.forEach(e => {
            if (e.estado === "pendiente") {
                obt["pendiente"].push(e);
            } else if (e.estado === "progreso") {
                obt["progreso"].push(e);
            } else if (e.estado === "completada") {
                obt["completada"].push(e);
            }
        });
        return obt;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function eliminarTarea(id) {
    try {
        const result = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE",
        });
        if (!result.ok) {
            throw new Error("Error al eliminar la tarea");
        }
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function editarTarea(id, titulo, descripcion, fechaInicio, fechaFin, estado, idusuario) {
    try {
        const result = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                descripcion,
                fechaInicio,
                fechaFin,
                estado,
                idusuario
            })
        });
        if (!result.ok) {
            throw new Error("Error al actualizar la tarea");
        }
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

export { crearTarea, mostrarTareas, eliminarTarea, editarTarea };