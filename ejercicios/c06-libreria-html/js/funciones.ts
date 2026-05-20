import LibroOL from "./interfaces";

export const errorBusqueda: string = 'error-busqueda';
const errorRender: string = 'error-render';
const errorApi: string = 'error-api';

const resultados = document.getElementById('divResultados') as HTMLDivElement;
const errores = document.getElementById('errores') as HTMLDivElement;
const mensajeCarga = document.getElementById('mensajeCarga') as HTMLParagraphElement;

function escaparHTML(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

export async function buscarInfoLibros(busqueda: string): Promise<LibroOL[]> {
    try {
        mensajeCarga.textContent = 'Cargando...';
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}&limit=6`);

        if(!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const datos = await response.json();
        return datos.docs;

    } catch (error) {
        mostrarError(`Error al obtener libros: ${error}`, errorApi);
        return [];
    }
}

function obtenerUrlImagen(cover: number): string {
    const imgPorDefecto = 'https://placehold.co/150x200?text=Sin+Portada';
    if (!cover) return imgPorDefecto;

    return `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
}

export async function renderizarResultados(libros: LibroOL[]) {
    mensajeCarga.textContent = '';

    if (libros.length > 0) {
        let html = '';
        let cont = 0;

        for (const l of libros) {

            const titulo = escaparHTML(l.title);

            let autor = 'Desconocido';
            if (l.author_name && l.author_name.length > 0) {
                autor = escaparHTML(l.author_name[0]);
            }

            let publicacion = 'Desconocido';
            if (l.first_publish_year) {
                publicacion = escaparHTML(String(l.first_publish_year));
            }

            const cover: string = obtenerUrlImagen(l.cover_i);

            const autorRaw = (l.author_name && l.author_name.length > 0) ? l.author_name[0] : 'Desconocido';

            html += `
                <div class="col-sm-4 mb-4">
                    <div class="card h-100 shadow-sm border-info">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <img class="img-fluid rounded shadow-lg" src="${cover}" alt="Portada de ${titulo}">
                            <p class="card-text"><b>Autor:</b> ${autor}</p>
                            <p class="card-text"><small class="text-muted">Publicado en: ${publicacion}</small></p>
                            <a href="libro.html?titulo=${encodeURIComponent(l.title)}&autor=${encodeURIComponent(autorRaw)}&cover=${encodeURIComponent(cover)}" class="btn btn-info btn-sm">Ver Más</a>
                        </div>
                    </div>
                </div>
            `;

            cont++;
            if (cont === 6) break;
        }

        resultados.innerHTML = html;
    } else {
        mostrarError('No hay resultados', errorRender);
        return;
    }
}

export const cargarDetalleLibro = (): void => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get("titulo");
    const autor = params.get("autor");
    const cover = params.get("cover");

    if(cover) {
        const divImg = document.getElementById('portadaLibro');
        if(divImg) {
            const img = document.createElement('img');
            img.src = cover;
            img.className = 'img-fluid rounded shadow-lg';
            img.alt = titulo ? `Portada de ${titulo}` : 'Portada del libro';
            divImg.appendChild(img);
        }
    }

    if(titulo) {
        const h1Titulo = document.getElementById('tituloLibro');
        if(h1Titulo) h1Titulo.textContent = titulo;
    }

    if(autor) {
        const pAutor = document.getElementById('autor');
        if(pAutor) pAutor.textContent = autor;
    }
}

export const limpiarPantalla = () => {
    resultados.textContent = '';
    mensajeCarga.textContent = '';
    borrarError(errorBusqueda);
    borrarError(errorApi);
    borrarError(errorRender);
}

export const mostrarError = (textoError: string, id: string) => {
    const error = document.createElement('p');
    error.textContent = textoError;
    error.id = id;
    errores.appendChild(error);
}

export const borrarError = (id: string) => {
    const errorBorrar = document.getElementById(id);
    if (errorBorrar) errores.removeChild(errorBorrar);
}