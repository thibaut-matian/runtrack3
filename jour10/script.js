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
