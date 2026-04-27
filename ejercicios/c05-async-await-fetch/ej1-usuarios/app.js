import obtenerUsuarios from "./llamadaApi.js";
const verUsuarios = async () => {
    console.log("Obteniendo usuarios...");
    const usuarios = await obtenerUsuarios();
    if (usuarios.length > 0) {
        for (const u of usuarios) {
            console.log(`Nombre: ${u.name} | Email: ${u.email}`);
        }
    }
    else {
        console.log("No hay usuarios");
    }
};
verUsuarios();
