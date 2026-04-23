const crearFiltroPorPropiedad = (nombrePropiedad) => {
    return (valorEsperado, array) => {
        return array.filter(objeto => objeto[nombrePropiedad] === valorEsperado);
    };
};

const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");
const residentesMadrid = filtrarPorCiudad("Madrid", 
    [{nombre: "Ana", ciudad: "Madrid"}, {nombre: "Luis", ciudad: "Barcelona"}]);
console.log(residentesMadrid);

