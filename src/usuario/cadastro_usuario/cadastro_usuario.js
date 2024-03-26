
// FUNÇÕES DE INTEGRAÇÃO COM O BACK-END
function salvarClienteNoBack(){

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
        tipoContato: tipoContato,
        ddd: ddd,
        numero: numero
    }

    const tipoResidencia = $("#tipoResidencia").val();
    const cep = $("#cep").val();
    const logradouro= $("#logradouro").val();
    const tipoLogradouro = $("#tipoLogradouro").val();
    const numeroEndereco = $("#numero").val();
    const bairro = $("#bairro").val();
    const nomeCidade = $("#cidade").val();
    const siglaEstado = $("#estado").val();
    const observacoes = $("#observacoes").val();

    const endereco = {
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
                sigla: siglaEstado
            },
        },
        cliente: {

        },
        observacoes: observacoes
    }

    const modeloJSON =  {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        dataNascimento: dataNascimento,
        cpf: cpf,
        genero: genero,
        status: "ATIVO",
        senha: senha,
        telefone: telefone,
        endereco: endereco,
    }

    // const url = `http://localhost:8080/clientes/cadastrar`;

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(modeloJSON)
    // }).then(response => {
    //     return response.text();
    // }).then(data => {
    //     alert(data);       
    // })

    console.log(modeloJSON);
    
}

// FUNÇÕES DE SAIR
function voltar() {
    window.location.href = "/src/index.html?";
}