import { limpiarPantalla, mostrarError, buscar, renderizarResultados, errorBusqueda} from './funciones.js'
import LibroOL from './interfaces.js';

const botonBuscar = document.getElementById('botonBuscar') as HTMLButtonElement;

const inputBuscador = document.getElementById('buscador') as HTMLInputElement;

botonBuscar.addEventListener('click', async function() {

    limpiarPantalla();

    const busqueda = inputBuscador.value.trim();
    inputBuscador.value = '';

    if (busqueda === '') {
        mostrarError('No se ha ingresado una busqueda', errorBusqueda);
        return;
    }

    const resultados: LibroOL[] = await buscar(busqueda);
    renderizarResultados(resultados);
});