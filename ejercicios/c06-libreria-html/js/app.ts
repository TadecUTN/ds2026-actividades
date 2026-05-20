import { limpiarPantalla, mostrarError, buscarInfoLibros, renderizarResultados, errorBusqueda, cargarDetalleLibro } from './funciones.js'
import LibroOL from './interfaces.js';

const botonBuscar = document.getElementById('btnBuscar') as HTMLButtonElement | null;
const inputBuscador = document.getElementById('inputBusqueda') as HTMLInputElement | null;

window.onload = () => {
    if (document.getElementById("detalleLibro")) {
        cargarDetalleLibro();
    }
};

if(botonBuscar && inputBuscador) {
    const ejecutarBusqueda = async () => {
        limpiarPantalla();

        const busqueda = inputBuscador.value.trim();
        inputBuscador.value = '';

        if (busqueda === '') {
            mostrarError('No se ha ingresado una búsqueda', errorBusqueda);
            return;
        }

        const resultados: LibroOL[] = await buscarInfoLibros(busqueda);
        renderizarResultados(resultados);
    };

    botonBuscar.addEventListener('click', ejecutarBusqueda);

    inputBuscador.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
}