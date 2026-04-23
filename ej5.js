import fs from 'fs';

const transformarYAgruparUsuarios = (usuariosApi, ...propiedadesAdicionales) => {
    const usuariosPorPais = new Map();

    const usuariosTransformados = usuariosApi.map(usuario => {
        // Desestructuración con renombre y extracción de detalles
        const { id: userId, nombre_completo, email, detalles } = usuario;
        
        // Transformación: solo primer nombre
        const nombre = nombre_completo.split(" ")[0];

        // Construcción dinámica del objeto usando reduce sobre las props adicionales
        const extraProps = propiedadesAdicionales.reduce((acc, prop) => {
            if (detalles && detalles[prop] !== undefined) acc[prop] = detalles[prop];
            return acc;
        }, {});

        const usuarioTransformado = { userId, nombre, email, ...extraProps };

        // Agrupación por país
        if (propiedadesAdicionales.includes("pais_residencia") && detalles?.pais_residencia) {
            const pais = detalles.pais_residencia;
            if (!usuariosPorPais.has(pais)) {
                usuariosPorPais.set(pais, new Set());
            }
            usuariosPorPais.get(pais).add(userId);
        }

        return usuarioTransformado;
    });

    return { usuariosTransformados, usuariosPorPais };
};

// 1. Cargar el JSON
try {
    const rawData = fs.readFileSync('./usuarios_api.json', 'utf-8');
    const DATA_API = JSON.parse(rawData);

    // 2. Ejecutar transformación
    const { usuariosTransformados, usuariosPorPais } = transformarYAgruparUsuarios(
        DATA_API, 
        "edad", 
        "pais_residencia", 
        "profesion"
    );

    // 3. Mostrar resultados
    console.log("--- Usuarios Transformados ---");
    console.table(usuariosTransformados);

    console.log("\n--- Agrupación por País (Map de Sets) ---");
    usuariosPorPais.forEach((ids, pais) => {
        console.log(`${pais}: [ ${Array.from(ids).join(', ')} ]`);
    });

} catch (error) {
    console.error("Error al procesar los datos:", error.message);
}