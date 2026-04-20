"use strict";
const generarArbol = () => {
    const inputTamanio = document.querySelector("#tamanioArbol");
    const tamanioArbol = parseInt(inputTamanio.value);
    const resultado = document.querySelector("#resultado");
    const mensajeError = document.querySelector("#mensajeError");
    if (Number(tamanioArbol) < 1) {
        resultado.textContent = "";
        mensajeError.textContent = "Error: el tamaño debe ser mayor o igual a 1";
        return -1;
    }
    let arbol = "";
    let lineaDeAsteriscos = "";
    let n = tamanioArbol;
    for (let i = 0; i < n; i++) {
        lineaDeAsteriscos += "*";
        arbol += lineaDeAsteriscos + "\n";
    }
    mensajeError.textContent = "";
    resultado.textContent = arbol;
    inputTamanio.value = "";
};
