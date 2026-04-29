import { obtenerUsuarios, renderizarUsuarios } from "./funciones.js";
import Usuario from "./interfaces.js";

const usuarios: Usuario[] = await obtenerUsuarios();

renderizarUsuarios(usuarios);