import Usuario from "./interfaces.js";

const listadoUsuarios = document.getElementById('listadoUsuarios') as HTMLUListElement;

const mensajeCarga = document.getElementById('mensajeCarga') as HTMLParagraphElement;
const mensajeError = document.getElementById('mensajeError') as HTMLParagraphElement;
const mensajeErrorApi = document.getElementById('mensajeErrorApi') as HTMLParagraphElement;

export async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        mensajeCarga.textContent = 'Cargando...';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if(!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        mensajeErrorApi.textContent = '';
        const usuarios: Usuario[] = await response.json();
        return usuarios;

    } catch (error) {
        mensajeErrorApi.textContent = `Error al obtener usuarios: ${error}`;
        return [];
    }
}

export const renderizarUsuarios = (usuarios: Usuario[]) => {

    listadoUsuarios.textContent = '';
    mensajeCarga.textContent = '';

    if (usuarios.length > 0) {
        mensajeError.textContent = '';
        for (const u of usuarios) {

            const nuevoItem = document.createElement('li');

            nuevoItem.textContent = ` Nombre: ${u.name} | Email: ${u.email} `;

            listadoUsuarios.appendChild(nuevoItem);
        }
    } else {
        mensajeError.textContent = 'No hay usuarios';
        return;
    }
}