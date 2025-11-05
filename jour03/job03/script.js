// jQuery required
$(function () {
  const SIZE = 3;
  const TILE = 100;            // taille d'une case en px
  const PUZZLE_SIZE = SIZE * TILE;
  const $puzzle = $('#puzzle');
  const $message = $('#message');
  const $restart = $('#restart');

  const images = [
    'assets/img/1.png',
    'assets/img/2.png',
    'assets/img/3.png',
    'assets/img/4.png',
    'assets/img/5.png',
    'assets/img/6.png',
    'assets/img/7.png',
    'assets/img/8.png',
    'assets/img/9.png'
  ];

  // position courante : array d'entiers 1..8 et 0 pour vide (indices 0..8)
  let positions = [1,2,3,4,5,6,7,8,0];
  let gameOver = false;

  // crée les tiles depuis la position courante
  function render() {
    $puzzle.empty();
    positions.forEach((val, idx) => {
      if (val === 0) return; // case vide
      const row = Math.floor(idx / SIZE);
      const col = idx % SIZE;

      const $tuile = $('<div>')
        .addClass('tile')
        .attr('data-pos', idx)     // index courant dans la grille
        .attr('data-val', val)     // quelle pièce (1..8)
        .css({
          left: col * TILE + 'px',
          top: row * TILE + 'px',
          'background-image': 'url(' + images[val - 1] + ')',
          'background-size': TILE + 'px ' + TILE + 'px' // chaque image est une pièce
        });

      $puzzle.append($tuile);
    });
  }

  // retourne index voisins (up/down/left/right) valides d'un index
  function voisins(index) {
    const res = [];
    const r = Math.floor(index / SIZE), c = index % SIZE;
    if (r > 0) res.push(index - SIZE);
    if (r < SIZE - 1) res.push(index + SIZE);
    if (c > 0) res.push(index - 1);
    if (c < SIZE - 1) res.push(index + 1);
    return res;
  }

  // échange tile à i avec case vide j
  function echanger(i, j) {
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // vérifie victoire
  function verifierVictoire() {
    const gagne = positions.slice(0,8).every((v,i) => v === i+1);
    if (gagne) {
      gameOver = true;
      $message.text('Vous avez gagné').removeClass('lose').addClass('win');
    }
    return gagne;
  }

  // rend des mouvements aléatoires depuis l'état résolu (assure solvable)
  function melanger(nb = 200) {
    positions = [1,2,3,4,5,6,7,8,0];
    let vide = 8;
    for (let k = 0; k < nb; k++) {
      const nbs = voisins(vide);
      const choix = nbs[Math.floor(Math.random() * nbs.length)];
      echanger(vide, choix);
      vide = choix;
    }
    gameOver = false;
    $message.text('').removeClass('win lose');
    render();
  }

  // clique sur une tile -> se déplace si case vide adjacente
  $puzzle.on('click', '.tile', function () {
    if (gameOver) return;
    const $t = $(this);
    const pos = Number($t.attr('data-pos'));
    const videIndex = positions.indexOf(0);
    if (voisins(pos).includes(videIndex)) {
      // échanger dans positions
      echanger(pos, videIndex);
      render();             // rerender simple
      verifierVictoire();
    }
  });

  // Recommencer
  $restart.on('click', function () {
    melanger(200);
  });

  // initialisation
  melanger(200);

});