function acessar() {

    const cpf = $("#cpf").val();

    const url = `http://localhost:8080/clientes/acessar/${cpf}`;

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);

        if(data.length > 0){
            sessionStorage.setItem("idDoCliente", data[0].id);
            window.location.href = "./usuario/usuario.html";
        }

    }).catch(error => {
        alert(error)
    });

}