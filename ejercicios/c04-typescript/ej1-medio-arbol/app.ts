const generarArbol = (): number | void => {
    const inputTamanio = (document.querySelector("#tamanioArbol") as HTMLInputElement);
    const tamanioArbol = parseInt(inputTamanio.value);
    const resultado = document.querySelector("#resultado") as HTMLPreElement;
    const mensajeError = document.querySelector("#mensajeError") as HTMLParagraphElement;

    if(Number(tamanioArbol) < 1) {
        resultado.textContent = "";
        mensajeError.textContent = "Error: el tamaño debe ser mayor o igual a 1";
        return -1;
    }

    let arbol: string = "";
    let lineaDeAsteriscos: string = "";
    let n: number = tamanioArbol;

    for(let i: number = 0 ; i < n ; i++){
        lineaDeAsteriscos += "*";
        arbol += lineaDeAsteriscos + "\n";
    }
    mensajeError.textContent = "";
    resultado.textContent = arbol;
    inputTamanio.value = "";
} 