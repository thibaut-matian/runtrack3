let monBouton = document.querySelector("#button");
let monCompteur = document.querySelector("#compteur");
monBouton.addEventListener("click", addone);


function addone(){
   
    let valeurTexte = monCompteur.textContent;
    let valeurNombre = Number(valeurTexte);
    valeurNombre = valeurNombre + 1;
    monCompteur.textContent = valeurNombre;
}