

//armazenamento

let estoqueMonitores = 10;
let estoqueNotebooks = 5;
let estoqueTeclado = 15;

let historico = [];

//elementos
const btnEstoque = document.getElementById("btnEstoque");
const tituloPagina = document.getElementById("tituloPagina");

function atualizarEstoque() {
    document.getElementById("qtdMonitores").textContent = estoqueMonitores;
    document.getElementById("qtdNotebooks").textContent = estoqueNotebooks
    document.getElementById("qtdTeclados").textContent = estoqueTeclado;
}
    

btnEstoque.addEventListener("click", function() {
    
    conteudo.innerHTML = `
        <div class="page-header">
            <div>
                <h2 id="tituloPagina">Equipamentos</h2>
                <p>Controle de equipamentos do TI</p>
            </div>
        </div>

            <section class="estoque">

                <div class="card">
                    <h3>Monitores</h3>
                    <strong id="qtdMonitores">${estoqueMonitores}</strong>
                    <span>disponiveis</span>
                </div>

                <div class="card">
                    <h3>Notebooks</h3>
                    <strong id="qtdNotebooks">${estoqueNotebooks}</strong>
                    <span>disponiveis</span>
                </div>

                <div class="card">
                    <h3>Teclados</h3>
                    <strong id="qtdTeclados">${estoqueTeclado}</strong>
                    <span>disponiveis</span>
                </div>

                </section>
    `;
});

//retirar
const btnRetirar = document.getElementById("btnRetirar");
const btnDevolver = document.getElementById("btnDevolver");
const btnHistorico = document.getElementById("btnHistorico");
const conteudo = document.getElementById("conteudo");


btnDevolver.addEventListener("click", function() {
    tituloPagina.textContent = "Devolver Equipamento";

    conteudo.innerHTML = `
            <div class="formulario">

                <div class="campo"
                    <label>Equipamento</label>

                    <select id="equipamentoDevolver">
                        <option value="">Selecione um equipamento</option>
                        <option value="monitor">Monitor</option>
                        <option value="notebook">Notebook</option>
                        <option value="teclado">Teclado</option>
                    </select>
                </div>

                <div class="campo">
                    <label>Quantidade</label>
                    <input id="quantidadeDevolver" type="number" min="1" placeholder="ex: 2">
                </div>

                <div id="mensagemDevolver"></div>

                <button id="btnConfirmarDevolucao">
                    confirmar devolução
                </button>

                </div>
            
            `;

    const campoEquipamentoDevolver = document.getElementById("equipamentoDevolver");
    const campoQuantidadeDevolver = document.getElementById("quantidadeDevolver");
    const campoConfirmarDevolucao = document.getElementById("btnConfirmarDevolucao");
    const mensagemDevolver = document.getElementById("mensagemDevolver");

    btnConfirmarDevolucao.addEventListener("click", function() {

        const quantidade = Number(campoQuantidadeDevolver.value);

        console.log("Equipamento devolvido:", campoEquipamentoDevolver.value);
        console.log("Quantidade devolvida:", quantidade);

        if (campoEquipamentoDevolver.value === "monitor") {
            estoqueMonitores = estoqueMonitores + quantidade;
        }

        if (campoEquipamentoDevolver.value === "notebook") {
            estoqueNotebooks = estoqueNotebooks + quantidade;
        }

        if (campoEquipamentoDevolver.value === "teclado") {
            estoqueTeclado = estoqueTeclado + quantidade;
        }

        historico.push ({
            tipo: "Devolução",
            equipamento: campoEquipamentoDevolver.value,
            quantidade: quantidade,
            tecnico: "-",
            loja: "-",
            chamado: "-",
            data: new Date()
        })

        

        mensagemDevolver.textContent = "Devolução realizada com sucesso!";
        mensagemDevolver.className = "mensagem sucesso";

        console.log("Estoque após devolução:");
        console.log("Monitores:", estoqueMonitores);
        console.log("Notebooks:", estoqueNotebooks);
        console.log("Teclados:", estoqueTeclado);
    })

});

    btnHistorico.addEventListener("click", function() {
        tituloPagina.textContent = "Historico";

            conteudo.innerHTML = `
            <h3>Historico de movimentação</h3>

            <table class="tabela-historico">
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Tipo</th>
                        <th>Equipamento</th>
                        <th>Quantidade</th>
                        <th>Tecnico</th>
                        <th>Loja</th>
                        <th>Chamado</th>
                    </tr>
                </thead>
                
                <tbody id="tabelaHistorico"></tbody>
            </table>
            
            `;

        const tabelaHistorico = document.getElementById("tabelaHistorico");

        historico.forEach(function(item) {

            const nomeEquipamento = 
                item.equipamento === "notebook" ? "Notebook" :
                item.equipamento === "monitor" ? "Monitor" :
                "Teclado";

            const nomeTecnico =
                item.tecnico === "joao" ? "João" :
                item.tecnico === "giovanni" ? "Giovanni" :
                item.tecnico === "nicolas" ? "Nicolas" :
                item.tecnico === "murilo" ? "Murilo" :
                item.tecnico === "eric" ? "Eric" :
                item.tecnico;

            const nomeLoja =
                item.loja === "loja1" ? "Loja 1" :
                item.loja === "loja2" ? "Loja 2" :
                item.loja === "loja4" ? "Loja 4" :
                item.loja;

        const dataFormatada = item.data.toLocaleString("pt-BR");

               tabelaHistorico.innerHTML += `
        <tr>
                     <td>${dataFormatada}</td>

         <td>
                     <span class="${item.tipo === "Retirada" ? "badge-retirada" : "badge-devolucao"}">
                        ${item.tipo}
                    </span>
        </td>

        <td>${nomeEquipamento}</td>
        <td>${item.quantidade}</td>
        <td>${nomeTecnico}</td>
        <td>${nomeLoja}</td>
        <td>${item.chamado}</td>
    </tr>
`;
        });
    });

btnRetirar.addEventListener("click", function() {

    tituloPagina.textContent = "Retirar Equipamento";

    conteudo.innerHTML = `
        <div class="formulario">

            <div class="campo">
                <label>Equipamento</label>
                
                <select id="equipamento">
                    <option value="">Selecione um equipamento</option>
                    <option value="monitor">Monitor</option>
                    <option value="notebook">Notebook</option>
                    <option value="teclado">Teclado</option>
                </select>
            </div>

            <div class="campo">
                <label>Técnico</label>
                
                <select id="tecnico">
                    <option value="">Selecionar Tecnico</option>
                    <option value="joao">João</option>
                    <option value="giovanni">Giovanni</option>
                    <option value="nicolas">Nicolas</option>
                    <option value="murilo">Murilo</option>
                    <option value="eric">Eric</option>
                </select>

            </div>

            <div class="campo">
                <label>Loja</label>

                <select id="loja">
                    <option value="">Selecione a loja</option>
                    <option value="loja1">Loja 1</option>
                    <option value="loja2">Loja 2</option>
                    <option value="loja4">Loja 4</option>
                </select>
                
            </div>


            <div class="campo">
                <label>Número do chamado</label>
                <input id="chamado" type="text" placeholder="Número do chamado">
            </div>

            <div class="campo">
                <label>Quantidade</label>
                <input id="quantidade" type="number" min="1" placeholder="ex:2">
            </div>

            <div id="mensagem"></div>

            <button id="btnConfirmar">Confirmar retirada</button>

        </div>
        
     `;

     

    


  //formulario
    const campoEquipamento = document.getElementById("equipamento");
    const campoTecnico = document.getElementById("tecnico");
    const campoLoja = document.getElementById("loja");
    const campoChamado = document.getElementById("chamado");
    const campoQuantidade = document.getElementById("quantidade");

    const btnConfirmar = document.getElementById("btnConfirmar");
    const mensagem = document.getElementById("mensagem");


//confirmar
    btnConfirmar.addEventListener("click", function() {


        console.log(campoEquipamento.value);
        console.log(campoTecnico.value);
        console.log(campoLoja.value);
        console.log(campoChamado.value);
        console.log(campoQuantidade.value);

        const quantidade = Number(campoQuantidade.value);

        let estoqueAtual;

        if (campoEquipamento.value === "monitor") {
            estoqueAtual = estoqueMonitores;
        }

        if (campoEquipamento.value === "notebook") {
            estoqueAtual = estoqueNotebooks;
        }

        if (campoEquipamento.value === "teclado") {
            estoqueAtual = estoqueTeclado;
        }


        console.log("Monitores:", estoqueMonitores);
        console.log("Notebooks:", estoqueNotebooks);
        console.log("Teclados:", estoqueTeclado);


        

        if (quantidade <= 0) {
            mensagem.textContent = "Informe uma quantidade valida.";

        } else if (quantidade > estoqueAtual) {
            mensagem.textContent = "Estoque Insuficiente.";
            mensagem.className = "mensagem erro";

        } else {

                console.log("Equipamento escolhido:", campoEquipamento.value);
                console.log("Quantidade:", quantidade);



                if (campoEquipamento.value === "monitor") {
                    estoqueMonitores = estoqueMonitores - quantidade;
                }

                if (campoEquipamento.value === "notebook") {
                    estoqueNotebooks = estoqueNotebooks - quantidade;

                    console.log("Notebook atualizado:", estoqueNotebooks);
                }

                if (campoEquipamento.value === "teclado") {
                    estoqueTeclado = estoqueTeclado - quantidade;
                }

                
                historico.push({
                    tipo: "Retirada",
                    equipamento: campoEquipamento.value,
                    quantidade: quantidade,
                    tecnico: campoTecnico.value,
                    loja: campoLoja.value,
                    chamado: campoChamado.value,
                    data: new Date()
                });

                console.log("Historico", historico);

                

                mensagem.textContent = "Retirada realizada com sucesso!";
                mensagem.className = "mensagem sucesso";
        }
    });

    });
