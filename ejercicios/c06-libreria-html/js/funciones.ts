import LibroOL from "./interfaces";

export const errorBusqueda: number = 1;
const errorRender: number = 2;
const errorApi: number = 3;

const resultados = document.getElementById('divResultados') as HTMLDivElement;
const errores = document.getElementById('errores') as HTMLDivElement;
const mensajeCarga = document.getElementById('mensajeCarga') as HTMLParagraphElement;

export async function buscarInfoLibros(busqueda: string): Promise<LibroOL[]> {
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

function obtenerUrlImagen(cover: number): string {
    const imgPorDefecto = 'https://via.placeholder.com/150x200?text=Sin+Portada';
    if (!cover) return imgPorDefecto;

    return `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
}

export async function renderizarResultados(libros: LibroOL[]) {
    mensajeCarga.textContent = '';

    if (libros.length > 0) {
        let cont = 0;

        for (const l of libros) {

            let titulo = l.title;

            let autor = 'Desconocido';
            if (l.author_name && l.author_name.length > 0) {
                autor = l.author_name[0];
            }
            let publicacion = 'Desconocido'
            if (l.first_publish_year) {
                publicacion = l.first_publish_year;
            }

            const columna = document.createElement('div');
            columna.className = 'col-sm-4 mb-4';

            const cardPadre = document.createElement('div');
            cardPadre.className = 'card h-100 shadow-sm border-info';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const imagenLibro = document.createElement('img');
            const urlImg: string = obtenerUrlImagen(l.cover_i);
            imagenLibro.className = 'img-fluid rounded shadow-lg';
            imagenLibro.src = urlImg;

            const parrafoTitulo = document.createElement('h5');
            parrafoTitulo.className = 'card-title';
            parrafoTitulo.textContent = titulo;

            const parrafoAutor = document.createElement('p');
            parrafoAutor.className = 'card-text';
            parrafoAutor.textContent = `Autor: ${autor}`;

            const  parrafoPublicacion = document.createElement('p');
            parrafoPublicacion.className = 'card-text';
            const compParrafoPubli = document.createElement ('small');
            compParrafoPubli.className = 'text-muted';
            compParrafoPubli.textContent = `Publicado en ${publicacion}`;
            parrafoPublicacion.appendChild(compParrafoPubli);

            const linkVerMas = document.createElement('a');
            linkVerMas.href = 'libro.html';
            linkVerMas.className = 'btn btn-info btn-sm';
            linkVerMas.textContent = 'Ver Más';

            cardBody.appendChild(parrafoTitulo);
            cardBody.appendChild(imagenLibro);
            cardBody.appendChild(parrafoAutor);
            cardBody.appendChild(parrafoPublicacion);
            cardBody.appendChild(linkVerMas);

            cardPadre.appendChild(cardBody);

            columna.appendChild(cardPadre);

            resultados.appendChild(columna);

            cont ++;
            if (cont === 6) break;
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