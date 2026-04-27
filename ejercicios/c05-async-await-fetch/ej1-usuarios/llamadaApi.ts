import Usuario from "./interfaces.js";

export default async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios: Usuario[] = await response.json();
        return usuarios;

    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
        return [];
    }
}