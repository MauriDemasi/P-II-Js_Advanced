const crearGestorTareas = () => {
    // El Map está encapsulado dentro de la funcion "padre" (Closure)
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
            return Array.from(tareas.values())
            .filter(tarea => 
                tarea.etiquetas.has(etiqueta)
            );
        },

        //obtenerResumenTareas()`: Devuelve un objeto con `{ total, completadas, pendientes }
        obtenerResumenTareas: () => {
            const resumen = { total: tareas.size, completadas: 0, pendientes: 0 };
            tareas.forEach(tarea => {
                if (tarea.completada) {
                    resumen.completadas++;
                } else {
                    resumen.pendientes++;
                }
            });
            return resumen;
        },

        // Método para auxiliar para mostrar el Map de tareas
        mostrarTareas: () => {
            return Array.from(tareas.values());
        }
    };
    
};

// Instanciamos esa función "Padre" gestor
const gestor = crearGestorTareas();

console.log("--- Agregando tareas ---");
gestor.agregarTarea({ id: 1, descripcion: "Comprar pan", etiquetas: ["comida", "hogar"] });
gestor.agregarTarea({ id: 2, descripcion: "Estudiar JS Avanzado", etiquetas: ["estudio", "programacion"] });
gestor.agregarTarea({ id: 1, descripcion: "Tarea duplicada", etiquetas: ["test"] }); 

console.log("\n--- Listado completo ---");
//---Funciones dentro del closure (hijas)-----


console.log("\n--- Filtrando por etiqueta 'estudio' ---");
console.log(gestor.obtenerTareasPorEtiqueta("estudio"));

console.log("\n--- Marcando tarea 1 como completada ---");
gestor.marcarCompletada(1);

console.log("\n--- Resumen de tareas ---");
console.log(gestor.obtenerResumenTareas());

console.log("\n--- Listado completo después de marcar completada ---");
console.dir(gestor.mostrarTareas());
