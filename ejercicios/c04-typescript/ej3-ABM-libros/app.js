"use strict";
const filtroAutor = (document.getElementById("filtroAutor"));
const botonFiltrar = document.getElementById("filtrar");
const botonDisponibles = document.getElementById("disponibles");
const botonVerTodos = document.getElementById("mostrarTodos");
const botonAgregar = document.getElementById("enviarDatos");
const listado = document.getElementById("listado");
const stats = document.getElementById("stats");
const mensaje = document.getElementById("mensaje");
const infoDeVista = document.getElementById("vista");
let banderaVista = 1; // (1: Vista Todos | 2: Vista Disponibles | 3: Vista Filtro de Autor)
let autorVista = ""; // La uso para aclarar de forma global que autor esta siendo filtrado
const errorForm = document.getElementById("errorForm");
const form = document.getElementById("form");
const datosGuardados = localStorage.getItem("miCatalogo"); //busque info en internet para usar el localStorage
let catalogo = [];
if (datosGuardados) {
    catalogo = JSON.parse(datosGuardados); //Esto convierte el catalogo de texto a un array 
}
else {
    catalogo = [
        { isbn: "1234", titulo: "Rosedal", autor: "Pepe", genero: "", precio: 200, disponible: true },
        { isbn: "1567", titulo: "Leila", autor: "Pepe", genero: "", precio: 500, disponible: false },
        { isbn: "1237", titulo: "Rosedales", autor: "Pep", genero: "", precio: 300, disponible: true },
    ];
    guardarEnMemoria();
}
function guardarEnMemoria() {
    localStorage.setItem("miCatalogo", JSON.stringify(catalogo)); //convierte el array a texto y guarda en localStorage
}
botonVerTodos.addEventListener("click", function () {
    banderaVista = 1;
    renderizar(catalogo);
});
botonDisponibles.addEventListener("click", function () {
    banderaVista = 2;
    renderizar(librosDisponibles());
});
botonFiltrar.addEventListener("click", function () {
    listado.textContent = "";
    stats.textContent = "";
    infoDeVista.textContent = "";
    const autor = filtroAutor.value.trim();
    filtroAutor.value = "";
    if (autor === "") {
        mensaje.textContent = "Debe ingresar un autor en la casilla de texto";
        return;
    }
    const libros = buscarPorAutor(autor.toUpperCase());
    if (libros.length == 0) {
        mensaje.textContent = "No hay libros del autor ";
        return;
    }
    autorVista = capitalizar(autor);
    banderaVista = 3;
    renderizar(libros);
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const datosForm = new FormData(form);
    if (datosForm != null)
        agregarLibro(validarFormulario(datosForm)); //le envio a la funcion los datos del formulario
});
function renderizar(libros) {
    listado.textContent = "";
    mensaje.textContent = "";
    for (const l of libros) {
        const nuevoItem = document.createElement("li");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.id = l.isbn;
        nuevoItem.textContent = `ISBN: ${l.isbn} | Titulo: ${l.titulo} | Autor: ${l.autor} | Precio: ${l.precio} `;
        nuevoItem.appendChild(botonEliminar);
        listado.appendChild(nuevoItem);
        botonEliminar.addEventListener("click", function () {
            eliminarLibro(botonEliminar.id);
            libros = libros.filter(l => l.isbn !== botonEliminar.id);
            renderizar(libros);
        });
    }
    actualizarStats(libros);
    switch (banderaVista) {
        case 1:
            infoDeVista.textContent = "Todos los libros";
            break;
        case 2:
            infoDeVista.textContent = "Libros disponibles";
            break;
        case 3:
            infoDeVista.textContent = `Viendo libros de: ${autorVista}`;
            break;
    }
}
function agregarLibro(nLibro) {
    if (nLibro === null)
        return;
    nLibro.autor = capitalizar(nLibro.autor);
    catalogo.push(nLibro);
    guardarEnMemoria();
    form.reset();
    banderaVista = 1;
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    guardarEnMemoria();
}
function validarFormulario(datosForm) {
    const titulo = datosForm.get("titulo").trim();
    const autor = datosForm.get("autor").trim();
    const genero = datosForm.get("genero").trim();
    const precio = parseFloat(parseFloat(datosForm.get("precio")).toFixed(2));
    const disponible = datosForm.get("disponible");
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
    let bool = false;
    if (disponible === "si")
        bool = true;
    const libro = { isbn: isbn, titulo: titulo, autor: autor, genero: genero, precio: precio, disponible: bool };
    return libro;
}
function buscarPorAutor(autor) {
    let libros = [];
    for (const l of catalogo) {
        if (((l.autor).toUpperCase()).trim() === autor) {
            libros.push(l);
        }
    }
    return libros;
}
function librosDisponibles() {
    let libros = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            libros.push(l);
        }
    }
    return libros;
}
function actualizarStats(libros) {
    const promedio = precioPromedio(libros);
    const cantidad = libros.length;
    stats.textContent = `Cantidad: ${cantidad} | Precio Promedio: $${promedio.toFixed(2)}`;
}
function precioPromedio(libros) {
    let promedio = 0;
    let suma = 0;
    if (libros.length !== 0) {
        for (const l of libros) {
            suma += l.precio;
        }
        promedio = (suma / libros.length);
    }
    return promedio;
}
function capitalizar(cadena) {
    const palabras = cadena.split(" ");
    let cadenaFormateada = "";
    for (let palabra of palabras) {
        cadenaFormateada += palabra.charAt(0).toUpperCase() + (palabra.slice(1)).toLowerCase() + " ";
    }
    return cadenaFormateada;
}
