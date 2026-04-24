const crearFiltroPorPropiedad = (nombrePropiedad) => {
    //Se devuelve una funcion anónima para poder ser flexible la invocación
    return (valorEsperado, array) => { 
        return array.filter(objeto => objeto[nombrePropiedad] === valorEsperado);
    };
};

const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");
const residentesMadrid = filtrarPorCiudad("Madrid", 
    [
        {nombre: "Ana", ciudad: "Madrid"}, 
        {nombre: "Luis", ciudad: "Barcelona"}
    ]);
console.log(residentesMadrid);

