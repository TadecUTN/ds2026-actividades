import { obtenerUsuarios, renderizarUsuarios } from "./funciones.js";
const usuarios = await obtenerUsuarios();
renderizarUsuarios(usuarios);
