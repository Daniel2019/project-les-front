$().ready(function () {
    consultarMeusDados();
});

// FUNÇÕES DE INTEGRAÇÃO COM O BACK-END
function consultarMeusDados(){

    const url = "http://localhost:8080/clientes/listar/1";

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.length == 0){
            adicionarDivDeNenhumCartao();
            return;
        }

        const cliente = data;

        $("#id").val(cliente.id);
        $("#nome").val(cliente.nome);
        $("#sobrenome").val(cliente.sobrenome);
        $("#email").val(cliente.email);
        $("#dataNascimento").val(1);
        $("#cpf").val(cliente.cpf);
        $("#genero").val(1);
        $("#senha").val(cliente.senha);
        $("#tipoContato").val(1);
        $("#ddd").val();
        $("#telefone").val(1);

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
        $("#nome").val(1);
        $("#sobrenome").val(1);
        $("#email").val(1);
        $("#dataNascimento").val(1);
        $("#cpf").val(1);
        $("#genero").val(1);
        $("#senha").val(1);
        $("#tipoContato").val(1);
        $("#ddd").val(1);
        $("#telefone").val(1);
        $("#nomeEndereco").val(1);
        $("#tipoResidencia").val(1);
        $("#cep").val(1);
        $("#logradouro").val(1);
        $("#tipoLogradouro").val(1);
        $("#numero").val(1);
        $("#bairro").val(1);
        $("#cidade").val(1);
        $("#estado").val(1);
        $("#pais").val(1);
        $("#observacoes").val(1);
    });

}

function salvarMeusDadosNoBack(){

    const id = 1;
    const nome = $("#nome").val();
    const sobrenome = $("#sobrenome").val();
    const email = $("#email").val();
    const dataNascimento = $("#dataNascimento").val();
    const cpf = $("#cpf").val();
    const genero = $("#genero").val();
    const senha = $("#senha").val();

    const tipoContato = $("#tipoContato").val();
    const ddd = $("#ddd").val();
    const numero = $("#telefone").val();

    const telefone = {
        id: 1,
        tipoContato: tipoContato,
        ddd: ddd,
        numero: numero
    }

    const nomeEndereco = $("#nomeEndereco").val();
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
        id: 1,
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
            id: 1
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
        status: "ATIVO",
        senha: senha,
        telefone: telefone,
        endereco: endereco 
    }

    // const url = `http://localhost:8080/clientes/atualizar/1`;

    // fetch(url, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(modeloJson)
    // }).then(response => {
    //     return response.text();
    // }).then(data => {
    //     alert(data);       
    // })

    console.log(modeloJSON);
    
}

// FUNÇÕES DE SAIR
function logout() {
    window.location.href = "/";
}