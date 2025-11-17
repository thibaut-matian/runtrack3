(function () {
  // Choisit la feuille de style en fonction de la largeur de la fenêtre
  function pickStylesheet() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    var href = 'style1.css'; // par défaut

    if (w >= 1680 && w <= 1920) {
      href = 'style2.css';
    } else if (w >= 1280 && w < 1680) {
      href = 'style3.css';
    } else if (w < 1280) {
      href = 'style4.css';
    }

    var link = document.getElementById('theme-link');
    if (link && link.getAttribute('href') !== href) {
      link.setAttribute('href', href);
    }
  }

  // debounce simple pour resize
  var resizeTimer = null;
  function onResize() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      pickStylesheet();
      resizeTimer = null;
    }, 120);
  }

  // --- Menu hamburger : comportement en JS ---
  function wireMenuToggle() {
    var btn = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');
    if (!btn || !nav) return;

    // bascule l'affichage du nav et met à jour aria-expanded
    btn.addEventListener('click', function (ev) {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      ev.stopPropagation();
    });

    // clic en dehors : ferme le menu si ouvert
    document.addEventListener('click', function (ev) {
      if (!nav.classList.contains('open')) return;
      if (ev.target === btn || nav.contains(ev.target)) return;
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    // Escape ferme le menu
    window.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // si on agrandit l'écran, fermer le menu pour garder l'état cohérent
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Exécuter au chargement et au redimensionnement
  document.addEventListener('DOMContentLoaded', function () {
    pickStylesheet();
    wireMenuToggle();
  });
  window.addEventListener('resize', onResize);

  // appel initial (au cas où)
  pickStylesheet();
})();
