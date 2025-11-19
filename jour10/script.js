// Modal papillon simple
const btnPapillon = document.getElementById('btnAcheterPapillon');
const modalPapillon = document.getElementById('modalPapillon');
const btnFermerPapillon = document.getElementById('fermerModalePapillon');

let lastFocus = null;

function ouvrirModalPapillon() {
  lastFocus = document.activeElement;
  modalPapillon.classList.remove('hidden');
  modalPapillon.classList.add('flex');
  modalPapillon.setAttribute('aria-hidden', 'false');
  // focaliser premier bouton d'action
  const btnConfirmer = modalPapillon.querySelector('.btn-success');
  if (btnConfirmer) btnConfirmer.focus();
}

function fermerModalPapillon() {
  modalPapillon.classList.add('hidden');
  modalPapillon.classList.remove('flex');
  modalPapillon.setAttribute('aria-hidden', 'true');
  if (lastFocus) lastFocus.focus();
}

function clicFond(e) {
  if (e.target === modalPapillon) {
    fermerModalPapillon();
  }
}

function escFermer(e) {
  if (e.key === 'Escape' && !modalPapillon.classList.contains('hidden')) {
    fermerModalPapillon();
  }
}

btnPapillon?.addEventListener('click', ouvrirModalPapillon);
btnFermerPapillon?.addEventListener('click', fermerModalPapillon);
modalPapillon?.addEventListener('click', clicFond);
document.addEventListener('keydown', escFermer);

const quotes = [
  { text: "Je deviendrai le Roi des Pirates !", author: "Luffy" },
  { text: "Je ne perdrai plus jamais !", author: "Zoro" },
  { text: "Je veux vivre !", author: "Nico Robin" },
  { text: "Ce chapeau de paille est mon trésor.", author: "Luffy" },
  { text: "Les rêves des hommes ne finissent jamais.", author: "Barbe Noire" },
  { text: "Je protégerai mes amis, quoi qu'il arrive.", author: "Luffy" },
  { text: "Un cuistot protège ce qu'il aime.", author: "Sanji" },
  { text: "Je suis un médecin !", author: "Chopper" },
  { text: "Je veux cartographier le monde entier.", author: "Nami" },
  { text: "Je n'abandonnerai jamais mes nakamas.", author: "Luffy" },
  { text: "La musique peut sauver un cœur.", author: "Brook" },
  { text: "Je suivrai mon cap, coûte que coûte.", author: "Luffy" }
];

const btn = document.getElementById('btnRebooter');
const box = document.getElementById('jumbotronText');
let lastIndex = -1;
let isAnimating = false;

// Sauvegarde du contenu initial pour le restaurer plus tard
const baseHTML = box ? box.innerHTML : '';

// Assure l'effet de fade si les classes ne sont pas déjà présentes dans le HTML
if (box) {
  box.classList.add('transition-opacity', 'duration-300', 'ease-in-out', 'opacity-100');
}

function getNextIndex(prevIndex, max) {
  if (!Number.isFinite(max) || max <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * max);
  } while (next === prevIndex);
  return next;
}

function renderQuote(quote) {
  if (!box) return;
  box.innerHTML = `
    <p class="text-gray-600 mb-4 leading-relaxed">“${quote.text}”</p>
    <hr class="border-t border-gray-300 my-6">
    <p class="text-sm italic text-gray-600">— ${quote.author}, One Piece</p>
  `;
}

function showRandomQuote() {
  if (!box || isAnimating) return;
  isAnimating = true;

  box.classList.add('opacity-0');

  setTimeout(() => {
    const next = getNextIndex(lastIndex, quotes.length);
    lastIndex = next;

    
    renderQuote(quotes[next]);

    box.classList.remove('opacity-0');

    setTimeout(() => { isAnimating = false; }, 300);
  }, 300);
}

function showBaseText() {
  if (!box || isAnimating) return;
  isAnimating = true;

  box.classList.add('opacity-0');

  setTimeout(() => {
    box.innerHTML = baseHTML;
    box.classList.remove('opacity-0');
    setTimeout(() => { isAnimating = false; }, 300);
  }, 300);
}

// Clics
btn?.addEventListener('click', showRandomQuote);
document.getElementById('btnReset')?.addEventListener('click', showBaseText);

// Pagination -> change le contenu du jumbotron selon la page sélectionnée
// contenu au choix pour chaque "page" (4 éléments pour 4 radios)
const pages = [
  {
    title: "Découverte",
    paragraphs: [
      "Explorez les mystères du monde : paysages, cultures et histoires.",
      "Chaque découverte élargit notre compréhension et nourrit la curiosité."
    ],
    footer: "— Exploration, 2025"
  },
  {
    title: "Science",
    paragraphs: [
      "La science nous offre des méthodes pour tester nos idées et expliquer des phénomènes.",
      "Elle se construit par observation, mesure et réplication."
    ],
    footer: "— Institut des Sciences"
  },
  {
    title: "Art & Culture",
    paragraphs: [
      "L'art reflète nos sociétés et nos émotions à travers des formes variées.",
      "Musique, peinture, littérature : autant de portes vers l'imaginaire."
    ],
    footer: "— Conservatoire Culturel"
  },
  {
    title: "Technologie",
    paragraphs: [
      "La technologie transforme nos usages et crée de nouvelles opportunités.",
      "Elle demande responsabilité et éthique pour servir le bien commun."
    ],
    footer: "— Lab Innov"
  }
];

function renderPageContent(page) {
  if (!box) return;
  const paras = page.paragraphs.map(p => `<p class="text-gray-600 mb-4 leading-relaxed">${p}</p>`).join("\n");
  box.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">${page.title}</h3>
    ${paras}
    <hr class="border-t border-gray-300 my-6">
    <p class="text-sm italic text-gray-600">${page.footer}</p>
  `;
}


const paginationRadios = document.querySelectorAll('input[name="options"]');
if (paginationRadios.length) {
  paginationRadios.forEach((radio, i) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        renderPageContent(pages[i] || pages[0]);
      }
    });
  });

  const checked = Array.from(paginationRadios).findIndex(r => r.checked);
  if (checked >= 0) renderPageContent(pages[checked]);
}

document.addEventListener('DOMContentLoaded', function () {
  // --- indicateur actif pour la pagination (join radios) ---
  const pageRadios = document.querySelectorAll('input[name="options"]');
  function updatePaginationActive() {
    pageRadios.forEach(r => {
      if (r.checked) r.classList.add('btn-active');
      else r.classList.remove('btn-active');
    });
  }
  if (pageRadios.length) {
    updatePaginationActive();
    pageRadios.forEach(r => r.addEventListener('change', updatePaginationActive));
  }

  // --- active state pour la sidebar (links) ---
  const sidebarLinks = document.querySelectorAll('aside .menu a.sidebar-link');
  if (sidebarLinks.length) {
    // si aucun style actif présent, s'assurer que le premier soit marqué
    if (!Array.from(sidebarLinks).some(a => a.classList.contains('bg-blue-500'))) {
      sidebarLinks[0].classList.add('bg-blue-500', 'text-white');
    }

    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // éviter la navigation pour voir l'état actif
        // retirer les classes actives de tous
        sidebarLinks.forEach(l => l.classList.remove('bg-blue-500', 'text-white'));
        // ajouter sur le cliqué
        link.classList.add('bg-blue-500', 'text-white');
      });
    });
  }
});
