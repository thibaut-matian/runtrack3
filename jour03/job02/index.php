<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Arc-en-ciel (jQuery)</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <main>
    <h1>Reconstituez l'arc‑en‑ciel</h1>
    <button id="shuffleBtn">Mélanger</button>

    <section id="pieces" class="zone" aria-label="Pièces"></section>

    <section id="slots" class="zone slots" aria-label="Emplacements">
      <div class="slot" data-index="1"></div>
      <div class="slot" data-index="2"></div>
      <div class="slot" data-index="3"></div>
      <div class="slot" data-index="4"></div>
      <div class="slot" data-index="5"></div>
      <div class="slot" data-index="6"></div>
    </section>

    <div id="message" aria-live="polite"></div>
  </main>

  <script src="script.js"></script>
</body>
</html>