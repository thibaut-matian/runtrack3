// utilise jQuery pour tout
$(function () {
  // images (ordre correct 1→6)
  const images = [
    'assets/img/arc1.png',
    'assets/img/arc2.png',
    'assets/img/arc3.png',
    'assets/img/arc4.png',
    'assets/img/arc5.png',
    'assets/img/arc6.png'
  ];

  // éléments DOM
  const $zonePieces = $('#pieces');      // zone des miniatures mélangées
  const $emplacements = $('.slot');     // emplacements cibles (6)
  const $boutonMelanger = $('#shuffleBtn');
  const $message = $('#message');

  // crée une image draggable avec un id lisible
  function creerImage(numero, src) {
    return $('<img>', {
      src: src,
      id: 'piece-' + numero,
      'data-numero': numero,
      class: 'piece',
      draggable: true
    }).on('dragstart', function (e) {
      e.originalEvent.dataTransfer.setData('text/plain', this.id);
    });
  }

  // affiche les miniatures dans l'ordre donné (tableau de numéros)
  function afficherPiecesOrdre(ordre) {
    $zonePieces.empty();
    ordre.forEach(n => $zonePieces.append(creerImage(n, images[n - 1])));
    enleverMessage();
  }

  // supprime toutes les vignettes actuelles (dans la zone ou dans les emplacements)
  function supprimerToutesLesPieces() {
    $('.piece').remove();
  }

  // mélange simple (Fisher-Yates) et affiche
  function melangerEtAfficher() {
    // enlever toutes les images existantes pour éviter les doublons
    supprimerToutesLesPieces();

    // créer et afficher les images dans un ordre aléatoire
    const ordre = [1, 2, 3, 4, 5, 6];
    for (let i = ordre.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
    }
    afficherPiecesOrdre(ordre);

    // s'assurer que tous les emplacements sont vides (au cas où)
    $emplacements.each(function () {
      $(this).empty();
    });
  }

  // handlers pour les emplacements
  $emplacements.on('dragover', function (e) { e.preventDefault(); $(this).addClass('dragover'); });
  $emplacements.on('dragleave', function () { $(this).removeClass('dragover'); });
  $emplacements.on('drop', function (e) {
    e.preventDefault();
    $(this).removeClass('dragover');
    const id = e.originalEvent.dataTransfer.getData('text/plain');
    const $deplace = $('#' + id);
    if (!$deplace.length) return;
    // si emplacement occupé, remettre l'ancienne image dans la zone des pièces
    if ($(this).children().length) $zonePieces.append($(this).children());
    $(this).append($deplace);
    verifierOrdreSiComplet();
  });

  // permettre de remettre une pièce dans la zone des pièces
  $zonePieces.on('dragover', function (e) { e.preventDefault(); });
  $zonePieces.on('drop', function (e) {
    e.preventDefault();
    const id = e.originalEvent.dataTransfer.getData('text/plain');
    const $deplace = $('#' + id);
    if ($deplace.length) $zonePieces.append($deplace);
    verifierOrdreSiComplet();
  });

  // vérifie l'ordre uniquement si tous les emplacements sont remplis
  function verifierOrdreSiComplet() {
    const tousRemplis = $emplacements.toArray().every(s => $(s).children().length);
    if (!tousRemplis) {
      enleverMessage();
      return;
    }
    const correct = $emplacements.toArray().every((s, idx) => {
      const $img = $(s).children('img');
      return $img.length && String($img.data('numero')) === String(idx + 1);
    });
    if (correct) {
      $message.text('Vous avez gagné').removeClass('lose').addClass('win');
    } else {
      $message.text('Vous avez perdu').removeClass('win').addClass('lose');
    }
  }

  function enleverMessage() {
    $message.text('').removeClass('win lose');
  }

  // actions
  $boutonMelanger.on('click', melangerEtAfficher);

  // initialisation : afficher dans l'ordre d'origine
  afficherPiecesOrdre([1, 2, 3, 4, 5, 6]);
});