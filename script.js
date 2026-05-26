// Dados de Estado do Jogo
let dinheiro = 48;
let ecoPoints = 0;
let fertilizantesQuantidade = 0;
 
let inventarioSementes = {
    girassol: 0,
    milho: 0, 
    árvore: 0
};
 
let vasosDados = Array(10).fill(null);
let vasosBloqueados = [false, false, false, false, false, false, true, true, true, true];

const dicas = [
    "A compostagem transforma restos de comida em adubo natural.",
    "Plantas nativas atraem polinizadores como abelhas e borboletas.",
    "O cultivo próprio reduz a pegada de carbono.",
    "Árvores ajudam a controlar a temperatura urbana.",
    "Economizar água na rega é fundamental para o jardim eco-friendly.",
    "O milho cresce bem rápido e ajuda bastante a reduzir o gás carbônico urbano!"
];

// Lista Expandida com 20 Curiosidades Reais sobre o Agro
const curiosidadesAgro = [
    "O Brasil é líder mundial no uso de controle biológico (usar insetos bons para combater pragas), diminuindo consideravelmente o uso de defensivos químicos.",
    "A Agroecologia une técnicas agrícolas modernas com a conservação da natureza, garantindo solos férteis por gerações sem destruir as matas nativas.",
    "A tecnologia de Plantio Direto consiste em plantar a nova semente sobre a palha da colheita anterior. Isso evita a erosão e retém a umidade da terra de forma natural.",
    "Drones e sensores de alta precisão varrem plantações inteiras para mapear e aplicar água ou nutrientes apenas onde a planta realmente necessita, evitando desperdícios.",
    "O sistema ILPF (Integração Lavoura-Pecuária-Floresta) combina árvores, pastagens e plantações no mesmo espaço. Ele recupera solos degradados e neutraliza o carbono emitido pelo gado.",
    "O milho e a cana-de-açúcar produzidos em larga escala no agro sustentável servem de base para biocombustíveis (como o etanol), que emitem muito menos gases poluentes que a gasolina.",
    "A Fixação Biológica de Nitrogênio usa bactérias naturais para capturar o nutriente diretamente do ar para as plantas, eliminando a necessidade de adubos químicos pesados.",
    "Cerca de 25% do território brasileiro é preservado graças a áreas de proteção mantidas obrigatoriamente dentro das propriedades rurais dos produtores do agro.",
    "A hidroponia cultiva plantas diretamente na água rica em nutrientes, sem utilizar solo. Esse método moderno consegue economizar até 90% de água comparado à agricultura tradicional.",
    "Estufas inteligentes com iluminação de LED especial conseguem acelerar a fotossíntese de hortaliças urbanas, produzindo alimentos frescos no centro de metrópoles.",
    "A rotação de culturas altera as plantas cultivadas a cada safra (como soja e depois milho). Isso quebra o ciclo de pragas da terra e enriquece o solo naturalmente.",
    "Sensores instalados no solo conseguem ler a umidade exata da terra em tempo real e mandam um aviso automático para o sistema irrigar o campo apenas se houver necessidade.",
    "As abelhas são aliadas gigantescas do Agro: a polinização controlada delas em plantações de café e maçã pode aumentar a produtividade das safras em até 30%.",
    "A agricultura de precisão usa satélites do espaço e GPS em tratores para guiar linhas perfeitas de plantio, evitando sobreposição de sementes e compactação desnecessária do chão.",
    "Florestas plantadas de eucalipto e pinus para a produção de papel e madeira evitam que florestas nativas e antigas sejam desmatadas para suprir o mercado.",
    "O uso de biofertilizantes produzidos a partir de esterco e resíduos orgânicos reaproveita o que seria descartado e reduz os custos de fertilização química de lavouras.",
    "A cana-de-açúcar brasileira tem uma das pegadas energéticas mais eficientes do mundo: além do etanol, a queima do seu bagaço gera energia elétrica limpa para as usinas.",
    "Softwares de Inteligência Artificial conseguem analisar fotos de folhas tiradas por celulares de agricultores e diagnosticar doenças na plantação em poucos segundos.",
    "A técnica do terraceamento (criar degraus em terrenos inclinados) impede que as águas das chuvas corram muito rápido, evitando enxurradas e mantendo os nutrientes no morro.",
    "O Agro digital utiliza previsões meteorológicas ultra-localizadas cruzando dados de satélites para dizer ao fazendeiro o dia exato e perfeito para realizar a colheita."
];

const jardim = document.getElementById('jardim');

// Funções de Curiosidade
function abrirJanelaCuriosidade() {
    document.getElementById('modal-curiosidade').style.display = 'flex';
    gerarNovaCuriosidade();
}

function fecharJanelaCuriosidade() {
    document.getElementById('modal-curiosidade').style.display = 'none';
}

function gerarNovaCuriosidade() {
    const respostaBox = document.getElementById('resposta-agro');
    const respostaAleatoria = curiosidadesAgro[Math.floor(Math.random() * curiosidadesAgro.length)];
    respostaBox.innerHTML = `💡 <strong>Você sabia?</strong> ${respostaAleatoria}`;
}

// Sistema de Gerenciamento de Saves (5 slots)
function obterSaves() {
    let saves = localStorage.getItem('eco_jardim_slots');
    return saves ? JSON.parse(saves) : Array(5).fill(null);
}

function salvarJogo(slotIndex) {
    let slots = obterSaves();
    
    let vasosLimpos = vasosDados.map(v => {
        if(v && typeof v === 'object') {
            return { ...v, pronto: true, tempo: 0 }; 
        }
        return v;
    });

    let dadosSave = {
        data: new Date().toLocaleString('pt-BR'),
        dinheiro: dinheiro,
        ecoPoints: ecoPoints,
        fertilizantesQuantidade: fertilizantesQuantidade,
        inventarioSementes: inventarioSementes,
        vasosDados: vasosLimpos,
        vasosBloqueados: vasosBloqueados
    };

    slots[slotIndex] = dadosSave;
    localStorage.setItem('eco_jardim_slots', JSON.stringify(slots));
    
    atualizarListasSaves();
    alert(`Jogo salvo com sucesso no Slot ${slotIndex + 1}!`);
}

function carregarJogo(slotIndex) {
    let slots = obterSaves();
    let save = slots[slotIndex];

    if (!save) return;

    dinheiro = save.dinheiro;
    ecoPoints = save.ecoPoints;
    fertilizantesQuantidade = save.fertilizantesQuantidade;
    inventarioSementes = save.inventarioSementes;
    vasosDados = save.vasosDados;
    vasosBloqueados = save.vasosBloqueados;

    document.getElementById('tela-inicial').style.display = 'none';
    fecharMenuSalvar();
    
    mudarTela('jardim');
    renderizarJardim();
    atualizarInterface();
    atualizarCidade();
    
    alert(`Slot ${slotIndex + 1} carregado com sucesso!`);
}

function excluirSave(slotIndex) {
    if (confirm(`Tem certeza que deseja apagar permanentemente o save do Slot ${slotIndex + 1}?`)) {
        let slots = obterSaves();
        slots[slotIndex] = null;
        localStorage.setItem('eco_jardim_slots', JSON.stringify(slots));
        atualizarListasSaves();
    }
}

function atualizarListasSaves() {
    let slots = obterSaves();
    let htmlInicial = "";
    let htmlGameplay = "";

    slots.forEach((save, index) => {
        if (save) {
            let resumo = `R$ ${save.dinheiro} | 🌱 ${save.ecoPoints} CO₂ (${save.data})`;
            
            htmlInicial += `
                <div class="slot-save">
                    <div class="slot-info"><strong>Slot ${index + 1}:</strong><br><small>${resumo}</small></div>
                    <div class="slot-acoes">
                        <button class="btn-slot-carregar" onclick="carregarJogo(${index})">Abrir</button>
                        <button class="btn-slot-deletar" onclick="excluirSave(${index})">❌</button>
                    </div>
                </div>
            `;
            htmlGameplay += `
                <div class="slot-save">
                    <div class="slot-info"><strong>Slot ${index + 1}:</strong><br><small>${resumo}</small></div>
                    <div class="slot-acoes">
                        <button class="btn-slot-salvar" onclick="salvarJogo(${index})">Salvar por cima</button>
                        <button class="btn-slot-deletar" onclick="excluirSave(${index})">❌</button>
                    </div>
                </div>
            `;
        } else {
            htmlInicial += `
                <div class="slot-save" style="opacity: 0.6;">
                    <div class="slot-info"><strong>Slot ${index + 1}:</strong> Vazio</div>
                </div>
            `;
            htmlGameplay += `
                <div class="slot-save">
                    <div class="slot-info"><strong>Slot ${index + 1}:</strong> Vazio</div>
                    <div class="slot-acoes">
                        <button class="btn-slot-salvar" style="background-color: var(--sucesso);" onclick="salvarJogo(${index})">Salvar Aqui</button>
                    </div>
                </div>
            `;
        }
    });

    document.getElementById('lista-saves-inicial').innerHTML = htmlInicial;
    document.getElementById('lista-saves-gameplay').innerHTML = htmlGameplay;
}

function abrirMenuSalvar() {
    atualizarListasSaves();
    document.getElementById('modal-menu-salvar').style.display = 'flex';
}

function fecharMenuSalvar() {
    document.getElementById('modal-menu-salvar').style.display = 'none';
}

function voltarParaMenuPrincipal() {
    if(confirm("Deseja voltar para a tela inicial? Seu progresso continuará ativo enquanto a aba não fechar, mas lembre-se de salvar antes!")) {
        fecharMenuSalvar();
        atualizarListasSaves();
        document.getElementById('tela-inicial').style.opacity = '1';
        document.getElementById('tela-inicial').style.display = 'flex';
    }
}

function renderizarJardim() {
    jardim.innerHTML = '';
    for(let i=0; i<10; i++) {
        const bloqueado = vasosBloqueados[i];
        const statusClasse = bloqueado ? 'vaso bloqueado' : 'vaso';
         
        let conteudo = '';
        if (bloqueado) {
            conteudo = `<span>🔒</span><span class="preco-desbloqueio">R$ 115</span>`;
        } else {
            if (vasosDados[i] === null) {
                conteudo = '🟫';
            } else if (vasosDados[i] === "fertilizado") {
                conteudo = '🟫✨';
            } else {
                conteudo = vasosDados[i].pronto ? vasosDados[i].icone : '🌱';
            }
        }
         
        jardim.innerHTML += `
            <div class="container-vaso">
                <div class="progresso-bg" id="barra-bg-${i}"><div class="progresso-fill" id="barra-fill-${i}"></div></div>
                <div class="${statusClasse}" id="vaso-${i}" onclick="interagirVaso(${i})">
                    ${conteudo}
                </div>
            </div>
        `;
    }
}

function iniciarJogo() {
    document.getElementById('tela-inicial').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('tela-inicial').style.display = 'none';
    }, 500);
    renderizarJardim();
    atualizarInterface();
    atualizarCidade();
}

function mudarTela(tela) {
    if (tela === 'cidade') {
        document.getElementById('tela-jardim').style.display = 'none';
        document.getElementById('contador-canto').style.display = 'none';
        document.getElementById('tela-cidade').style.display = 'flex';
        document.getElementById('btn-ir-cidade').style.display = 'none';
        document.getElementById('btn-ir-jardim').style.display = 'inline-block';
    } else {
        document.getElementById('tela-cidade').style.display = 'none';
        document.getElementById('tela-jardim').style.display = 'flex';
        document.getElementById('contador-canto').style.display = 'block';
        document.getElementById('btn-ir-jardim').style.display = 'none';
        document.getElementById('btn-ir-cidade').style.display = 'inline-block';
    }
}

function atualizarInterface() {
    document.getElementById('dinheiro').innerText = "R$ " + dinheiro;
    document.getElementById('eco-points').innerText = ecoPoints;
    document.getElementById('qtd-girassol').innerText = inventarioSementes.girassol;
    document.getElementById('qtd-milho').innerText = inventarioSementes.milho;
    document.getElementById('qtd-arvore').innerText = inventarioSementes.árvore;
    document.getElementById('qtd-fertilizante').innerText = fertilizantesQuantidade;
}

function comprarSemente(tipo, custo, eco, lucro, icone, tempo) {
    if (dinheiro >= custo) {
        dinheiro -= custo;
        inventarioSementes[tipo] = (inventarioSementes[tipo] || 0) + 1;
        atualizarInterface();
        alert(`Você comprou 1 semente de ${tipo}! Clique em um lote de terra para plantar.`);
    } else {
        alert("Dinheiro insuficiente!");
    }
}

function comprarFertilizante() {
    if (dinheiro >= 11) {
        dinheiro -= 11;
        fertilizantesQuantidade++;
        atualizarInterface();
    } else {
        alert("Dinheiro insuficiente!");
    }
}

function interagirVaso(index) {
    if (vasosBloqueados[index]) {
        if (dinheiro >= 115) {
            dinheiro -= 115;
            vasosBloqueados[index] = false;
            renderizarJardim();
            atualizarInterface();
        } else {
            alert("Você precisa de R$ 115 para expandir este lote.");
        }
        return;
    }

    // Lógica de colheita
    if (vasosDados[index] && vasosDados[index] !== "fertilizado" && vasosDados[index].pronto) {
        dinheiro += vasosDados[index].lucro;
        ecoPoints += vasosDados[index].eco;
        vasosDados[index] = null;
        renderizarJardim();
        atualizarInterface();
        atualizarCidade();
        
        // Muda dica aleatória ao colher
        document.getElementById('dica-texto').innerText = "Dica: " + dicas[Math.floor(Math.random() * dicas.length)];
        return;
    }

    // Aplicar fertilizante se a terra estiver vazia
    if (vasosDados[index] === null && fertilizantesQuantidade > 0) {
        if(confirm("Deseja aplicar fertilizante orgânico neste lote para acelerar a próxima planta?")) {
            fertilizantesQuantidade--;
            vasosDados[index] = "fertilizado";
            renderizarJardim();
            atualizarInterface();
            return;
        }
    }

    // Menu contextualizado simples via prompt para decidir o plantio
    if (vasosDados[index] === null || vasosDados[index] === "fertilizado") {
        let temFertilizante = (vasosDados[index] === "fertilizado");
        let promptTexto = "O que deseja plantar neste lote?\n";
        if(inventarioSementes.girassol > 0) promptTexto += "1 - Girassol 🌻\n";
        if(inventarioSementes.milho > 0) promptTexto += "2 - Milho 🌽\n";
        if(inventarioSementes.árvore > 0) promptTexto += "3 - Árvore Nativa 🌳\n";
        promptTexto += "Digite o número ou cancele.";

        let escolha = prompt(promptTexto);
        if(escolha === "1" && inventarioSementes.girassol > 0) iniciarPlanta(index, 'girassol', 1, 25, '🌻', 20000, temFertilizante);
        else if(escolha === "2" && inventarioSementes.milho > 0) iniciarPlanta(index, 'milho', 5, 33, '🌽', 24000, temFertilizante);
        else if(escolha === "3" && inventarioSementes.árvore > 0) iniciarPlanta(index, 'árvore', 10, 62, '🌳', 35000, temFertilizante);
    }
}

function iniciarPlanta(index, tipo, eco, lucro, icone, tempo, fertilizado) {
    inventarioSementes[tipo]--;
    atualizarInterface();

    let tempoFinal = fertilizado ? Math.max(tempo - 10000, 2000) : tempo;

    vasosDados[index] = { tipo, eco, lucro, icone, pronto: false };
    renderizarJardim();

    let bg = document.getElementById(`barra-bg-${index}`);
    let fill = document.getElementById(`barra-fill-${index}`);
    
    bg.style.display = 'block';
    fill.style.width = '0%';
    
    setTimeout(() => { fill.style.width = '100%'; }, 50);
    fill.style.transition = `width ${tempoFinal}ms linear`;

    setTimeout(() => {
        if (vasosDados[index] && !vasosDados[index].pronto) {
            vasosDados[index].pronto = true;
            bg.style.display = 'none';
            renderizarJardim();
        }
    }, tempoFinal);
}

function atualizarCidade() {
    let smog = document.getElementById('smog');
    let txt = document.getElementById('status-cidade-texto');
    let cenario = document.getElementById('cenario-cidade');
    let pEsq = document.getElementById('p-esq');

    if (ecoPoints < 15) {
        smog.style.background = "rgba(100, 100, 100, 0.65)";
        cenario.style.backgroundColor = "#94a3b8";
        pEsq.innerText = "🏭💨";
        txt.innerText = "A cidade está altamente sufocada pela poluição das indústrias. Plante mais!";
    } else if (ecoPoints >= 15 && ecoPoints < 45) {
        smog.style.background = "rgba(100, 100, 100, 0.3)";
        cenario.style.backgroundColor = "#bae6fd";
        pEsq.innerText = "🏭";
        txt.innerText = "Melhora perceptível! A fumaça diminuiu e o ar está voltando a circular.";
    } else {
        smog.style.background = "rgba(100, 100, 100, 0)";
        cenario.style.backgroundColor = "#38bdf8";
        pEsq.innerText = "🏡🌳";
        txt.innerText = "Incrível! O ecossistema urbano foi restaurado. Céu limpo e sustentabilidade total!";
    }
}

function reiniciarJogo() {
    if(confirm("Deseja apagar o progresso atual e recomeçar do zero?")) {
        dinheiro = 48; ecoPoints = 0; fertilizantesQuantidade = 0;
        inventarioSementes = { girassol: 0, milho: 0, árvore: 0 };
        vasosDados = Array(10).fill(null);
        vasosBloqueados = [false, false, false, false, false, false, true, true, true, true];
        renderizarJardim(); atualizarInterface(); atualizarCidade();
        mudarTela('jardim');
    }
}

// Execução inicial de checagem de saves locais
atualizarListasSaves();