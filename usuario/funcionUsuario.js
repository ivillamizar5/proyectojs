import { crearSesion } from "./sesiones.js";

async function validarUsuario(usuario, password) {
    try {
        const result = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}`);
        if (!result.ok) {
            throw new Error("Error al verificar el usuario");
        }
        const data = await result.json();
        if (data.length > 0) {
            console.log("Usuario ya existe");
            return false;
        } else {
            await crearUsuario(usuario, password);
            crearSesion(usuario);
            window.location.href = "../index.html";
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function validarUsuarioInicio(usuario, password) {
    try {
        const result = await fetch(`http://localhost:3000/usuarios?usuario=${usuario}&password=${password}`);
        if (!result.ok) {
            throw new Error("Error al iniciar sesión");
        }
        const data = await result.json();
        if (data.length === 0) {
            console.log("Usuario no encontrado o contraseña incorrecta");
            return false;
        } else {
            crearSesion(usuario);
            window.location.href = "../index.html";
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function crearUsuario(usuario, password) {
    try {
        const result = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                password
            })
        });
        if (!result.ok) {
            throw new Error("Error al crear el usuario");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export { validarUsuario, validarUsuarioInicio };