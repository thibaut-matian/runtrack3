document.addEventListener('DOMContentLoaded', () => {
  const boutonFiltrer = document.getElementById('filtrer');
  const inputId = document.getElementById('pokemon-id');
  const inputNom = document.getElementById('pokemon-nom');
  const selectType = document.getElementById('pokemon-type');
  const zoneResultats = document.getElementById('resultats-pokemon');

  // carte simple pour passer des valeurs françaises du select au format du JSON si besoin
  const typeMap = {
    '': '',
    'normal': 'Normal',
    'feu': 'Fire',
    'eau': 'Water',
    'plante': 'Grass',
    'electrik': 'Electric',
    'vol': 'Flying',
    'psy': 'Psychic',
    'roche': 'Rock',
    'sol': 'Ground',
    'combat': 'Fighting',
    'spectre': 'Ghost',
    'glace': 'Ice',
    'dragon': 'Dragon'
  };

  boutonFiltrer.addEventListener('click', () => {
    const filtreId = inputId.value.trim();
    const filtreNom = inputNom.value.trim().toLowerCase();
    const filtreType = typeMap[selectType.value.trim().toLowerCase()] || '';

    fetch('pokemon.json')
      .then(resp => {
        if (!resp.ok) throw new Error('Échec du chargement du fichier pokemon.json');
        return resp.json();
      })
      .then(data => {
        // data doit être un tableau d'objets
        const resultats = data.filter(p => {
          // id : si champ vide => ok, sinon comparaison numérique stricte
          if (filtreId) {
            if (Number(p.id) !== Number(filtreId)) return false;
          }

          // nom : vérifie french et english, recherche partielle insensible à la casse
          if (filtreNom) {
            const nomFr = p.name && p.name.french ? String(p.name.french).toLowerCase() : '';
            const nomEn = p.name && p.name.english ? String(p.name.english).toLowerCase() : '';
            if (!nomFr.includes(filtreNom) && !nomEn.includes(filtreNom)) return false;
          }

          // type : si vide => ok, sinon vérifier que le tableau p.type contient le type
          if (filtreType) {
            const types = Array.isArray(p.type) ? p.type.map(t => String(t).toLowerCase()) : [String(p.type).toLowerCase()];
            if (!types.includes(filtreType.toLowerCase())) return false;
          }

          return true;
        });

        afficherResultats(resultats);
      })
      .catch(err => {
        console.error(err);
        zoneResultats.innerHTML = `<p style="color:red">Erreur : impossible de charger les données.</p>`;
      });
  });

  function afficherResultats(pokemons) {
    zoneResultats.innerHTML = '';
    if (!pokemons || pokemons.length === 0) {
      zoneResultats.innerHTML = '<p>Aucun Pokémon trouvé.</p>';
      return;
    }

    const ul = document.createElement('ul');
    pokemons.forEach(p => {
      const li = document.createElement('li');
      const nom = (p.name && (p.name.french || p.name.english)) || 'Nom inconnu';
      const types = Array.isArray(p.type) ? p.type.join(' / ') : p.type;
      li.textContent = `#${p.id} - ${nom} (Type: ${types})`;
      ul.appendChild(li);
    });
    zoneResultats.appendChild(ul);
  }
});