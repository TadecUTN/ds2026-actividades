const generarArbol = () => {
    const tamanioArbol = document.querySelector("#tamanioArbol").value;
    const resultado = document.querySelector("#resultado");
    const mensajeError = document.querySelector("#mensajeError");

    if(tamanioArbol < 1) {
        resultado.textContent = ""
        mensajeError.textContent = "Error: el tamaño debe ser mayor o igual a 1";
        return -1;
    }

    let arbol = "";
    let lineaDeAsteriscos = "";
    let n = parseInt(tamanioArbol);

    for(let i = 0 ; i < n ; i++){
        lineaDeAsteriscos = lineaDeAsteriscos + "*";
        arbol = arbol + lineaDeAsteriscos + "\n";
    }
    mensajeError.textContent = "";
    resultado.textContent = arbol;
} 