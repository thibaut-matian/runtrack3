document.addEventListener("DOMContentLoaded", function() {

    const connexionForm = document.getElementById('connexionForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const showPasswordToggle = document.getElementById('showPasswordToggle');

    // Spans d'erreur
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');

    // 2. Écouter la soumission du formulaire
    connexionForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        validateAndLogin();
    });

    // 3. Fonction de validation et de connexion
    async function validateAndLogin() {
        // Réinitialiser les messages d'erreur
        errorEmail.textContent = "";
        errorPassword.textContent = "";

        let isValid = true;

        // Validation (simple, juste non-vide)
        if (email.value.trim() === "") {
            isValid = false;
            errorEmail.textContent = "L'email est requis.";
        }
        if (password.value === "") {
            isValid = false;
            errorPassword.textContent = "Le mot de passe est requis.";
        }

        // 4. Si la validation "client" est OK, on contacte le serveur
        if (isValid) {
            const formData = new FormData(connexionForm);
            
            try {
                // On appelle la future API de connexion
                const response = await fetch('api-connexion.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                // 5. Analyser la réponse du serveur
                if (data.success) {
                    // C'EST GAGNÉ !
                    // On redirige vers la page d'accueil
                    window.location.href = 'index.php';
                } else {
                    // Échec (ex: "Email ou mot de passe incorrect")
                    // On affiche l'erreur sous le champ du mot de passe
                    errorPassword.textContent = data.message;
                }

            } catch (error) {
                console.error('Erreur:', error);
                errorPassword.textContent = "Une erreur de connexion est survenue.";
            }
        }
    }

    // 6. Gestion du "Afficher le mot de passe"
    showPasswordToggle.addEventListener('change', function() {
        const isChecked = this.checked;
        password.type = isChecked ? 'text' : 'password';
    });

});