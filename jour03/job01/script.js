
// équivalent de "DOMContentLoaded" 
$(document).ready(function() {

    // --- Logique pour le bouton "Afficher" ---
    
    //  On sélectionne le bouton qui a l'ID "afficher"
    //  On lui attache un écouteur d'événement "click"
    $("#afficher").on("click", function() {
        $("#texte").show();
    });
     // --- Logique pour le bouton "Cacher" ---
    
    //  On sélectionne le bouton qui a l'ID "cacher"
    //  On lui attache un écouteur "click"
    $("#cacher").on("click", function() {
        $("#texte").hide();
    });

});