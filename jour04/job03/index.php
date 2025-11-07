<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon !!!!!!!!!!!</title>
</head>
<body>
<form id="triForm" role="search" aria-label="Formulaire de tri">
      <div class="ligne">
        <label for="pokemon-id">id</label>
        <input id="pokemon-id" name="id" type="text" placeholder="Ex: 25">
      </div>

      <div class="ligne">
        <label for="pokemon-nom">nom</label>
        <input id="pokemon-nom" name="nom" type="text" placeholder="Ex: Pikachu">
      </div>

       <div class="ligne">
        <label for="pokemon-type">type</label>
        <select id="pokemon-type" name="type">
          <option value="">-- Tous les types --</option>
          <option value="normal">Normal</option>
          <option value="feu">Feu</option>
          <option value="eau">Eau</option>
          <option value="plante">Plante</option>
          <option value="electrik">Électrik</option>
          <option value="vol">Vol</option>
          <option value="psy">Psy</option>
          <option value="roche">Roche</option>
          <option value="sol">Sol</option>
          <option value="combat">Combat</option>
          <option value="spectre">Spectre</option>
          <option value="glace">Glace</option>
          <option value="dragon">Dragon</option>
        </select>
      </div>

      <div style="text-align:center;margin-top:6px">
        <input id="filtrer" type="button" value="Filtrer" />
      </div>
    </form>

    <div id="resultats-pokemon"></div>
    <script src = "script.js"></script>
</body>
</html>