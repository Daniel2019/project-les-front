const idDoCliente = 45;

$().ready(function () {
    consultarMeusDados();
});

function consultarMeusDados() {

    const url = `http://localhost:8080/clientes/listar/${idDoCliente}`;

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {
        const cliente = data;
        $("#nomeUsuario").append(`<strong>${cliente.nome}</strong>`);
    }).catch(error => {
        alert(error);
    });

}

function logout() {
    window.location.href = "/";
}