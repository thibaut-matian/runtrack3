// On attend que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {

    // 1. On récupère les éléments du formulaire
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    // On récupère les champs (inputs)
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password_confirm');
    const showPasswordToggle = document.getElementById('showPasswordToggle');
    
    // On récupère les spans pour les messages d'erreur
    const errorPrenom = document.getElementById('error-prenom');
    const errorNom = document.getElementById('error-nom');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorPasswordConfirm = document.getElementById('error-password_confirm');
    
    // 2. On attache un écouteur d'événement "submit" au formulaire
    showPasswordToggle.addEventListener('change', function() {
            const isChecked = this.checked;
    
            if (isChecked) {
                password.type = 'text';
                passwordConfirm.type = 'text';
            } else {
                password.type = 'password';
                passwordConfirm.type = 'password';
            }
        });
    inscriptionForm.addEventListener("submit", function(event) {
        
        // 3. On empêche le rechargement de la page
        event.preventDefault(); 
        
        // On lance la fonction de validation
        validateForm();
    });

    // 4. La fonction de validation principale
    function validateForm() {
        
        // On réinitialise tous les messages d'erreur
        clearErrors();

        let isValid = true; // Un drapeau pour suivre si tout est correct

        // --- Validation Prénom ---
        if (prenom.value.trim() === "") {
            isValid = false;
            setError(errorPrenom, "Le prénom est obligatoire.");
        }

        // --- Validation Nom ---
        if (nom.value.trim() === "") {
            isValid = false;
            setError(errorNom, "Le nom est obligatoire.");
        }

        // --- Validation Email ---
        if (email.value.trim() === "") {
            isValid = false;
            setError(errorEmail, "L'email est obligatoire.");
        } else if (!isValidEmail(email.value.trim())) {
            isValid = false;
            setError(errorEmail, "Le format de l'email est invalide.");
        }

        // --- Validation Mot de passe ---
        if (password.value === "") {
            isValid = false;
            setError(errorPassword, "Le mot de passe est obligatoire.");
        } else if (password.value.length < 8) {
            isValid = false;
            setError(errorPassword, "Le mot de passe doit faire au moins 8 caractères.");
            // (On pourrait ajouter plus de règles : majuscule, chiffre, etc.)
        }

        // --- Validation Confirmation Mot de passe ---
        if (passwordConfirm.value === "") {
            isValid = false;
            setError(errorPasswordConfirm, "Veuillez confirmer le mot de passe.");
        } else if (password.value !== passwordConfirm.value) {
            isValid = false;
            setError(errorPasswordConfirm, "Les mots de passe ne correspondent pas.");
        }

        // 5. Si tout est valide...
        if (isValid) {
            // Pour l'instant, on affiche juste un message dans la console
            // C'est ICI qu'on appellera le serveur (Étape suivante)
            console.log("Validation (client) réussie ! Prêt à envoyer au serveur.");
            
            submitRegistration();
        }
    }

    async function submitRegistration() {
        // On récupère le formulaire lui-même
        const inscriptionForm = document.getElementById('inscriptionForm');
        // On crée un objet FormData à partir du formulaire
        const formData = new FormData(inscriptionForm);

        try {
            // 1. On appelle l'API en 'POST' avec les données du formulaire
            const response = await fetch('api-inscription.php', {
                method: 'POST',
                body: formData
            });

            // 2. On attend la réponse et on la décode (JSON)
            const data = await response.json();

            // 3. On analyse la réponse du serveur
            if (data.success) {
                // C'EST GAGNÉ !
                // On redirige vers la page de connexion
                window.location.href = 'connexion.php';
                
            } else {
                // Le serveur a renvoyé une erreur
                if (data.error === 'email') {
                    // Erreur spécifique à l'email (ex: déjà pris)
                    setError(errorEmail, data.message);
                } else {
                    // Autre erreur (ex: validation, serveur...)
                    // On pourrait l'afficher en haut du formulaire
                    alert(`Erreur: ${data.message}`);
                }
            }
        } catch (error) {
            // Erreur de réseau, ou PHP qui plante (erreur 500)
            console.error('Erreur lors de la soumission :', error);
            alert('Une erreur de connexion est survenue. Veuillez réessayer.');
        }
    }

    // --- Fonctions utilitaires ---

    // Affiche un message d'erreur pour un champ
    function setError(errorElement, message) {
        errorElement.textContent = message;
    }

    // Efface tous les messages d'erreur
    function clearErrors() {
        errorPrenom.textContent = "";
        errorNom.textContent = "";
        errorEmail.textContent = "";
        errorPassword.textContent = "";
        errorPasswordConfirm.textContent = "";
    }

    // Vérifie le format de l'email (Regex simple)
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

});
