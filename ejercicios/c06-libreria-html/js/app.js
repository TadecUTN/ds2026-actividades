import { limpiarPantalla, mostrarError, buscarInfoLibros, renderizarResultados, errorBusqueda } from './funciones.js';
const botonBuscar = document.getElementById('btnBuscar');
const inputBuscador = document.getElementById('inputBusqueda');
botonBuscar.addEventListener('click', async function () {
    limpiarPantalla();
    const busqueda = inputBuscador.value.trim();
    inputBuscador.value = '';
    if (busqueda === '') {
        mostrarError('No se ha ingresado una busqueda', errorBusqueda);
        return;
    }
    const resultados = await buscarInfoLibros(busqueda);
    renderizarResultados(resultados);
});
