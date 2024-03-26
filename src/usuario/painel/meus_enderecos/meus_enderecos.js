$().ready(function () {
    consultarMeusEnderecos();
});


let quantidadeDeEndereco = 0;
function logout() {
    window.location.href = "/";
}

function consultarMeusEnderecos(){
    const url = "http://localhost:8080/enderecos/listar";

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        if(data.length == 0){
            adicionarDivDeNenhumEndereco();
            return;
        }

        data.map((cliente) => {
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
        })
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
function adicionarDivDeNenhumEndereco() {

    let html = `
        <div class="card mt-4">
            <div class="card-body">
                Nenhum endereçocadastrado!
            </div>
        </div>
    `;

    $("#listaDeEnderecos").append(html);

}

function adicionarNovaDivEndereco(){
    quantidadeDeEndereco = quantidadeDeEndereco + 1;
    let html =`
    <div class="card mt-4" id="divEndereco${quantidadeDeEndereco}">
                                <div class="card-body" data-bs-toggle="collapse" data-bs-target="#collapseEnderecos2" aria-expanded="false"
                                aria-controls="collapseEnderecos">
                                  <h4>
                                    Endereço 1 - Minha Casa
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                      <path
                                      d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                  </h4>
                                </div>
                                <div class="card-body collapse" id="collapseEnderecos2">
                                    <div>
                                        <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Nome do Endereço</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Nome do Endereço">
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Tipo de residencia</label>
                                                <select class="form-select" aria-label="Tipo de residencia">
                                                  <option value="1">Casa</option>
                                                  <option value="2">Apartamento</option>
                                                  <option value="2">Outro</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">CEP</label>
                                                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="CEP">
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Tipo de logradouro</label>
                                                <select class="form-select" aria-label="Tipo de logradouro">
                                                  <option value="1">Rua</option>
                                                  <option value="2">Avenida</option>
                                                  <option value="2">Estrada</option>
                                                  <option value="2">Outro</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Logradouro</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Logradouro">
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Número</label>
                                                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Número">
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Bairro</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Bairro">
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Cidade</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Cidade">
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Estado</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Estado">
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Pais</label>
                                                <input type="" class="form-control" id="exampleFormControlInput1" placeholder="Pais">
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row me-2">
                                            <div class="col">
                                              <div class="mb-3">
                                                <label for="formFile" class="form-label">Observações</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                              </div>
                                            </div>
                                          </div>
                                    </div>
                                    <div class="buttons">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="deletarEndereco(${quantidadeDeEndereco})">Cancelar</button>
                                        <button type="button" class="btn btn-primary">Salvar</button>
                                    </div>
                                </div>
                              </div>`; 
    

    $("#listaDeEnderecos").append(html);
}

function deletarEndereco(posicaoDaDivDoCartao) {
    $(`#divEndereco${posicaoDaDivDoCartao}`).remove();
}