
const calcularPrecioFinal = (monto, medioPago) => {

    if(monto < 0) return -1;
    if(medioPago != "E" && medioPago != "D" && medioPago != "C") return -1;

    if(monto < 200) return monto;
    if(monto <= 400){
        if(medioPago == "E") return (monto - monto*0.3);
        if(medioPago == "D") return (monto - monto*0.2);
        if(medioPago == "C") return (monto - monto*0.1);
    } else return (monto - monto*0.4);
}

const casos = [
    [-40, "E"], //Caso invalido
    [50, "H"],  //Caso invalido
    [100, "E"], //Mismo monto
    [300, "E"], //Descuento 30%
    [300, "C"], //Descuento 10%
    [500, "E"], //Descuento 40%
    [700, "D"], //Descuento 40%
];

casos.forEach(([monto, medioPago]) => {
const final = calcularPrecioFinal(monto, medioPago);
console.log(`Monto: ${monto} | Medio de Pago: ${medioPago} | Precio Final: ${final}`);
});