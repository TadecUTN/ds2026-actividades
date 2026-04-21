"use strict";
const filtroAutor = (document.getElementById("filtroAutor"));
const botonFiltrar = document.getElementById("filtrar");
const botonDisponibles = document.getElementById("disponibles");
const botonVerTodos = document.getElementById("mostrarTodos");
const listado = document.getElementById("listado");
const stats = document.getElementById("stats");
const mensaje = document.getElementById("mensaje");
const catalogo = [
    { isbn: "1234", titulo: "Rosedal", autor: "Pepe", genero: "", precio: 100, disponible: false },
    { isbn: "1567", titulo: "Leila", autor: "Pepe", genero: "", precio: 500, disponible: true },
    { isbn: "1237", titulo: "Rosedales", autor: "Pep", genero: "", precio: 300, disponible: true },
];
function buscarPorAutor(autor) {
    let libros = [];
    for (const l of catalogo) {
        if (l.autor == autor) {
            libros.push(l);
        }
    }
    return libros;
}
function librosDisponibles() {
    let libros = [];
    for (const l of catalogo) {
        if (l.disponible == true) {
            libros.push(l);
        }
    }
    return libros;
}
function precioPromedio(libros) {
    let promedio = 0;
    let suma = 0;
    if (libros.length != 0) {
        for (const l of libros) {
            suma += l.precio;
        }
        promedio = (suma / libros.length);
    }
    return promedio;
}
function actualizarStats(libros) {
    const promedio = precioPromedio(libros);
    const cantidad = libros.length;
    stats.textContent = `Cantidad: ${cantidad} | Precio Promedio: $${promedio.toFixed(2)}`;
}
function renderizar(libros) {
    listado.textContent = "";
    mensaje.textContent = "";
    for (const l of libros) {
        const nuevoItem = document.createElement("li");
        nuevoItem.textContent = `Titulo: ${l.titulo} | Autor: ${l.autor} | Precio: ${l.precio}`;
        listado.appendChild(nuevoItem);
    }
    actualizarStats(libros);
}
botonVerTodos.addEventListener("click", function () {
    renderizar(catalogo);
});
botonDisponibles.addEventListener("click", function () {
    renderizar(librosDisponibles());
});
botonFiltrar.addEventListener("click", function () {
    listado.textContent = "";
    stats.textContent = "";
    const autor = filtroAutor.value.trim();
    if (autor === "") {
        mensaje.textContent = "Debe ingresar un autor en la casilla de texto";
        return;
    }
    const libros = buscarPorAutor(autor);
    if (libros.length == 0) {
        mensaje.textContent = "No hay libros del autor ";
        return;
    }
    renderizar(libros);
});
// let librosFiltrados: Libro[] = buscarPorAutor("Pepe");
// for (let i: number = 0 ; i < librosFiltrados.length ; i++){
//     console.log(librosFiltrados[i]);
// }
