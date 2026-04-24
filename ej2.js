const procesarListas = () => {
    const invitados = new Set();
    return {
        todosLosInvitados: (...listas) => {
            return listas.flat().length;
        },
        invitadosUnicos: (...listas) => {
            listas.forEach(lista => {
                lista.forEach(invitado => invitados.add(invitado));
            });
            return Array.from(invitados);
        },
        contarInvitadosUnicos: () => {
            
            return invitados.size;
        }

    };
}

const lista1 = ["Juan", "Maria", "Pedro"];
const lista2 = ["Maria", "Ana", "Luis"];
const lista3 = ["Pedro", "Ana", "Carlos"];

const procesadorDeListas = procesarListas();
console.log(procesadorDeListas.todosLosInvitados(lista1, lista2, lista3));
console.log(procesadorDeListas.invitadosUnicos(lista1, lista2, lista3));
console.log(procesadorDeListas.contarInvitadosUnicos());
