// On attend que TOUT le HTML soit chargé avant d'exécuter le JS
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Maintenant, on peut sélectionner le textarea sans risque
    let textArea = document.getElementById("keylogger");

    // 2. On définit la fonction qui sera appelée
    function logKey(event) {
        let touche = event.key;

        // 3. On vérifie (avec .match() !) si c'est une lettre
        // if (touche.match(/^[a-zA-Z]$/)) {
        //Regex Unicode
        if (touche.match(/^\p{L}$/u)) {
        textArea.value += touche;
    }
    }

    // 5. On attache l'écouteur global au document
    document.addEventListener("keydown", logKey);

});