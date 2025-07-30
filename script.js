const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 5;
}

function updateCarousel() {
  const cards = carousel.querySelectorAll('.card');
  const cardsPerView = getCardsPerView();
  const cardWidth = cards[0].offsetWidth + 20; // 20px de margin

  const offset = currentIndex * cardWidth;
  carousel.style.transform = `translateX(-${offset}px)`;
}

function showNext() {
  const cards = carousel.querySelectorAll('.card');
  const cardsPerView = getCardsPerView();

  if (currentIndex < cards.length - cardsPerView) {
    currentIndex++;
    updateCarousel();
  }
}

function showPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

window.addEventListener('resize', () => {
  currentIndex = 0;
  updateCarousel();
});

// autoplay
setInterval(() => {
  const cards = carousel.querySelectorAll('.card');
  const cardsPerView = getCardsPerView();
  if (currentIndex < cards.length - cardsPerView) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}, 5000); // a cada 5 segundos


const ESTADOS = {
  BA: { nome: "Bahia", processos: 3, cidades: [{ nome: "Salvador", qtd: 3 },] },

  CE: { nome: "Ceará", processos: 5, cidades: [{ nome: "Fortaleza", qtd: 5 }] },

  ES: { nome: "Espírito Santo", processos: 1, cidades: [{ nome: "Nova Venécia", qtd: 1 },] },

  MA: { nome: "Maranhão", processos: 10, cidades: [{ nome: "Ouro Preto", qtd: 1 }, { nome: "São luís", qtd: 4 }, { nome: "Imperatriz", qtd: 2 }, { nome: "Porto Franco", qtd: 3 },] },

  MT: { nome: "Mato Grosso", processos: 3, cidades: [{ nome: "Cuiabá", qtd: 3 }] },

  MG: { nome: "Minas Gerais", processos: 17, cidades: [{ nome: "Guanhães", qtd: 10 }, { nome: "Patrocínio", qtd: 2 }, { nome: "Belo horizonte", qtd: 5 },] },

  PA: { nome: "Pará", processos: 1, cidades: [{ nome: "Belém", qtd: 1 }] },

  PB: { nome: "Paraíba", processos: 1, cidades: [{ nome: "João Pessoa", qtd: 1 }] },

  PR: { nome: "Paraná", processos: 1, cidades: [{ nome: "Curitiba", qtd: 1 }, { nome: "Colombo", qtd: 1 }] },

  PI: { nome: "Piauí", processos: 1, cidades: [{ nome: "Teresina", qtd: 1 }] },

  RJ: { nome: "Rio de Janeiro", processos: 5, cidades: [{ nome: "Rio de Janeiro", qtd: 5 }] },

  RN: { nome: "Rio Grande do Norte", processos: 2, cidades: [{ nome: "Natal", qtd: 2 }] },

  RO: { nome: "Rondonia", processos: 1, cidades: [{ nome: "Porto Velho", qtd: 1 },] },
  
  SC: { nome: "Santa Catarina", processos: 1, cidades: [{ nome: "Rio do Sul", qtd: 1 },] },

  SP: { nome: "São Paulo", processos: 578, cidades: [{ nome: "Santos", qtd: 191 }, { nome: "São Vicente", qtd: 32 }, { nome: "Praia Grande", qtd: 8 }, { nome: "Guarujá", qtd: 3 }, { nome: "Cubatão", qtd: 14 }, { nome: "Bertioga", qtd: 1 }, { nome: "Osasco", qtd: 1 }, { nome: "Santana de parnaíba", qtd: 1 }, { nome: "São José do Rio Preto", qtd: 3 }, { nome: "Paulínea", qtd: 1 }, { nome: "Pindamonhangaba", qtd: 1 }] }
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
    presencaEstado: "Presença no estado:",
    selecioneNoMapa: "",
    quantidadeProcessos: "Quantidade de processos",
    nomeAdvogado: "RODRIGO TRAJANO<br>OAB/SP 477765",
    contato: "Contato:",
    email: "Email:",
    processoSingular: "processo",
    processoPlural: "processos",
    areas: {
      title: "Áreas de Atuação",
      familyLaw: "Direito de Família",
      realEstateLaw: "Direito Imobiliário",
      civilLaw: "Direito Civil",
      healthLaw: "Direito à Saúde",
      laborLaw: "Direito Trabalhista",
      taxLaw: "Direito Tributário",
      criminalLaw: "Direito Criminal",
      businessLaw: "Direito Empresarial",
      environmentalLaw: "Direito Ambiental"
    }
  },
  en: {
    presencaEstado: "Presence in legal proceedings of:",
    selecioneNoMapa: "",
    quantidadeProcessos: "Number of cases",
    nomeAdvogado: "RODRIGO TRAJANO<br>OAB/SP 477765",
    contato: "Contact:",
    email: "Email:",
    processoSingular: "case",
    processoPlural: "cases",
    areas: {
      title: "Areas of Practice",
      familyLaw: "Family Law",
      realEstateLaw: "Real Estate Law",
      civilLaw: "Civil Law",
      healthLaw: "Health Law",
      laborLaw: "Labor Law",
      taxLaw: "Tax Law",
      criminalLaw: "Criminal Law",
      businessLaw: "Business Law",
      environmentalLaw: "Environmental Law"
    }
  },
  es: {
    presencaEstado: "Presencia en estado:",
    selecioneNoMapa: "",
    quantidadeProcessos: "Cantidad de procesos",
    nomeAdvogado: "RODRIGO TRAJANO<br>OAB/SP 477765",
    contato: "Contacto:",
    email: "Correo electrónico:",
    processoSingular: "proceso",
    processoPlural: "procesos",
    areas: {
      title: "Áreas de Práctica",
      familyLaw: "Derecho de Familia",
      realEstateLaw: "Derecho Inmobiliario",
      civilLaw: "Derecho Civil",
      healthLaw: "Derecho a la Salud",
      laborLaw: "Derecho Laboral",
      taxLaw: "Derecho Tributario",
      criminalLaw: "Derecho Penal",
      businessLaw: "Derecho Empresarial",
      environmentalLaw: "Derecho Ambiental"
    }
  }
};


function trocarIdioma(idioma) {
  idiomaAtual = idioma;
  const t = traducoes[idioma];
  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, key) => o && o[key], obj);
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const chave = el.getAttribute("data-i18n");
    const valor = getNestedValue(t, chave);
    if (valor) {
      el.innerHTML = valor;
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