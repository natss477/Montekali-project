const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "login.html";
}

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
const btnStatusCompra = document.getElementById("btnStatusCompra");

if (usuarioLogado !== "ti") {
    btnStatusCompra.style.display = "none";
}
const conteudo = document.getElementById("conteudo");


btnDevolver.addEventListener("click", function() {
    tituloPagina.textContent = "Devolver Equipamento";

    conteudo.innerHTML = `
            <div class="formulario">

                <div class="campo"
                    <label>Equipamento</label>

                    <input id="equipamentoDevolver"
                    list="listaEquipamentosDevolver"
                    placeholder="Digite o equipamento..."

                    >

                <datalist id="listaEquipamentosDevolver">
                    <option value="monitor">
                    <option value="notebook">
                    <option value="teclado">
                </datalist>
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
    

btnRetirar.addEventListener("click", function() {

    tituloPagina.textContent = "Retirar Equipamento";

    conteudo.innerHTML = `
        <div class="formulario">

            <div class="campo">
                <label>Equipamento</label>
                
                <input
                    id="equipamento"
                    list="listaEquipamentos"
                    placeholder="Digite o equipamento..."

                >

                <datalist id="listaEquipamentos">
                    <option value="monitor">
                    <option value="notebook">
                    <option value="teclado">
                </datalist>
                
            </div>

            <div class="campo">
                <label>Técnico</label>
                
                <input 
                    id="tecnico"
                    list="listaTecnicos"
                    placeholder="Digite o nome do tecnico..."
                >

                <datalist id="listaTecnicos">
                    <option value="João">
                    <option value="Giovanni">
                    <option value="Nicolas">
                    <option value="Murilo">
                    <option value="Eric">
                </datalist>
            </div>

            <div class="campo">
                <label>Loja</label>

                    <input
                        id="loja"
                        list="listalojas"
                        placeholder="Digite a loja..."
                    >

                    <datalist id="listaLojas">
                        <option value="Loja 1">
                        <option value="Loja 2">
                        <option value="Loja 4">
                    </datalist>
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

        <h3 class="titulo-historico">Histórico de movimentações</h3>

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
                    <th>Status Compra</th>
                </tr>
            </thead>

            <tbody id="tabelaHistoricoRetirada"></tbody>
            </table>
        
     `;

     

    


  //formulario
    const campoEquipamento = document.getElementById("equipamento");
    const campoTecnico = document.getElementById("tecnico");
    const campoLoja = document.getElementById("loja");
    const campoChamado = document.getElementById("chamado");
    const campoQuantidade = document.getElementById("quantidade");

    const btnConfirmar = document.getElementById("btnConfirmar");
    const mensagem = document.getElementById("mensagem");
    const tabelaHistoricoRetirada = document.getElementById("tabelaHistoricoRetirada");

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

        tabelaHistoricoRetirada.innerHTML += `
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
                <td>
                    ${item.statusCompra || "-"}
                </td>
            </tr>
        `;
    });

    btnConfirmar.addEventListener("click", function() {
        const quantidade = Number(campoQuantidade.value);

        let estoqueAtual = 0;

        if (campoEquipamento.value === "monitor") {
            estoqueAtual = estoqueMonitores;
        }

        if (campoEquipamento.value === "notebook") {
            estoqueAtual = estoqueNotebooks;
        }

        if (campoEquipamento.value === "teclado") {
            estoqueAtual = estoqueTeclado;
        }

        if (quantidade <= 0) {
            mensagem.textContent = "Informe uma quantidade válida.";
            mensagem.className = "mensagem erro";
        } else if (quantidade > estoqueAtual) {
            mensagem.textContent = "Estoque Insuficiente.";
            mensagem.className = "mensagem erro";
        } else {
            if (campoEquipamento.value === "monitor") {
                estoqueMonitores = estoqueMonitores - quantidade;
            }

            if (campoEquipamento.value === "notebook") {
                estoqueNotebooks = estoqueNotebooks - quantidade;
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
                statusCompra: "Aguardando aprovação",
                data: new Date()
            });

            const modal = document.createElement("div");
            modal.className = "modal-fundo";

            modal.innerHTML = `
                <div class="modal">
                    <h2>✓ Retirada realizadaa</h2>

                    <div class="modal-dados">
                        <p><strong>Equipamento:</strong> ${campoEquipamento.value}</p>
                        <p><strong>Quantidade:</strong> ${quantidade}</p>
                        <p><strong>Técnico:</strong> ${campoTecnico.value}</p>
                        <p><strong>Loja:</strong> ${campoLoja.value}</p>
                        <p><strong>Chamado:</strong> ${campoChamado.value}</p>
                    </div>

                    <button id="btnFecharModal">Confirmar</button>
                </div>
            `;

            document.body.appendChild(modal);

            document.getElementById("btnFecharModal").addEventListener("click", function() {
                modal.remove();
            });
        }
    });
});

btnStatusCompra.addEventListener("click", function() {

    if (usuarioLogado !== "ti") {
        return;
    }
    tituloPagina.textContent = "Status de compra";

    const aguardandoAprovacao = historico.filter(
        item => item.statusCompra === "Aguardando aprovação"
    ).length;

    const aguardandoCompra = historico.filter(
        item => item.statusCompra === "Aguardando compra"
    ).length;

    const comprado = historico.filter(
        item => item.statusCompra === "Comprado"
    ).length;

    const recusado = historico.filter(
        item => item.statusCompra === "Recusado"
    ).length;

    let tabelaStatus = "";

    historico.forEach(function(item, index) {
        
        if (item.tipo !== "Retirada") {
            return;
        }

        tabelaStatus += `
        
            <tr>
                <td>${index + 1}</td>
                <td>${item.equipamento}</td>
                <td>${item.quantidade}</td>
                <td>${item.tecnico}</td>
                <td>${item.loja}</td>
                <td>${item.chamado}</td>
                <td>
                    <select
                         class="select-status status-${item.statusCompra.replaceAll(" ", "-")}"
                        data-index="${index}"
                        >
                        <option value="Aguardando aprovação" ${item.statusCompra === "Aguardando aprovação" ? "selected" : ""}>
                            Aguardando aprovação
                        </option>

                        <option value="Aguardando compra" ${item.statusCompra === "Aguardando compra" ? "selected" : ""}>
                             Aguardando compra
                        </option>

                        <option value="Comprado" ${item.statusCompra === "Comprado" ? "selected" : ""}>
                             Comprado
                         </option>

                        <option value="Recusado" ${item.statusCompra === "Recusado" ? "selected" : ""}>
                             Recusado
                         </option>
                     </select>
                </td>
                    
             </tr>
             
             `;
    });

    conteudo.innerHTML = `
        <div class="page-header">
            <div>
                <h2>Status de Compra</h2>
                <p>Acompanhe o andamento das solicitações</p>
            </div>
        </div>

        <div class="estoque">
            <div class="card">
                <h3>Aguardando aprovação</h3>
                <strong>${aguardandoAprovacao}</strong>
                <span>solicitações</span>
            </div>

            <div class="card">
                <h3>Aguardando compra</h3>
                <strong>${aguardandoCompra}</strong>
                <span>solicitações</span>
            </div>

            <div class="card">
                <h3>Comprado</h3>
                <strong>${comprado}</strong>
                <span>solicitações</span>
            </div>

            <div class="card">
                <h3>Recusado</h3>
                <strong>${recusado}</strong>
                <span>solicitações</span>
            </div>
        </div>

    <h3 class="titulo-historico">Solicitações de compra</h3>

    <table class="tabela-historico">
        
        <thead>
            <tr>
                <th>#</th>
                <th>Equipamento</th>
                <th>Quantidade</th>
                <th>Tecnico</th>
                <th>Loja</th>
                <th>Chamado</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            ${tabelaStatus}
        </tbody>

    </table>

    `;

    
        const selectStatus = document.querySelectorAll(".select-status");

        selectStatus.forEach(function(select) {

            select.addEventListener("change", function() {

                const index = Number(select.dataset.index);

                historico[index].statusCompra = select.value;

                select.className = "select-status status-" + select.value.replaceAll(" ", "-");

                console.log("Status atualizado:", historico[index]);

                tituloPagina.textContent = "Status de compra";
                btnStatusCompra.click();

            });
        });
});
