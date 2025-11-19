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
        e.preventDefault(); 
        sidebarLinks.forEach(l => l.classList.remove('bg-blue-500', 'text-white'));
        // ajouter sur le cliqué
        link.classList.add('bg-blue-500', 'text-white');
      });
    });
  }

  // --- Spinner : créer / positionner à droite du bouton "Rebooter le Monde" ---
  function ensureInlineSpinner(targetEl) {
    // retire ancien spinner inline s'il existe
    const old = document.getElementById('inlineSpinner');
    if (old) old.remove();

    // trouver cible : si targetEl fourni, on l'affichera juste après, sinon fallback sur le bouton
    const btn = targetEl || document.getElementById('btnRebooter');
    const container = btn ? btn.parentNode : box;
    if (!container) return null;

    const spinner = document.createElement('div');
    spinner.id = 'inlineSpinner';
    Object.assign(spinner.style, {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '3px solid rgba(0,0,0,0.12)',
      borderTop: '3px solid #3b82f6',
      animation: 'spin 1s linear infinite',
      marginLeft: '10px',
      verticalAlign: 'middle',
    });

    if (btn && btn.parentNode) {
      btn.insertAdjacentElement('afterend', spinner);
    } else {
      container.appendChild(spinner);
    }

    return spinner;
  }

  // couleur aléatoire (HSL pour de belles couleurs)
  function randomColor() {
    const h = Math.floor(Math.random() * 360);
    const s = 70; // saturation
    const l = 50; // lightness
    return `hsl(${h} ${s}% ${l}%)`;
  }

  // s'assurer que la keyframes existe (si ce n'est pas déjà fait)
  if (!document.getElementById('spinnerKeyframes')) {
    const style = document.createElement('style');
    style.id = 'spinnerKeyframes';
    style.textContent = `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;
    document.head.appendChild(style);
  }

  // exemple d'utilisation : dans les handlers de submit / miniForm, appeler ensureSpinner(document.getElementById('btnRebooter'))
  // --- Spinner et validation du formulaire ---
  // crée keyframes spin si pas présent
  if (!document.getElementById('spinnerKeyframes')) {
    const style = document.createElement('style');
    style.id = 'spinnerKeyframes';
    style.textContent = `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  // assure la présence d'un spinner dans le jumbotron (box)
  function ensureSpinner() {
    if (!box) return null;
    let spinner = document.getElementById('jumbotronSpinner');
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.id = 'jumbotronSpinner';
      Object.assign(spinner.style, {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '4px solid rgba(0,0,0,0.12)',
        borderTop: '4px solid #3b82f6',
        animation: 'spin 1s linear infinite',
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: '20',
      });
      // s'assurer que le container peut positionner l'élément absolu
      if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
      box.appendChild(spinner);
    }
    return spinner;
  }

  // handler submit du formulaire : change couleur du spinner si email + password non vides
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // on empêche navigation pour voir l'effet
      const emailEl = form.querySelector('input[type="email"]');
      const passEl = form.querySelector('input[type="password"]');
      const email = emailEl ? emailEl.value.trim() : '';
      const pass = passEl ? passEl.value.trim() : '';

      if (email && pass) {
        // placer le spinner à droite du bouton Rebooter
        const spinner = ensureInlineSpinner(document.getElementById('btnRebooter'));
        if (spinner) {
          spinner.style.borderTopColor = randomColor();
        }
        if (box) {
          box.classList.add('animate-pulse');
          setTimeout(() => box.classList.remove('animate-pulse'), 400);
        }
      } else {
        alert('Remplis un email et un mot de passe non vides pour valider.');
      }
    });
  }

  if (miniForm) {
    miniForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = (miniForm.querySelector('input[type="email"]')?.value || '').trim();
      const pass = (miniForm.querySelector('input[type="password"]')?.value || '').trim();
      if (email && pass) {
        // idem : spinner inline à côté du bouton Rebooter
        const spinner = ensureInlineSpinner(document.getElementById('btnRebooter'));
        if (spinner) spinner.style.borderTopColor = randomColor();
        if (box) {
          box.classList.add('animate-pulse');
          setTimeout(() => box.classList.remove('animate-pulse'), 400);
        }
      } else {
        alert('Remplis un email et un mot de passe non vides pour valider.');
      }
    });
  }

});

(function () {
  // sequence clavier D,G,C (insensible à la casse)
  const seq = ['d','g','c'];
  let ptr = 0;

  function resetSeq() { ptr = 0; }

  function showSummaryModal() {
    const form = document.querySelector('form');
    const modalId = 'summaryModal';
    let modal = document.getElementById(modalId);

    // créer/modal si besoin
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      Object.assign(modal.style, {
        position: 'fixed',
        left: '16px',
        bottom: '16px',
        width: '340px',
        maxWidth: 'calc(100% - 32px)',
        background: '#ffffff',
        color: '#111827',
        padding: '12px 14px',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        zIndex: 99999,
        fontSize: '14px',
        lineHeight: '1.35'
      });

      modal.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <strong>Récapitulatif</strong>
          <button id="summaryClose" aria-label="Fermer" style="background:transparent;border:0;font-size:16px;cursor:pointer">✕</button>
        </div>
        <div id="summaryContent" style="max-height:320px;overflow:auto"></div>
      `;
      document.body.appendChild(modal);

      // fermer
      modal.querySelector('#summaryClose').addEventListener('click', () => {
        modal.remove();
      });

      // ESC ferme
      window.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
          const m = document.getElementById(modalId);
          if (m) m.remove();
        }
      });
    }

    const content = modal.querySelector('#summaryContent');

    if (!form) {
      content.innerHTML = `<p style="color:#6b7280">Aucun formulaire trouvé sur la page.</p>`;
      return;
    }

    // Collecte des champs importants (ou tous les inputs)
    const fields = Array.from(form.querySelectorAll('input, textarea, select'))
      .filter(el => el.type !== 'submit' && el.type !== 'button' && el.type !== 'hidden');

    if (fields.length === 0) {
      content.innerHTML = `<p style="color:#6b7280">Aucun champ récupérable.</p>`;
      return;
    }

    const rows = fields.map(el => {
      const name = el.name || el.id || el.placeholder || el.getAttribute('aria-label') || 'champ';
      let value = '';
      if (el.type === 'password') {
        value = el.value ? '•'.repeat(Math.min(8, el.value.length)) : '(vide)';
      } else if (el.type === 'checkbox') {
        value = el.checked ? '✓' : '✗';
      } else if (el.type === 'radio') {
        if (!el.checked) return null; // n'affiche que les radios cochées
        value = el.value || 'sélectionné';
      } else {
        value = el.value ? el.value : '(vide)';
      }
      return `<div style="margin-bottom:8px"><div style="font-weight:600;color:#374151">${escapeHtml(name)}</div><div style="color:#6b7280;word-break:break-word">${escapeHtml(value)}</div></div>`;
    }).filter(Boolean);

    content.innerHTML = rows.join('');
  }

  // petit helper pour échapper le HTML
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ignorer la saisie si on est dans un champ (pour ne pas casser la frappe)
  document.addEventListener('keydown', function (e) {
    const active = document.activeElement;
    const ignoreTags = ['INPUT','TEXTAREA'];
    if (active && (ignoreTags.includes(active.tagName) || active.isContentEditable)) {
      // si l'utilisateur tape dans un champ, on n'intercepte pas la séquence
      return;
    }

    const k = e.key.toLowerCase();
    if (k === seq[ptr]) {
      ptr++;
      if (ptr === seq.length) {
        // séquence complète
        showSummaryModal();
        resetSeq();
      }
    } else {
      // si la touche appuyée est la première de la séquence, on la considère comme nouveau départ
      ptr = (k === seq[0]) ? 1 : 0;
    }
  });
})();
