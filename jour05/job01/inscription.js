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

    // --- LE BLOC "PRO" EST ICI (Juste après les variables) ---
    // Liste de tous les champs à surveiller
    const allInputs = [prenom, nom, email, password, passwordConfirm];

    // Pour chaque champ...
    allInputs.forEach(input => {
        // On écoute l'événement 'input' (quand on tape au clavier)
        input.addEventListener('input', function() {
            // Si le champ a la classe erreur, on l'enlève
            if (this.classList.contains('input-error')) {
                this.classList.remove('input-error');
                // On trouve le span associé via l'ID (ex: id="prenom" -> cherche id="error-prenom")
                const errorSpan = document.getElementById('error-' + this.id);
                if (errorSpan) {
                    errorSpan.textContent = "";
                }
            }
        });
    });
    // --- FIN DU BLOC PRO ---
    
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
            setError(prenom, errorPrenom, "Le prénom est obligatoire.");
        }

        // --- Validation Nom ---
        if (nom.value.trim() === "") {
            isValid = false;
            setError(nom, errorNom, "Le nom est obligatoire.");
        }

        // --- Validation Email ---
        if (email.value.trim() === "") {
            isValid = false;
            setError(email, errorEmail, "L'email est obligatoire.");
        } else if (!isValidEmail(email.value.trim())) {
            isValid = false;
            setError(email, errorEmail, "Le format de l'email est invalide.");        
        }

        // --- Validation Mot de passe ---
        if (password.value === "") {
            isValid = false;
            setError(password, errorPassword, "Le mot de passe est obligatoire.");        
        } else if (password.value.length < 8) {
            isValid = false;
            setError(password, errorPassword, "Le mot de passe doit faire au moins 8 caractères.");
        }

        // --- Validation Confirmation Mot de passe ---
        if (passwordConfirm.value === "") {
            isValid = false;
            setError(passwordConfirm, errorPasswordConfirm, "Veuillez confirmer le mot de passe.");
        } else if (password.value !== passwordConfirm.value) {
            isValid = false;
            setError(passwordConfirm, errorPasswordConfirm, "Les mots de passe ne correspondent pas.");
        }

        // 5. Si tout est valide...
        if (isValid) {
            console.log("Validation (client) réussie ! Prêt à envoyer au serveur.");
            submitRegistration();
        }
    }

    async function submitRegistration() {
        const inscriptionForm = document.getElementById('inscriptionForm');
        const formData = new FormData(inscriptionForm);

        try {
            const response = await fetch('api-inscription.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // C'EST GAGNÉ !
                window.location.href = 'connexion.php';
            } else {
                // Le serveur a renvoyé une erreur
                if (data.error === 'email') {
                    setError(email, errorEmail, data.message);                
                } else {
                    alert(`Erreur: ${data.message}`);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la soumission :', error);
            alert('Une erreur de connexion est survenue. Veuillez réessayer.');
        }
    }

    // --- Fonctions utilitaires ---

    // Affiche un message d'erreur ET ajoute la classe rouge au champ
    function setError(inputElement, errorSpan, message) {
        // 1. On met le texte dans le span (DOM)
        errorSpan.textContent = message;
        
        // 2. On ajoute la classe CSS rouge au champ (DOM)
        inputElement.classList.add('input-error');
    }

    // Vérifie le format de l'email (Regex simple)
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Efface les erreurs visuelles (La fonction qui manquait !)
    function clearErrors() {
        // On vide tous les textes
        errorPrenom.textContent = "";
        errorNom.textContent = "";
        errorEmail.textContent = "";
        errorPassword.textContent = "";
        errorPasswordConfirm.textContent = "";

        // On retire les bordures rouges de TOUS les inputs
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
    }

});