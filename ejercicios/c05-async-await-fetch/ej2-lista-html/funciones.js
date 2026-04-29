const listadoUsuarios = document.getElementById('listadoUsuarios');
const mensajeCarga = document.getElementById('mensajeCarga');
const mensajeError = document.getElementById('mensajeError');
const mensajeErrorApi = document.getElementById('mensajeErrorApi');
export async function obtenerUsuarios() {
    try {
        mensajeCarga.textContent = 'Cargando...';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        mensajeErrorApi.textContent = '';
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        mensajeErrorApi.textContent = `Error al obtener usuarios: ${error}`;
        return [];
    }
}
export const renderizarUsuarios = (usuarios) => {
    listadoUsuarios.textContent = '';
    mensajeCarga.textContent = '';
    if (usuarios.length > 0) {
        mensajeError.textContent = '';
        for (const u of usuarios) {
            const nuevoItem = document.createElement('li');
            nuevoItem.textContent = ` Nombre: ${u.name} | Email: ${u.email} `;
            listadoUsuarios.appendChild(nuevoItem);
        }
    }
    else {
        mensajeError.textContent = 'No hay usuarios';
        return;
    }
};
