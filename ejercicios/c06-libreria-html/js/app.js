import { limpiarPantalla, mostrarError, buscarInfoLibros, renderizarResultados, errorBusqueda, cargarDetalleLibro } from './funciones.js';

const botonBuscar = document.getElementById('btnBuscar');
const inputBuscador = document.getElementById('inputBusqueda');

window.onload = () => {
    if (document.getElementById("detalleLibro")) {
        cargarDetalleLibro();
    }
};

if (botonBuscar && inputBuscador) {
    const ejecutarBusqueda = async function () {
        limpiarPantalla();

        const busqueda = inputBuscador.value.trim();
        inputBuscador.value = '';

        if (busqueda === '') {
            mostrarError('No se ha ingresado una búsqueda', errorBusqueda);
            return;
        }

        const resultados = await buscarInfoLibros(busqueda);
        renderizarResultados(resultados);
    };

    botonBuscar.addEventListener('click', ejecutarBusqueda);

    inputBuscador.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
}
