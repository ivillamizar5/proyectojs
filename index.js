import { crearTarea, eliminarTarea, mostrarTareas, editarTarea } from "./funcionesTareas.js";
import { cerrarSesion } from "./usuario/sesiones.js";

const cerrar = document.querySelector("#cerrarsesion");
let ruta = "./usuario/index.html";
cerrarSesion(ruta, cerrar);

/*  Elementos */
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fechaInicio = document.getElementById("fecha-inicio");
const fechaFin = document.getElementById("fecha-fin");
const estado = document.getElementById("estado");
const formTarea = document.getElementById("form-tarea");
const pendiente = document.getElementById("pendiente");
const progreso = document.getElementById("progreso");
const completado = document.getElementById("completado");
const taskMessage = document.getElementById("task-message");
const editButton = document.getElementById("editardeshabilitar");
const cancelButton = document.getElementById("cancelar");

async function validarTarea(e) {
    e.preventDefault();
    taskMessage.classList.add("hidden");
    
    const valorEstado = estado.value;
    const fechaInicio1 = new Date(fechaInicio.value);
    const fechaFin1 = new Date(fechaFin.value);
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        alert("Debe iniciar sesión");
        window.location.href = "./usuario/index.html";
        return;
    }

    if (fechaInicio1 > fechaFin1) {
        taskMessage.textContent = "La fecha de inicio no puede ser posterior a la fecha de finalización";
        taskMessage.classList.remove("hidden");
        taskMessage.classList.add("bg-red-500", "text-white");
        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
        return;
    }

    try {
        const success = await crearTarea(
            titulo.value.trim(),
            descripcion.value.trim(),
            fechaInicio1,
            fechaFin1,
            valorEstado,
            usuario
        );
        if (success) {
            taskMessage.textContent = "Tarea creada exitosamente";
            taskMessage.classList.remove("hidden");
            taskMessage.classList.add("bg-green-500", "text-white");
            setTimeout(() => taskMessage.classList.add("hidden"), 5000);
            formTarea.reset();
            editButton.disabled = true;
            editButton.classList.remove("bg-teal-500", "text-black");
            editButton.classList.add("bg-gray-600", "text-gray-300", "cursor-not-allowed");
            delete editButton.dataset.id;
            await pintarTareas();
        } else {
            throw new Error("No se pudo crear la tarea");
        }
    } catch (error) {
        console.error("Error al crear tarea:", error);
        taskMessage.textContent = "No se pudo crear la tarea. Inténtalo de nuevo.";
        taskMessage.classList.remove("hidden");
        taskMessage.classList.add("bg-red-500", "text-white");
        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
    }
}

async function pintarTareas() {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debe iniciar sesión");
        window.location.href = "./usuario/index.html";
        return;
    }

    try {
        const data = await mostrarTareas(usuario);
        if (!data) throw new Error("No se pudieron cargar las tareas");
        
        // Clear columns
        pendiente.innerHTML = "";
        progreso.innerHTML = "";
        completado.innerHTML = "";

        for (const key in data) {
            data[key].forEach(tarea => {
                const fechainicio = new Date(tarea.fechaInicio);
                const fechafinal = new Date(tarea.fechaFin);
                const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const formatDate = (date) => date.toLocaleDateString('en-CA', dateOptions); // YYYY-MM-DD

                const taskCard = `
                    <div class="bg-gray-700 p-4 rounded-md shadow-md" id="task-${tarea.id}">
                        <h3 class="text-sm font-medium text-gray-100">${tarea.titulo}</h3>
                        <p class="text-xs text-gray-400">${tarea.descripcion}</p>
                        <p class="text-xs text-gray-500">Inicio: ${formatDate(fechainicio)}</p>
                        <p class="text-xs text-gray-500">Fin: ${formatDate(fechafinal)}</p>
                        <div class="flex space-x-2 mt-2">
                            <button class="editar bg-teal-500 text-black px-3 py-1 rounded-md hover:bg-teal-400 text-xs" data-id="${tarea.id}">Editar</button>
                            <button class="eliminar bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 text-xs" data-id="${tarea.id}">Eliminar</button>
                        </div>
                    </div>
                `;

                if (tarea.estado === "pendiente") {
                    pendiente.innerHTML += taskCard;
                } else if (tarea.estado === "progreso") {
                    progreso.innerHTML += taskCard;
                } else if (tarea.estado === "completada") {
                    completado.innerHTML += taskCard;
                }
            });
        }

        // Agregar oyentes de eventos para editar y eliminar botones
        document.querySelectorAll(".editar").forEach(button => {
            button.addEventListener("click", async (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                const tarea = data.pendiente.concat(data.progreso, data.completada).find(t => t.id == id);
                if (tarea) {
                    console.log("Editando tarea ID:", id);
                    titulo.value = tarea.titulo;
                    descripcion.value = tarea.descripcion;
                    fechaInicio.value = new Date(tarea.fechaInicio).toISOString().split('T')[0];
                    fechaFin.value = new Date(tarea.fechaFin).toISOString().split('T')[0];
                    estado.value = tarea.estado;
                    // Enable edit button and update styling
                    editButton.disabled = false;
                    editButton.classList.remove("bg-gray-600", "text-gray-300", "cursor-not-allowed");
                    editButton.classList.add("bg-teal-500", "text-black");
                    editButton.dataset.id = id;
                }
            });
        });

        document.querySelectorAll(".eliminar").forEach(button => {
            button.addEventListener("click", async (e) => {
                e.preventDefault();
                try {
                    const success = await eliminarTarea(e.target.dataset.id);
                    if (success) {
                        taskMessage.textContent = "Tarea eliminada exitosamente";
                        taskMessage.classList.remove("hidden");
                        taskMessage.classList.add("bg-green-500", "text-white");
                        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
                        await pintarTareas();
                    } else {
                        throw new Error("No se pudo eliminar la tarea");
                    }
                } catch (error) {
                    console.error("Error al eliminar tarea:", error);
                    taskMessage.textContent = "No se pudo eliminar la tarea. Inténtalo de nuevo.";
                    taskMessage.classList.remove("hidden");
                    taskMessage.classList.add("bg-red-500", "text-white");
                    setTimeout(() => taskMessage.classList.add("hidden"), 5000);
                }
            });
        });

    } catch (error) {
        console.error("Error al mostrar tareas:", error);
        taskMessage.textContent = "No se pudieron cargar las tareas. Inténtalo de nuevo.";
        taskMessage.classList.remove("hidden");
        taskMessage.classList.add("bg-red-500", "text-white");
        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
    }
}

pintarTareas();
formTarea.addEventListener("submit", validarTarea);

// Manejar la actualización de la tarea
editButton.addEventListener("click", async (e) => {
    e.preventDefault();
    taskMessage.classList.add("hidden");
    const id = e.target.dataset.id;
    if (!id) return;

    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debe iniciar sesión");
        window.location.href = "./usuario/index.html";
        return;
    }

    const fechaInicio1 = new Date(fechaInicio.value);
    const fechaFin1 = new Date(fechaFin.value);
    if (fechaInicio1 > fechaFin1) {
        taskMessage.textContent = "La fecha de inicio no puede ser posterior a la fecha de finalización";
        taskMessage.classList.remove("hidden");
        taskMessage.classList.add("bg-red-500", "text-white");
        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
        return;
    }

    try {
        const success = await editarTarea(
            id,
            titulo.value.trim(),
            descripcion.value.trim(),
            fechaInicio1,
            fechaFin1,
            estado.value,
            usuario
        );
        if (success) {
            console.log("Tarea actualizada ID:", id);
            taskMessage.textContent = "Tarea actualizada exitosamente";
            taskMessage.classList.remove("hidden");
            taskMessage.classList.add("bg-green-500", "text-white");
            setTimeout(() => taskMessage.classList.add("hidden"), 5000);
            formTarea.reset();
            editButton.disabled = true;
            editButton.classList.remove("bg-teal-500", "text-black");
            editButton.classList.add("bg-gray-600", "text-gray-300", "cursor-not-allowed");
            delete editButton.dataset.id;
            await pintarTareas();
        } else {
            throw new Error("No se pudo actualizar la tarea");
        }
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        taskMessage.textContent = "No se pudo actualizar la tarea. Inténtalo de nuevo.";
        taskMessage.classList.remove("hidden");
        taskMessage.classList.add("bg-red-500", "text-white");
        setTimeout(() => taskMessage.classList.add("hidden"), 5000);
    }
});

// Manejar Cancelar editar
cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Edición cancelada");
    formTarea.reset();
    editButton.disabled = true;
    editButton.classList.remove("bg-teal-500", "text-black");
    editButton.classList.add("bg-gray-600", "text-gray-300", "cursor-not-allowed");
    delete editButton.dataset.id;
    taskMessage.textContent = "Edición cancelada";
    taskMessage.classList.remove("hidden");
    taskMessage.classList.add("bg-gray-500", "text-white");
    setTimeout(() => taskMessage.classList.add("hidden"), 5000);
});