
const clasificarNota = (nota) => {

    if (nota < 1 || nota > 10){
         console.log("nota invalida");
         return -1;
    }
    if(nota < 4) return "Desaprobado";
    if(nota < 8) return "Aprobado";
    if(nota >= 8) return "Promocionado";
}

const diaDeLaSemana = (numero) => {

    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miercoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sabado (fin de semana)"
        case 7:
            return "Domingo (fin de semana)"
        default:
            return "Dia invalido";
    }

}

console.log("Clasificar nota (1)", clasificarNota(1));
console.log("Clasificar nota (3)", clasificarNota(3));
console.log("Clasificar nota (5)", clasificarNota(5));
console.log("Clasificar nota (7)", clasificarNota(7));
console.log("Clasificar nota (8)", clasificarNota(8));
console.log("Clasificar nota (10)", clasificarNota(10));

console.log("dia de la semana (1)", diaDeLaSemana(1));
console.log("dia de la semana (3)", diaDeLaSemana(3));
console.log("dia de la semana (5)", diaDeLaSemana(5));
console.log("dia de la semana (7)", diaDeLaSemana(7));
console.log("dia de la semana (9)", diaDeLaSemana(9));