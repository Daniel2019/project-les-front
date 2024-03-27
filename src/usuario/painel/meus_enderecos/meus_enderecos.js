let quantidadeDeEndereco = 0;
let idDoCliente = 0;

$().ready(function () {

  idDoCliente = sessionStorage.getItem("idDoCliente");

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
    consultarMeusEnderecos();
  }).catch(error => {
    alert(error);
  });

}

function consultarMeusEnderecos() {
  const url = `http://localhost:8080/enderecos/listar/cliente/${idDoCliente}`;

  fetch(url, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).then(data => {
    if (data.length == 0) {
      adicionarDivDeNenhumEndereco();
      return;
    }

    data.map((endereco) => {

      adicionarDivDeEnderecoExistente(endereco.id, endereco.nomeEndereco);

      $(`#nomeEndereco${quantidadeDeEndereco}`).val(endereco.nomeEndereco);
      $(`#tipoResidencia${quantidadeDeEndereco}`).val(endereco.tipoResidencia);
      $(`#cep${quantidadeDeEndereco}`).val(endereco.cep);
      $(`#logradouro${quantidadeDeEndereco}`).val(endereco.logradouro);
      $(`#tipoLogradouro${quantidadeDeEndereco}`).val(endereco.tipoLogradouro);
      $(`#numero${quantidadeDeEndereco}`).val(endereco.numero);
      $(`#bairro${quantidadeDeEndereco}`).val(endereco.bairro);
      $(`#cidade${quantidadeDeEndereco}`).val(endereco.cidade.nome);
      $(`#estado${quantidadeDeEndereco}`).val(endereco.cidade.estado.sigla);
      $(`#pais${quantidadeDeEndereco}`).val(endereco.cidade.estado.pais);
      $(`#observacoes${quantidadeDeEndereco}`).val(endereco.observacoes);

    })
  }).catch(error => {
    adicionarDivDeNenhumEndereco();
  });

}

function salvarEnderecoNoBack(posicaoDaDivDoEndereco) {

  const nomeEndereco = $(`#nomeEndereco${posicaoDaDivDoEndereco}`).val();
  const tipoResidencia = $(`#tipoResidencia${posicaoDaDivDoEndereco}`).val();
  const cep = $(`#cep${posicaoDaDivDoEndereco}`).val();
  const logradouro = $(`#logradouro${posicaoDaDivDoEndereco}`).val();
  const tipoLogradouro = $(`#tipoLogradouro${posicaoDaDivDoEndereco}`).val();
  const numeroEndereco = $(`#numero${posicaoDaDivDoEndereco}`).val();
  const bairro = $(`#bairro${posicaoDaDivDoEndereco}`).val();
  const nomeCidade = $(`#cidade${posicaoDaDivDoEndereco}`).val();
  const siglaEstado = $(`#estado${posicaoDaDivDoEndereco}`).val();
  const pais = $(`#pais${posicaoDaDivDoEndereco}`).val();
  const observacoes = $(`#observacoes${posicaoDaDivDoEndereco}`).val();

  const modeloJSON = {
    nomeEndereco: nomeEndereco,
    tipoEndereco: "ENTREGA",
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
      }
    },
    cliente: {
      id: idDoCliente
    },
    observacoes: observacoes
  }

  const url = "http://localhost:8080/enderecos/cadastrar";

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modeloJSON)
  }).then(response => {
    return response.text();
  }).then(data => {
    alert(data);
    window.location.reload();
  })

}

function atualizarEnderecoNoBack(posicaoDaDivDoEndereco, idDoEndereco) {

  const nomeEndereco = $(`#nomeEndereco${posicaoDaDivDoEndereco}`).val();
  const tipoResidencia = $(`#tipoResidencia${posicaoDaDivDoEndereco}`).val();
  const cep = $(`#cep${posicaoDaDivDoEndereco}`).val();
  const logradouro = $(`#logradouro${posicaoDaDivDoEndereco}`).val();
  const tipoLogradouro = $(`#tipoLogradouro${posicaoDaDivDoEndereco}`).val();
  const numeroEndereco = $(`#numero${posicaoDaDivDoEndereco}`).val();
  const bairro = $(`#bairro${posicaoDaDivDoEndereco}`).val();
  const nomeCidade = $(`#cidade${posicaoDaDivDoEndereco}`).val();
  const siglaEstado = $(`#estado${posicaoDaDivDoEndereco}`).val();
  const pais = $(`#pais${posicaoDaDivDoEndereco}`).val();
  const observacoes = $(`#observacoes${posicaoDaDivDoEndereco}`).val();

  const modeloJSON = {
    id: idDoEndereco,
    nomeEndereco: nomeEndereco,
    tipoEndereco: "ENTREGA",
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
      }
    },
    cliente: {
      id: idDoCliente
    },
    observacoes: observacoes
  }

  const url = `http://localhost:8080/enderecos/atualizar/${idDoEndereco}`;

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
  })

}

function deletarEndereco(idDoEndereco) {
  let respostaDaConfirmacao = confirm("Você realmente deseja deleter essa endereco?");

  if (respostaDaConfirmacao == true) {

    const url = `http://localhost:8080/enderecos/deletar/${idDoEndereco}`;

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

function adicionarDivDeNenhumEndereco() {

  let html = `
        <div class="card mt-4">
            <div class="card-body">
                Nenhum endereço cadastrado!
            </div>
        </div>
    `;

  $("#listaDeEnderecos").append(html);

}

function adicionarNovaDivEndereco() {

  if (quantidadeDeEndereco == 0) {
    $("#listaDeEnderecos").empty();
  }

  quantidadeDeEndereco = quantidadeDeEndereco + 1;
  let html = `
    <div class="card mt-4" id="divEndereco${quantidadeDeEndereco}">
      <div class="card-body" data-bs-toggle="collapse" data-bs-target="#collapseEnderecos${quantidadeDeEndereco}" aria-expanded="false"
        aria-controls="collapseEnderecos">
        <h4>
          Novo Endereço
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </h4>
      </div>
      <div class="card-body collapse" id="collapseEnderecos${quantidadeDeEndereco}">
        <div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="nomeEndereco${quantidadeDeEndereco}" class="form-label">Nome do Endereço</label>
                <input type="text" class="form-control" id="nomeEndereco${quantidadeDeEndereco}" placeholder="Nome do Endereço">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="tipoResidencia${quantidadeDeEndereco}" class="form-label">Tipo de residencia</label>
                <select class="form-select" id="tipoResidencia${quantidadeDeEndereco}" aria-label="Tipo de residencia">
                  <option value="">Tipo de Residencia</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Sobrado">Sobrado</option>
                  <option value="Condomínio">Condomínio</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="cep${quantidadeDeEndereco}" class="form-label">CEP</label>
                <input type="number" class="form-control" id="cep${quantidadeDeEndereco}" placeholder="CEP">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="tipoLogradouro${quantidadeDeEndereco}" class="form-label">Tipo de logradouro</label>
                <select class="form-select" id="tipoLogradouro${quantidadeDeEndereco}" aria-label="Tipo de logradouro">
                  <option value="">Tipo de Logradouro</option>
                  <option value="Rua">Rua</option>
                  <option value="Avenida">Avenida</option>
                  <option value="Estrada">Estrada</option>
                  <option value="Rodovia">Rodovia</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="logradouro${quantidadeDeEndereco}" class="form-label">Logradouro</label>
                <input type="text" class="form-control" id="logradouro${quantidadeDeEndereco}" placeholder="Logradouro">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="numero${quantidadeDeEndereco}" class="form-label">Número</label>
                <input type="number" class="form-control" id="numero${quantidadeDeEndereco}" placeholder="Número">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="bairro${quantidadeDeEndereco}" class="form-label">Bairro</label>
                <input type="text" class="form-control" id="bairro${quantidadeDeEndereco}" placeholder="Bairro">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="cidade${quantidadeDeEndereco}" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade${quantidadeDeEndereco}" placeholder="Cidade">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="estado${quantidadeDeEndereco}" class="form-label">Estado</label>
                <select name="estado" id="estado${quantidadeDeEndereco}" class="form-select mb-3">
                  <option value="">Estado</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                  <option value="DF">DF</option>
                </select>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="pais${quantidadeDeEndereco}" class="form-label">Pais</label>
                <input type="text" class="form-control" id="pais${quantidadeDeEndereco}" placeholder="Pais">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="observacoes${quantidadeDeEndereco}" class="form-label">Observações</label>
                <textarea class="form-control" id="observacoes${quantidadeDeEndereco}" rows="2"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="btn btn-secondary text-center" onclick="deletarDivDeEndereco(${quantidadeDeEndereco})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
              <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-primary" onclick="salvarEnderecoNoBack(${quantidadeDeEndereco})">Salvar</button>
        </div>
      </div>
    </div>
  `;


  $("#listaDeEnderecos").append(html);
}

function adicionarDivDeEnderecoExistente(idDoEndereco, nomeEndereco) {
  quantidadeDeEndereco = quantidadeDeEndereco + 1;
  let html = `
    <div class="card mt-4" id="divEndereco${quantidadeDeEndereco}">
      <div class="card-body" data-bs-toggle="collapse" data-bs-target="#collapseEnderecos${quantidadeDeEndereco}" aria-expanded="false"
        aria-controls="collapseEnderecos">
        <h4>
          Endereço - ${nomeEndereco}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </h4>
      </div>
      <div class="card-body collapse" id="collapseEnderecos${quantidadeDeEndereco}">
        <div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="nomeEndereco${quantidadeDeEndereco}" class="form-label">Nome do Endereço</label>
                <input type="text" class="form-control" id="nomeEndereco${quantidadeDeEndereco}" placeholder="Nome do Endereço">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="tipoResidencia${quantidadeDeEndereco}" class="form-label">Tipo de residencia</label>
                <select class="form-select" id="tipoResidencia${quantidadeDeEndereco}" aria-label="Tipo de residencia">
                  <option value="">Tipo de Residencia</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Sobrado">Sobrado</option>
                  <option value="Condomínio">Condomínio</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="cep${quantidadeDeEndereco}" class="form-label">CEP</label>
                <input type="number" class="form-control" id="cep${quantidadeDeEndereco}" placeholder="CEP">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="tipoLogradouro${quantidadeDeEndereco}" class="form-label">Tipo de logradouro</label>
                <select class="form-select" id="tipoLogradouro${quantidadeDeEndereco}" aria-label="Tipo de logradouro">
                  <option value="">Tipo de Logradouro</option>
                  <option value="Rua">Rua</option>
                  <option value="Avenida">Avenida</option>
                  <option value="Estrada">Estrada</option>
                  <option value="Rodovia">Rodovia</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="logradouro${quantidadeDeEndereco}" class="form-label">Logradouro</label>
                <input type="text" class="form-control" id="logradouro${quantidadeDeEndereco}" placeholder="Logradouro">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="numero${quantidadeDeEndereco}" class="form-label">Número</label>
                <input type="number" class="form-control" id="numero${quantidadeDeEndereco}" placeholder="Número">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="bairro${quantidadeDeEndereco}" class="form-label">Bairro</label>
                <input type="text" class="form-control" id="bairro${quantidadeDeEndereco}" placeholder="Bairro">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="cidade${quantidadeDeEndereco}" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade${quantidadeDeEndereco}" placeholder="Cidade">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="estado${quantidadeDeEndereco}" class="form-label">Estado</label>
                <select name="estado" id="estado${quantidadeDeEndereco}" class="form-select mb-3">
                  <option value="">Estado</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                  <option value="DF">DF</option>
                </select>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="pais${quantidadeDeEndereco}" class="form-label">Pais</label>
                <input type="text" class="form-control" id="pais${quantidadeDeEndereco}" placeholder="Pais">
              </div>
            </div>
          </div>
          <div class="row me-2">
            <div class="col">
              <div class="mb-3">
                <label for="observacoes${quantidadeDeEndereco}" class="form-label">Observações</label>
                <textarea class="form-control" id="observacoes${quantidadeDeEndereco}" rows="2"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="btn btn-secondary text-center" onclick="deletarEndereco(${idDoEndereco})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
              <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-primary" onclick="atualizarEnderecoNoBack(${quantidadeDeEndereco}, ${idDoEndereco})">Salvar</button>
        </div>
      </div>
    </div>
  `;

  $("#listaDeEnderecos").append(html);
}

function deletarDivDeEndereco(posicaoDaDivDoEndereco) {
  $(`#divEndereco${posicaoDaDivDoEndereco}`).remove();
}

function logout() {
  window.location.href = "/";
}