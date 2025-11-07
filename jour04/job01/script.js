document.addEventListener('DOMContentLoaded', () => {

    const bouton = document.getElementById('button');

    //  Écouter le clic sur le bouton
    bouton.addEventListener('click', () => {
        
        //  Lancer la requête Fetch
        fetch('expression.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Le fichier n\'a pas pu être chargé.');
                }
                //  Converti la réponse en texte
                return response.text();
            })
            .then(texte => {
                const paragraphe = document.createElement('p');
                paragraphe.textContent = texte;
                document.body.appendChild(paragraphe);
            })
            .catch(erreur => {
                //  Gérer les erreurs (ex: fichier non trouvé)
                console.error('Il y a eu un problème avec le fetch :', erreur);
            });
    });
});