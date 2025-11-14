document.addEventListener('DOMContentLoaded', function () {
  const etat = document.getElementById('etat');

  function calculPlage(w) {
    if (w >= 1680 && w <= 1920) return '1680–1920px ( #ffca4b )';
    if (w >= 1280 && w < 1680) return '1280–1679px ( #275fa0 )';
    if (w < 1280) return '<1280px ( #ffffff )';
    return 'par défaut ( #88c1d0 )';
  }

  function majEtat() {
    const w = window.innerWidth;
    etat.textContent = `Largeur : ${w}px — plage : ${calculPlage(w)}`;
  }

  // initialisation et mise à jour au redimensionnement
  majEtat();
  window.addEventListener('resize', majEtat);
});