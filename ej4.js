const crearRegistroEventos = () => {
    const eventos = new Map();

    return {
        registrarEvento: (descripcion) => {
            let timestamp = Date.now();
            while (eventos.has(timestamp)) {
                timestamp++;
            }
            eventos.set(timestamp, descripcion);
            return timestamp;
        },

        obtenerEventosEntre: ({ inicio, fin }) => {
            return Array.from(eventos.entries()).filter(([timestamp, descripcion]) => {
                return timestamp >= inicio && timestamp <= fin;
            }).map(([timestamp, descripcion]) => ({ timestamp, descripcion }));
        }
    };
}

//Objeto que se va a desestructurar en la invocacion a la funcion obtenerEventosEntre()
const rango = {
    inicio: Date.now(),
    fin: Date.now() + 1000
};
console.log("--- Agregando eventos ---");
const registro = crearRegistroEventos();

registro.registrarEvento("Evento 1");
registro.registrarEvento("Evento 2");
registro.registrarEvento("Evento 3");
registro.registrarEvento("Evento 4");
registro.registrarEvento("Evento 5");
registro.registrarEvento("Evento 6");

console.log("--- Eventos en el rango ---");
console.log(registro.obtenerEventosEntre(rango));





