
const array = [1, 4, 6, 2, 9, 12, 15, 3, 20, -5];  

const sumaTotal = (numeros) => {
    let suma = 0;
    for(const numero of numeros){
    suma = suma + numero;
    }
    return suma;
}

const promedio = (suma, sizeArray) => (suma/sizeArray);

const mayor = (numeros) => {
    let numMayor = numeros[0];
    for (let n of numeros){
        if(numMayor < n) numMayor = n;
    }
    return numMayor;
}

const menor = (numeros) => {
    let numMenor = numeros[0];
    for (let n of numeros){
        if(numMenor > n) numMenor = n;
    }
    return numMenor;
}

const generarAsteriscos = (cantidad) => {
    let conjuntoAst = "";
    for(let i = 0 ; i < cantidad ; i++){
        conjuntoAst = conjuntoAst + "*";
    }
    return conjuntoAst;
} 

console.log("Suma total: ", sumaTotal(array));
console.log("Promedio: ", promedio(sumaTotal(array), array.length));
console.log(`El numero mayor es: ${mayor(array)} y el numero menor es: ${menor(array)}`);

console.log("Metodo generar asteriscos(4)", generarAsteriscos(4));
console.log("Metodo generar asteriscos(10)", generarAsteriscos(10));