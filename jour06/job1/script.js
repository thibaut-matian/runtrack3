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

  // Exécuter au chargement et au redimensionnement
  window.addEventListener('DOMContentLoaded', pickStylesheet);
  window.addEventListener('resize', pickStylesheet);

  // appel initial (au cas où)
  pickStylesheet();
})();
