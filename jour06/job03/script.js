// JS : contrôle la classe de layout selon la largeur (exercice JS)
(function () {
  const board = document.getElementById('board');
  const info = document.getElementById('info');

  function applyLayout() {
    const w = window.innerWidth;
    // retire toutes les classes de layout
    board.classList.remove('layout-large','layout-medium','layout-small');

    let label = 'par défaut';
    if (w >= 1600) {
      board.classList.add('layout-large');
      label = '>= 1600px (ligne de 4)';
    } else if (w >= 768) {
      board.classList.add('layout-medium');
      label = '768px – 1599px (grille 2×2)';
    } else {
      board.classList.add('layout-small');
      label = '<= 767px (colonne)';
    }

    info.textContent = `Largeur : ${w}px — disposition : ${label}`;
  }

  // initialisation et gestion du redimensionnement (debounce simple)
  let to = null;
  window.addEventListener('resize', () => {
    if (to) clearTimeout(to);
    to = setTimeout(() => { applyLayout(); to = null; }, 100);
  });

  document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('mobile-burger');
    const menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    // toggle menu
    burger.addEventListener('click', function (ev) {
      // toggle 'hidden' utilitaire Tailwind/DaisyUI
      const isNowHidden = menu.classList.toggle('hidden');
      const isOpen = !menu.classList.contains('hidden');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      ev.stopPropagation();
    });

    // fermer quand on clique sur un lien du menu
    menu.addEventListener('click', function (ev) {
      const a = ev.target.closest('a');
      if (a) {
        menu.classList.add('hidden');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // clic en dehors -> fermer
    document.addEventListener('click', function (ev) {
      if (menu.classList.contains('hidden')) return;
      if (ev.target.closest('.dropdown')) return; // clic dans le menu/bouton => ne pas fermer
      menu.classList.add('hidden');
      burger.setAttribute('aria-expanded', 'false');
    });

    // Échap ferme le menu
    window.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // optionnel : au resize large, s'assurer que menu mobile est masqué
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', applyLayout);
})();