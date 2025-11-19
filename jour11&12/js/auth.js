document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Fonction pour charger le JSON dans le LocalStorage si vide
async function initDatabase() {
    if (!localStorage.getItem('users')) {
        try {
            // On va chercher le fichier JSON
            const response = await fetch('js/data.json'); 
            const users = await response.json();
            
            // On sauvegarde dans le navigateur (en texte)
            localStorage.setItem('users', JSON.stringify(users));
            console.log("Base de données initialisée avec succès !");
        } catch (error) {
            console.error("Erreur lors du chargement du JSON :", error);
        }
    }
}

// Fonction de gestion du Login
function handleLogin(e) {
    e.preventDefault(); // Empêche la page de se recharger

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // 1. Vérification basique du domaine (demandé dans le sujet pour l'inscription)
    if (!isValidDomain(emailInput)) {
        showError("Seuls les emails @laplateforme.io sont autorisés.");
        return;
    }

    // 2. Récupération des utilisateurs depuis le LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 3. Recherche de l'utilisateur
    const user = users.find(u => u.email === emailInput && u.password === passwordInput);

    if (user) {
        // Connexion réussie !
        // On stocke l'utilisateur connecté en session (se perd si on ferme le navigateur)
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirection selon le rôle (à créer plus tard)
        alert(`Bienvenue ${user.prenom} ! Vous êtes connecté en tant que ${user.role}.`);
        
        // Exemple de redirection future :
        // if(user.role === 'admin') window.location.href = 'admin.html';
        // else window.location.href = 'calendrier.html';
    } else {
        showError("Email ou mot de passe incorrect.");
    }
}

// Vérifie si l'email finit par @laplateforme.io
function isValidDomain(email) {
    return email.endsWith('@laplateforme.io');
}

// Affiche l'erreur dans la div prévue
function showError(message) {
    const errorDiv = document.getElementById('error-msg');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}




// --- LOGIQUE DU BOUTON FUYARD ---
const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


function areFieldsEmpty() {
    return emailInput.value.trim() === "" || passwordInput.value.trim() === "";
}

loginBtn.addEventListener('mouseover', () => {
    // Si les champs sont vides, le bouton s'enfuit
    if (areFieldsEmpty()) {
        // On calcule un déplacement aléatoire entre -150px et +150px
        // Tu peux augmenter ces valeurs si tu veux qu'il parte plus loin
        const x = Math.random() * 300 - 150; 
        const y = Math.random() * 300 - 150;
        
        // On applique le style directement
        loginBtn.style.transform = `translate(${x}px, ${y}px)`;
        
        // Petit changement de couleur pour narguer (optionnel)
        loginBtn.classList.replace('bg-blue-600', 'bg-red-500');
        loginBtn.innerText = "Remplis d'abord !";
    }
});

// Remettre le bouton en place quand l'utilisateur commence à écrire
[emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!areFieldsEmpty()) {
            // On remet le bouton à sa place d'origine (0,0)
            loginBtn.style.transform = 'translate(0, 0)';
            
            // On remet la couleur et le texte d'origine
            loginBtn.classList.replace('bg-red-500', 'bg-blue-600');
            loginBtn.innerText = "Se connecter";
        }
    });
});