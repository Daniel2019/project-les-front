var quantidadeDeCartoes = 0;

$().ready(function () {
    consultarCartoesCadastrados();
});

// FUNÇÕES DE INTEGRAÇÃO COM O BACK-END

function consultarCartoesCadastrados(){

    const url = "http://localhost:8080/formaPagamentos/listar";

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.length == 0){
            adicionarDivDeNenhumCartao();
            return;
        }

        data.map((cartao) => {
            adicionarDivDeExistenteCartao(cartao.id);

            $(`#numeroCartao${quantidadeDeCartoes}`).val(cartao.numeroCartao);
            $(`#marca${quantidadeDeCartoes}`).val(cartao.marcaCartao);
            $(`#cvc${quantidadeDeCartoes}`).val(cartao.cvc);
            $(`#validade${quantidadeDeCartoes}`).val(cartao.dataValidade);
            $(`#nomeTitular${quantidadeDeCartoes}`).val(cartao.nomeTitular);
            $(`#cpf${quantidadeDeCartoes}`).val(cartao.cpf);
            $(`#observacoes${quantidadeDeCartoes}`).val(cartao.observacoes);
        })
    }).catch(error => {
        alert("Erro na rota");
        adicionarDivDeNenhumCartao();
    });
}

function salvarCartaoNoBack(posicaoDaDivDoCartao){

    const numeroCartao = $(`#numeroCartao${posicaoDaDivDoCartao}`).val();
    const marca = $(`#marca${posicaoDaDivDoCartao}`).val();
    const cvc = $(`#cvc${posicaoDaDivDoCartao}`).val();
    const validade = $(`#validade${posicaoDaDivDoCartao}`).val();
    const nomeTitular = $(`#nomeTitular${posicaoDaDivDoCartao}`).val();
    const cpf = $(`#cpf${posicaoDaDivDoCartao}`).val();
    const observacoes = $(`#observacoes${posicaoDaDivDoCartao}`).val();

    const modeloJson = {
        numeroCartao: parseInt(numeroCartao),
        marcaCartao: marca,
        cvc: parseInt(cvc),
        dataValidade: validade,
        nomeTitular: nomeTitular,
        cpf: cpf,
        observacoes: observacoes
    }

    const url = "http://localhost:8080/formaPagamentos/cadastrar";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeloJson)
    }).then(response => {
        return response.text();
    }).then(data => {
        alert(data);
        window.location.reload();        
    })

}

function atualizarCartaoNoBack(posicaoDaDivDoCartao, idDoCartao){
   
    const numeroCartao = $(`#numeroCartao${posicaoDaDivDoCartao}`).val();
    const marca = $(`#marca${posicaoDaDivDoCartao}`).val();
    const cvc = $(`#cvc${posicaoDaDivDoCartao}`).val();
    const validade = $(`#validade${posicaoDaDivDoCartao}`).val();
    const nomeTitular = $(`#nomeTitular${posicaoDaDivDoCartao}`).val();
    const cpf = $(`#cpf${posicaoDaDivDoCartao}`).val();
    const observacoes = $(`#observacoes${posicaoDaDivDoCartao}`).val();

    const modeloJson = {
        id: parseInt(idDoCartao),
        numeroCartao: parseInt(numeroCartao),
        marcaCartao: marca,
        cvc: parseInt(cvc),
        dataValidade: validade,
        nomeTitular: nomeTitular,
        cpf: cpf,
        observacoes: observacoes
    }

    const url = `http://localhost:8080/formaPagamentos/atualizar/${idDoCartao}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeloJson)
    }).then(response => {
        return response.text();
    }).then(data => {
        alert(data);
        window.location.reload();        
    })

}

function deletarCartao(idDoCartao) {
    let respostaDaConfirmacao = confirm("Você realmente deseja deleter essa cartão?");

    if (respostaDaConfirmacao == true) {

        const url = `http://localhost:8080/formaPagamentos/deletar/${idDoCartao}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.text();
        }).then(data => {
            alert(data);
            window.location.reload();        
        })

    }
}

// FUNÇÕES DE DIV
function adicionarDivDeNovoCartao() {

    if(quantidadeDeCartoes == 0){
        $("#listaDeCartoes").empty();
    }

    quantidadeDeCartoes = quantidadeDeCartoes + 1;

    let html = `
        <div class="card mt-4" id="card${quantidadeDeCartoes}">
            <div class="card-body" data-bs-toggle="collapse" data-bs-target="#collapseCartao${quantidadeDeCartoes}" aria-expanded="false"
            aria-controls="collapseCartao">
                <h4>
                    Meu Cartão
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </h4>
            </div>
            <div class="card-body collapse" id="collapseCartao${quantidadeDeCartoes}">
                <div>
                    <div>
                        <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="numeroCartao${quantidadeDeCartoes}" class="form-label">Número do Cartão</label>
                                <input type="number" class="form-control" id="numeroCartao${quantidadeDeCartoes}" placeholder="Número do Cartão">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="marca${quantidadeDeCartoes}" class="form-label">Marca do Cartão</label>
                                    <input type="text" class="form-control" id="marca${quantidadeDeCartoes}" placeholder="Marca do Cartão">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="cvc${quantidadeDeCartoes}" class="form-label">CVC</label>
                                <input type="number" class="form-control" id="cvc${quantidadeDeCartoes}" placeholder="CVC">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="validade${quantidadeDeCartoes}" class="form-label">Validade</label>
                                    <input type="text" class="form-control" id="validade${quantidadeDeCartoes}" placeholder="Validade">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="nomeTitular${quantidadeDeCartoes}" class="form-label">Nome do Titular</label>
                                <input type="text" class="form-control" id="nomeTitular${quantidadeDeCartoes}" placeholder="Nome do Titular">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                <label for="cpf${quantidadeDeCartoes}" class="form-label">CPF do Titular</label>
                                <input type="number" class="form-control" id="cpf${quantidadeDeCartoes}" placeholder="CPF do Titular">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="observacoes${quantidadeDeCartoes}" class="form-label">Observações</label>
                                <textarea class="form-control" id="observacoes${quantidadeDeCartoes}" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button type="button" class="btn btn-secondary text-center" onclick="deletarCartaoNaoCadastrado(${quantidadeDeCartoes})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
                        <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-primary" onclick="salvarCartaoNoBack(${quantidadeDeCartoes})">Salvar</button>
                </div>
            </div>
        </div>
    `;

    $("#listaDeCartoes").append(html);
}

function adicionarDivDeExistenteCartao(idDoCartao) {

    quantidadeDeCartoes = quantidadeDeCartoes + 1;

    let html = `
        <div class="card mt-4" id="card${quantidadeDeCartoes}">
            <div class="card-body" data-bs-toggle="collapse" data-bs-target="#collapseCartao${quantidadeDeCartoes}" aria-expanded="false"
            aria-controls="collapseCartao">
                <h4>
                    Meu Cartão
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </h4>
            </div>
            <div class="card-body collapse" id="collapseCartao${quantidadeDeCartoes}">
                <div>
                    <div>
                        <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="numeroCartao${quantidadeDeCartoes}" class="form-label">Número do Cartão</label>
                                <input type="number" class="form-control" id="numeroCartao${quantidadeDeCartoes}" placeholder="Número do Cartão">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="marca${quantidadeDeCartoes}" class="form-label">Marca do Cartão</label>
                                    <input type="text" class="form-control" id="marca${quantidadeDeCartoes}" placeholder="Marca do Cartão">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="cvc${quantidadeDeCartoes}" class="form-label">CVC</label>
                                <input type="number" class="form-control" id="cvc${quantidadeDeCartoes}" placeholder="CVC">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="validade${quantidadeDeCartoes}" class="form-label">Validade</label>
                                    <input type="text" class="form-control" id="validade${quantidadeDeCartoes}" placeholder="Validade">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="nomeTitular${quantidadeDeCartoes}" class="form-label">Nome do Titular</label>
                                <input type="text" class="form-control" id="nomeTitular${quantidadeDeCartoes}" placeholder="Nome do Titular">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                <label for="cpf${quantidadeDeCartoes}" class="form-label">CPF do Titular</label>
                                <input type="number" class="form-control" id="cpf${quantidadeDeCartoes}" placeholder="CPF do Titular">
                                </div>
                            </div>
                            </div>
                            <div class="row me-2">
                            <div class="col">
                                <div class="mb-3">
                                <label for="observacoes${quantidadeDeCartoes}" class="form-label">Observações</label>
                                <textarea class="form-control" id="observacoes${quantidadeDeCartoes}" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button type="button" class="btn btn-secondary text-center" onclick="deletarCartao(${idDoCartao})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
                        <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-primary" onclick="atualizarCartaoNoBack(${quantidadeDeCartoes}, ${idDoCartao})">Salvar</button>
                </div>
            </div>
        </div>
    `;

    $("#listaDeCartoes").append(html);
}

function adicionarDivDeNenhumCartao() {

    let html = `
        <div class="card mt-4">
            <div class="card-body">
                Nenhum cartão cadastrado!
            </div>
        </div>
    `;

    $("#listaDeCartoes").append(html);
}

function deletarCartaoNaoCadastrado(posicaoDaDivDoCartao) {
    $(`#card${posicaoDaDivDoCartao}`).remove();
}

// FUNÇÕES DE SAIR
function logout() {
    window.location.href = "/";
}