import { limpiarPantalla, mostrarError, buscarInfoLibros, renderizarResultados, errorBusqueda} from './funciones.js'
import LibroOL from './interfaces.js';

const botonBuscar = document.getElementById('btnBuscar') as HTMLButtonElement;

const inputBuscador = document.getElementById('inputBusqueda') as HTMLInputElement;

botonBuscar.addEventListener('click', async function() {

    limpiarPantalla();

    const busqueda = inputBuscador.value.trim();
    inputBuscador.value = '';

    if (busqueda === '') {
        mostrarError('No se ha ingresado una busqueda', errorBusqueda);
        return;
    }

    const resultados: LibroOL[] = await buscarInfoLibros(busqueda);
    renderizarResultados(resultados);
});