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

  document.addEventListener('DOMContentLoaded', applyLayout);
})();