const procesarListas = (...listas) => {
    const invitadosUnicos = new Set(listas.flat());
    const conteoTotalInvitados = listas.flat().length;
    const conteoInvitadosUnicos = invitadosUnicos.size;
    return {
        invitadosUnicos,
        conteoTotalInvitados,
        conteoInvitadosUnicos
    };
}

const lista1 = ["Juan", "Maria", "Pedro"];
const lista2 = ["Maria", "Ana", "Luis"];
const lista3 = ["Pedro", "Ana", "Carlos"];

console.log(procesarListas(lista1, lista2, lista3));