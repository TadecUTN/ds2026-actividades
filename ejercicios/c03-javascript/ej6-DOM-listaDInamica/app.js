const producto = document.getElementById("nombreProducto");
const botonAgregar = document.getElementById("agregar");
const mensajeError = document.getElementById("mensajeError");
const listaProductos = document.getElementById("listaProductos");
const contadorText = document.getElementById("contadorText");

botonAgregar.addEventListener("click", function() {
    
    const nombreProducto = producto.value.trim(); 
    
    mensajeError.textContent = "";

    if (nombreProducto === "") {
        mensajeError.textContent = "Error: Ingrese texto";
        return;
    }

    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = `${nombreProducto} `; 

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", function() {
        nuevoItem.remove();
        actualizarContador(); 
    });

    nuevoItem.appendChild(botonEliminar);
    listaProductos.appendChild(nuevoItem);
    producto.value = "";
    actualizarContador();
});

function actualizarContador() {
    const cantidad = listaProductos.querySelectorAll("li").length;
    contadorText.textContent = `${cantidad} productos en la lista`;
}