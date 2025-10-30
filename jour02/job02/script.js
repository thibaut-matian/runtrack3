let monBouton = document.querySelector("button"); // on pourrait utiliser getElementById mais ne cherche qu un id alors que querySelector est un couteau suisse, il prends tout 


function showhide(){
    let articleExistant = document.querySelector("#citation");
        if (articleExistant === null){
            let nouvelArticle = document.createElement("artcile");
            nouvelArticle.id = "citation";
            nouvelArticle.textContent = " Un homme meurt quand on l'oubli";
            monBouton.after(nouvelArticle);
        }else{
            articleExistant.remove();
        }
}

monBouton.addEventListener("click", showhide);
