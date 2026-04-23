const crearGestorTareas = () => {
    // El Map está encapsulado dentro del closure
    const tareas = new Map();

    return {
        agregarTarea: ({ id, descripcion, etiquetas = [] }) => {
            if (tareas.has(id)) {
                console.error(`Error: Ya existe una tarea con el ID ${id}`);
                return false;
            }
            
            tareas.set(id, {
                id,
                descripcion,
                completada: false,
                etiquetas: new Set(etiquetas)
            });
            return true;
        },

        marcarCompletada: (id) => {
            if (!tareas.has(id)) {
                console.error(`Error: No existe la tarea con ID ${id}`);
                return false;
            }
            const tarea = tareas.get(id);
            tarea.completada = true;
            return true;
        },

        obtenerTareasPorEtiqueta: (etiqueta) => {
            // Iteramos el Map y verificamos el Set de etiquetas
            return Array.from(tareas.values()).filter(tarea => 
                tarea.etiquetas.has(etiqueta)
            );
        },

        listarTareas: () => {
            return Array.from(tareas.values());
        }
    };
};

// Uso del gestor
const gestor = crearGestorTareas();

console.log("--- Agregando tareas ---");
gestor.agregarTarea({ id: 1, descripcion: "Comprar pan", etiquetas: ["comida", "hogar"] });
gestor.agregarTarea({ id: 2, descripcion: "Estudiar JS Avanzado", etiquetas: ["estudio", "programacion"] });
gestor.agregarTarea({ id: 1, descripcion: "Tarea duplicada", etiquetas: ["test"] }); 

console.log("\n--- Listado completo ---");
console.log(gestor.listarTareas());

console.log("\n--- Filtrando por etiqueta 'estudio' ---");
console.log(gestor.obtenerTareasPorEtiqueta("estudio"));

console.log("\n--- Marcando tarea 1 como completada ---");
gestor.marcarCompletada(1);
console.log(gestor.listarTareas().find(t => t.id === 1));

