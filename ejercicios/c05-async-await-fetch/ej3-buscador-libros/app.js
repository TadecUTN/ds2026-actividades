import { limpiarPantalla, mostrarError, buscar, renderizarResultados, errorBusqueda } from './funciones.js';
const botonBuscar = document.getElementById('botonBuscar');
const inputBuscador = document.getElementById('buscador');
botonBuscar.addEventListener('click', async function () {
    limpiarPantalla();
    const busqueda = inputBuscador.value.trim();
    inputBuscador.value = '';
    if (busqueda === '') {
        mostrarError('No se ha ingresado una busqueda', errorBusqueda);
        return;
    }
    const resultados = await buscar(busqueda);
    renderizarResultados(resultados);
});
