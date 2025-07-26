const ESTADOS = {
    BA: { nome: "Bahia", processos: 3, cidades: [{ nome: "Salvador", qtd: 3 }] },
    CE: { nome: "Ceará", processos: 5, cidades: [{ nome: "Fortaleza", qtd: 5 }] },
    MT: { nome: "Mato Grosso", processos: 3, cidades: [{ nome: "Cuiabá", qtd: 3 }] },
    PA: { nome: "Pará", processos: 1, cidades: [{ nome: "Belém", qtd: 1 }] },
    PB: { nome: "Paraíba", processos: 1, cidades: [{ nome: "João Pessoa", qtd: 1 }] },
    PR: { nome: "Paraná", processos: 1, cidades: [{ nome: "Curitiba", qtd: 1 }] },
    PI: { nome: "Piauí", processos: 1, cidades: [{ nome: "Teresina", qtd: 1 }] },
    RJ: { nome: "Rio de Janeiro", processos: 5, cidades: [{ nome: "Rio de Janeiro", qtd: 5 }] },
    RN: { nome: "Rio Grande do Norte", processos: 2, cidades: [{ nome: "Natal", qtd: 2 }] },
    SP: { nome: "São Paulo", processos: 578, cidades: [{ nome: "Santos", qtd: 191 }, { nome: "São Vicente", qtd: 32 }, { nome: "Praia Grande", qtd: 8 }, { nome: "Guarujá", qtd: 3 }] }
};

const markers = document.querySelectorAll('.marker');
const estadoNomeEl = document.getElementById('estado-nome');
const procQtdEl = document.getElementById('proc-qtd');
const cidadesListEl = document.getElementById('cidades-list');

let idiomaAtual = "pt";
let estadoSelecionado = null;

markers.forEach(marker => {
    marker.addEventListener('click', () => {
        markers.forEach(m => m.classList.remove('is-active'));
        marker.classList.add('is-active');
        const uf = marker.dataset.uf;
        renderEstado(uf);
    });
});

function renderEstado(uf) {
    const data = ESTADOS[uf];
    if (!data) return;
    estadoSelecionado = uf; // salva o estado clicado
    estadoNomeEl.textContent = data.nome.toUpperCase();
    procQtdEl.textContent = formatProcessos(data.processos, idiomaAtual);
    cidadesListEl.innerHTML = data.cidades.map(c => `
      <li>
        <span class="cidade"><span class="bolinha"></span>${c.nome}</span>
        <span class="quantidade">${c.qtd}</span>
      </li>
    `).join('');
}

function formatProcessos(n, idioma) {
    const t = traducoes[idioma];
    return n + ' ' + (n === 1 ? t.processoSingular : t.processoPlural);
}

const traducoes = {
    pt: {
        presencaEstado: "Presença nos processos do estado de:",
        selecioneNoMapa: "Selecione no mapa",
        quantidadeProcessos: "Quantidade de processos",
        nomeAdvogado: "RODRIGO TRAJANO DOS SANTOS<br>OAB/SP 477765",
        contato: "Contato:",
        email: "Email:",
        servicosTitulo: "Serviços jurídicos",
        servico1: "Direito civil",
        servico2: "Pensão alimentícia",
        servico3: "Direito trabalhista",
        servico4: "Direito Internacional",
        servico5: "Direito Criminal",
        servico6: "Tráfico de Drogas",
        servico7: "Lavagem de Dinheiro",
        servico8: "Estelionato",
        processoSingular: "processo",
        processoPlural: "processos"
    },
    en: {
        presencaEstado: "Presence in legal proceedings of:",
        selecioneNoMapa: "Select on the map",
        quantidadeProcessos: "Number of cases",
        nomeAdvogado: "RODRIGO TRAJANO DOS SANTOS<br>OAB/SP 477765",
        contato: "Contact:",
        email: "Email:",
        servicosTitulo: "Legal Services",
        servico1: "Civil Law",
        servico2: "Child Support",
        servico3: "Labor Law",
        servico4: "International Law",
        servico5: "Criminal Law",
        servico6: "Drug Trafficking",
        servico7: "Money Laundering",
        servico8: "Fraud",
        processoSingular: "case",
        processoPlural: "cases"
    },
    es: {
        presencaEstado: "Presencia en procesos del estado de:",
        selecioneNoMapa: "Seleccione en el mapa",
        quantidadeProcessos: "Cantidad de procesos",
        nomeAdvogado: "RODRIGO TRAJANO DOS SANTOS<br>OAB/SP 477765",
        contato: "Contacto:",
        email: "Correo electrónico:",
        servicosTitulo: "Servicios jurídicos",
        servico1: "Derecho civil",
        servico2: "Pensión alimenticia",
        servico3: "Derecho laboral",
        servico4: "Derecho internacional",
        servico5: "Derecho Penal",
        servico6: "Tráfico de Drogas",
        servico7: "Lavado de Dinero",
        servico8: "Estafa",
        processoSingular: "proceso",
        processoPlural: "procesos"
    }
};

function trocarIdioma(idioma) {
    idiomaAtual = idioma;
    const t = traducoes[idioma];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const chave = el.getAttribute("data-i18n");
        if (t[chave]) {
            el.innerHTML = t[chave];
        }
    });
    // atualiza quantidade de processos se tiver estado selecionado
    if (estadoSelecionado) {
        renderEstado(estadoSelecionado);
    }
}

document.getElementById("btn-pt").addEventListener("click", (e) => {
    e.preventDefault();
    trocarIdioma("pt");
});

document.getElementById("btn-en").addEventListener("click", (e) => {
    e.preventDefault();
    trocarIdioma("en");
});

document.getElementById("btn-es").addEventListener("click", (e) => {
    e.preventDefault();
    trocarIdioma("es");
});
