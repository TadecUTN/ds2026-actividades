const filtroAutor = (document.getElementById("filtroAutor")) as HTMLInputElement;

const botonFiltrar = (document.getElementById("filtrar") as HTMLButtonElement);
const botonDisponibles = (document.getElementById("disponibles") as HTMLButtonElement); 
const botonVerTodos = (document.getElementById("mostrarTodos") as HTMLButtonElement);
const botonAgregar = (document. getElementById("enviarDatos") as HTMLButtonElement);

const listado = (document.getElementById("listado") as HTMLUListElement);

const stats = (document.getElementById("stats") as HTMLParagraphElement);
const mensaje = (document.getElementById("mensaje") as HTMLParagraphElement);
const infoDeVista = (document.getElementById("vista") as HTMLParagraphElement);

let banderaVista: number = 1; // (1: Vista Todos | 2: Vista Disponibles | 3: Vista Filtro de Autor)
let autorVista: string = ""; // La uso para aclarar de forma global que autor esta siendo filtrado

const errorForm = (document.getElementById("errorForm") as HTMLDivElement);

const form = document.getElementById("form") as HTMLFormElement;

const datosGuardados = localStorage.getItem("miCatalogo"); //busque info en internet para usar el localStorage

let catalogo: Libro[] = [];

if (datosGuardados) {
    catalogo = JSON.parse(datosGuardados); //Esto convierte el catalogo de texto a un array 
} else {
    catalogo = [ //Algunos libros inicializados si en el navegador no existe la clave miCatalogo
        { isbn: "1234", titulo: "Rosedal", autor: "Pepe", genero: "", precio: 200, disponible: true },
        { isbn: "1567", titulo: "Leila", autor: "Pepe", genero: "", precio: 500, disponible: false },
        { isbn: "1237", titulo: "Rosedales", autor: "Pep", genero: "", precio: 300, disponible: true },
    ];
    guardarEnMemoria();
}

function guardarEnMemoria() {
    localStorage.setItem("miCatalogo", JSON.stringify(catalogo)); //convierte el array a texto y guarda en localStorage
}

interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    genero?: string;
    precio: number;
    disponible: boolean;
}

botonVerTodos.addEventListener("click", function() { //Funcion del boton para ver todo el catalogo
    banderaVista = 1;
    renderizar(catalogo);
});

botonDisponibles.addEventListener("click", function(){ //Funcion del boton para ver solo libros disponibles
    banderaVista = 2;
    renderizar(librosDisponibles());
});

botonFiltrar.addEventListener("click", function(){ //Funcion del boton de filtrar por autor
    listado.textContent = "";
    stats.textContent = "";
    infoDeVista.textContent = "";

    const autor = filtroAutor.value.trim();
    filtroAutor.value = ""

    if (autor === ""){
        mensaje.textContent = "Debe ingresar un autor en la casilla de texto";
        return;
    }

    const libros = buscarPorAutor(autor.toUpperCase());
    if (libros.length == 0){
        mensaje.textContent = "No hay libros del autor "
        return;
    }

    autorVista = capitalizar(autor);
    banderaVista = 3;
    renderizar(libros);
});

form.addEventListener("submit", function(e: Event) { //(busque informacion en internet para saber leer los formularios)
    e.preventDefault();
    const datosForm = new FormData(form);

    if(datosForm != null) agregarLibro(validarFormulario(datosForm)); //le envio a la funcion los datos del formulario
});

function renderizar(libros: Libro[]): void { //Muestra en pantalla toda la informacion correspondiente
    listado.textContent = "";
    mensaje.textContent = "";
    for (const l of libros){
        const nuevoItem = document.createElement("li") as HTMLLIElement;
        const botonEliminar = document.createElement("button") as HTMLButtonElement;

        botonEliminar.textContent = "Eliminar";
        botonEliminar.id = l.isbn;
        nuevoItem.textContent = `ISBN: ${l.isbn} | Titulo: ${l.titulo} | Autor: ${l.autor} | Precio: ${l.precio} `;
        nuevoItem.appendChild(botonEliminar);
        listado.appendChild(nuevoItem);

        botonEliminar.addEventListener("click", function() {
            eliminarLibro(botonEliminar.id);
            libros = libros.filter(l => l.isbn !== botonEliminar.id);
            renderizar(libros);
        });
    }
    actualizarStats(libros);

    switch (banderaVista) {
        case 1: infoDeVista.textContent = "Todos los libros";
            break;
        case 2: infoDeVista.textContent = "Libros disponibles";
            break;
        case 3: infoDeVista.textContent = `Viendo libros de: ${autorVista}`;
            break;
    }
}

function agregarLibro(nLibro: Libro | null): void { //Agrega un libro al catalogo
    if(nLibro === null) return;
    nLibro.autor = capitalizar(nLibro.autor);
    catalogo.push(nLibro);
    guardarEnMemoria();

    form.reset();

    banderaVista = 1;
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void { //Elimina un libro del catalogo
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    guardarEnMemoria();
}

function validarFormulario(datosForm: FormData): Libro | null { //Obtiene los datos del formulario, los completa y valida errores

    const titulo = (datosForm.get("titulo") as string).trim();
    const autor = (datosForm.get("autor") as string).trim();
    const genero = (datosForm.get("genero") as string).trim();
    const precio = parseFloat(parseFloat((datosForm.get("precio") as string)).toFixed(2));
    const disponible = (datosForm.get("disponible") as string);

    if (titulo === "") {
        errorForm.textContent = "No ha ingresado un titulo";
        return null;
    }
    if (autor === "") {
        errorForm.textContent = "No ha ingresado un autor";
        return null;
    }
    if (precio < 0) {
        errorForm.textContent = "El precio debe ser mayor a 0";
        return null;
    }

    const isbn = "AUTO_" + Date.now();
    let bool: boolean = false;
    if (disponible === "si") bool = true;

    const libro: Libro = { isbn: isbn, titulo: titulo, autor: autor, genero: genero, precio: precio, disponible: bool };

    return libro;
}

function buscarPorAutor(autor: string): Libro[] { //Filtra el catalogo a solo libros del autor escrito
    let libros: Libro[] = [];
    for (const l of catalogo){
        if (((l.autor).toUpperCase()).trim() === autor){
            libros.push(l);
        }
    }
    return libros;
}

function librosDisponibles(): Libro[] { //Filtra el catalogo a solo libros disponibles
    let libros: Libro[] = [];
    for (const l of catalogo){
        if (l.disponible === true){
            libros.push(l);
        }
    }
    return libros;
}

function actualizarStats(libros: Libro[]): void { //Actualiza la vista de cantidad y precio promedio
    const promedio: number = precioPromedio(libros);
    const cantidad: number = libros.length;

    stats.textContent = `Cantidad: ${cantidad} | Precio Promedio: $${promedio.toFixed(2)}`;
}

function precioPromedio(libros: Libro[]): number { //Calcula el precio promedio entre todos los libros en pantalla
    let promedio: number = 0;
    let suma: number = 0;
    if (libros.length !== 0){
        for (const l of libros){
            suma += l.precio;
        }
        promedio = (suma/libros.length);
    }
    return promedio;
}

function capitalizar(cadena: string): string { //capitaliza una cadena de texto (la uso para capitalizar autores)
    const palabras = cadena. split(" ");
    let cadenaFormateada: string = "";
    for (let palabra of palabras){
        cadenaFormateada += palabra.charAt(0).toUpperCase() + (palabra.slice(1)).toLowerCase() + " ";
    }
    return cadenaFormateada;
}