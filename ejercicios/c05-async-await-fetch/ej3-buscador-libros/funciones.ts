import LibroOL from './interfaces';

export const errorBusqueda: number = 1;
const errorRender: number = 2;
const errorApi: number = 3;

const resultados = document.getElementById('resultados') as HTMLDivElement;
const errores = document.getElementById('errores') as HTMLDivElement;

const mensajeCarga = document.getElementById('mensajeCarga') as HTMLParagraphElement;

export async function buscar(busqueda: string): Promise<LibroOL[]> {
    try {
        mensajeCarga.textContent = 'Cargando...';
        const response = await fetch(`https://openlibrary.org/search.json?q=${busqueda}`);

        if(!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const datos = await response.json();
        return datos.docs;;

    } catch (error) {
        mostrarError(`Error al obtener libros: ${error}`, errorApi);
        return [];
    }
}

export const renderizarResultados = (libros: LibroOL[]) => {
    mensajeCarga.textContent = '';

    if (libros.length > 0) {
        let cont = 0;
        for (const l of libros) {

            const nuevoLibro = document.createElement('ul');
            const titulo = document.createElement('li');

            titulo.textContent = `Titulo: ${l.title}`;
            nuevoLibro.appendChild(titulo);

            if (l.author_name && l.author_name.length > 0) {
                const autores = document.createElement('li');
                autores.textContent = `Autores: ${l.author_name.join(', ')}`;
                nuevoLibro.appendChild(autores);
            }

            if (l.first_publish_year) {
                const primerAnioPublicacion = document.createElement('li');
                primerAnioPublicacion.textContent = `Primer año de publicacion: ${l.first_publish_year}`;
                nuevoLibro.appendChild(primerAnioPublicacion);
            }

            resultados.appendChild(nuevoLibro);

            cont ++;
            if (cont === 10) break;
        }
    } else {
        mostrarError('No hay resultados', errorRender);
        return;
    }
}

export const limpiarPantalla = () => {
    resultados.textContent = '';
    mensajeCarga.textContent = '';
    borrarError(errorBusqueda);
    borrarError(errorApi);
    borrarError(errorRender);
}

export const mostrarError = (textoError: string, id: number) => {
    const error = document.createElement('p');
    error.textContent = `${textoError}`
    error.id = `${id}`;
    errores.appendChild(error);
}

export const borrarError = (id: number) => {
    const errorBorrar = document.getElementById(`${id}`);
    if (errorBorrar) errores.removeChild(errorBorrar);
}