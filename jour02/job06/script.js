const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const userInput = [];
document.addEventListener("keydown", handleKeyPress);


function handleKeyPress(event) {
    
    // 1. On récupère la touche que l'utilisateur a pressée
    let touche = event.key;
    
    // 2. On récupère la position où l'utilisateur en est
    //    (C'est la longueur actuelle de sa progression)
    //    Au début, userInput.length vaut 0, puis 1, puis 2...
    let index = userInput.length;

    // 3. On compare la touche tapée avec la touche attendue dans le code
    if (touche === konamiCode[index]) {
        // 4A. C'EST LA BONNE TOUCHE !
        
        // On l'ajoute à sa progression
        userInput.push(touche);
        
        // 5. On vérifie s'il vient de taper la DERNIÈRE touche
        if (userInput.length === konamiCode.length) {
            // S'il a réussi, on active l'effet !
            activateKonami();
            
            // (Optionnel) On réinitialise pour qu'il puisse le refaire
            userInput = [];
        }
        
    } else {
        // 4B. C'EST LA MAUVAISE TOUCHE !
        
        // On réinitialise sa progression. Il doit tout recommencer.
        userInput = [];
    }
}

function activateKonami(){
    document.body.classList.add("konami-activated");

    let titre = document.createElement("h1");
    titre.textContent = "KONAMI CODE ACTIV\u00C9!";  
    // titre.innerHTML = "KONAMI CODE ACTIV&Eacute;!";  
    titre.style.textAlign = "center";
    titre.style.fontSize= "5rem";
    document.body.appendChild(titre);
}
