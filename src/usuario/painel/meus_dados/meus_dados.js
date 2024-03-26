const idCliente = 45;

$().ready(function () {
    consultarMeusDados();
});

// FUNÇÕES DE INTEGRAÇÃO COM O BACK-END
function consultarMeusDados(){

    const url = `http://localhost:8080/clientes/listar/${idCliente}`;

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {

        const cliente = data;
        $("#nomeUsuario").append(`<strong>${cliente.nome}</strong>`)

        $("#id").val(cliente.id);
        $("#nome").val(cliente.nome);
        $("#sobrenome").val(cliente.sobrenome);
        $("#email").val(cliente.email);
        $("#dataNascimento").val(cliente.dataNascimento);
        $("#cpf").val(cliente.cpf);
        $("#genero").val(cliente.genero);
        $("#senha").val(cliente.senha);
        $("#tipoContato").val(cliente.tipoContato);
        $("#ddd").val(cliente.ddd);
        $("#telefone").val(cliente.numeroTelefone);
        $("#status").val(cliente.status)

        cliente.enderecosEntrega.map((endereco) => {

            if(endereco.tipoEndereco == "RESIDENCIAL"){
                $("#nomeEndereco").val(endereco.nomeEndereco);
                $("#tipoResidencia").val(1);
                $("#cep").val(endereco.cep);
                $("#logradouro").val(endereco.logradouro);
                $("#tipoLogradouro").val(1);
                $("#numero").val(endereco.numero);
                $("#bairro").val(endereco.bairro);
                $("#cidade").val(endereco.cidade.nome);
                $("#estado").val(endereco.cidade.estado.nome);
                $("#pais").val(endereco.cidade.estado.pais);
                $("#observacoes").val(endereco.observacoes);
            }

        });

    }).catch(error => {
        alert(error);
    });

}

function salvarMeusDadosNoBack(){

    const id = $("#id").val();
    const nome = $("#nome").val();
    const sobrenome = $("#sobrenome").val();
    const email = $("#email").val();
    const dataNascimento = $("#dataNascimento").val();
    const cpf = $("#cpf").val();
    const genero = $("#genero").val();
    const senha = $("#senha").val();
    const status = $("#status").val();

    const tipoContato = $("#tipoContato").val();
    const ddd = $("#ddd").val();
    const numero = $("#telefone").val();

    const tipoResidencia = $("#tipoResidencia").val();
    const cep = $("#cep").val();
    const logradouro= $("#logradouro").val();
    const tipoLogradouro = $("#tipoLogradouro").val();
    const numeroEndereco = $("#numero").val();
    const bairro = $("#bairro").val();
    const nomeCidade = $("#cidade").val();
    const siglaEstado = $("#estado").val();
    const pais = $("#pais").val();
    const observacoes = $("#observacoes").val();

    const endereco = {
        id: id,
        nomeEndereco: "Meu endereço residencial",
        tipoEndereco: "RESIDENCIAL",
        tipoResidencia: tipoResidencia,
        cep: cep,
        logradouro: logradouro,
        tipoLogradouro: tipoLogradouro,
        numero: numeroEndereco,
        bairro: bairro,
        cidade: {
            nome: nomeCidade,
            estado: {
                sigla: siglaEstado,
                pais: pais
            },
        },
        cliente: {
            id: idCliente
        },
        observacoes: observacoes
    }

    const modeloJSON =  {
        id: id,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        dataNascimento: dataNascimento,
        cpf: cpf,
        genero: genero,
        status: status,
        senha: senha,
        tipoContato: tipoContato,
        ddd: parseInt(ddd),
        numeroTelefone: parseInt(numero),
        telefone: telefone
    }

    const url = `http://localhost:8080/clientes/atualizar/${id}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeloJSON)
    }).then(response => {
        return response.text();
    }).then(data => {
        alert(data);
        window.location.reload();      
    }).catch(error => {
        alert(error);
    });

    console.log(modeloJSON);
    
}

// FUNÇÕES DE SAIR
function logout() {
    window.location.href = "/";
}