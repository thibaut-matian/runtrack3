document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
});

function handleRegistration(e) {
    e.preventDefault();

    // Récupération des champs
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // --- 1. VALIDATIONS ---

    // Vérification des mots de passe
    if (password !== confirmPassword) {
        showError("Les mots de passe ne correspondent pas.");
        return;
    }

    // Vérification du domaine (Règle du sujet)
    if (!email.endsWith('@laplateforme.io')) {
        showError("Inscription réservée aux emails @laplateforme.io");
        return;
    }

    // Chargement de la base de données actuelle
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Vérification si l'email existe déjà
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        showError("Un compte existe déjà avec cet email.");
        return;
    }

    // --- 2. CRÉATION DU COMPTE ---

    const newUser = {
        id: Date.now(), // ID unique basé sur l'heure
        email: email,
        password: password,
        role: 'student', // Rôle par défaut
        prenom: prenom,
        nom: nom
    };

    // Ajout et Sauvegarde
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // --- 3. SUCCÈS ---
    showSuccess();
    
    // Redirection vers le login après 2 secondes
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showError(msg) {
    const errorDiv = document.getElementById('error-msg');
    const successDiv = document.getElementById('success-msg');
    
    successDiv.classList.add('hidden'); // Cacher succès si erreur
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
}

function showSuccess() {
    const errorDiv = document.getElementById('error-msg');
    const successDiv = document.getElementById('success-msg');

    errorDiv.classList.add('hidden');
    successDiv.classList.remove('hidden');
}