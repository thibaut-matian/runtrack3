document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultUsersInStorage();
    setupLoginForm();
});

async function initializeDefaultUsersInStorage() {
    const existingUsers = localStorage.getItem('users');
    
    if (!existingUsers) {
        try {
            const response = await fetch('js/data.json');
            const usersList = await response.json();
            localStorage.setItem('users', JSON.stringify(usersList));
        } catch (error) {
            console.error("Erreur chargement data.json", error);
        }
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', onLoginFormSubmit);
        setupFleeingButtonEffect();
    }
}

function onLoginFormSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userEmail = emailInput.value.trim();
    const userPassword = passwordInput.value.trim();

    if (!isEmailDomainValid(userEmail)) {
        displayErrorMessage("Seuls les emails @laplateforme.io sont autorisés.");
        return;
    }

    const authenticatedUser = findUserInStorage(userEmail, userPassword);

    if (authenticatedUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        window.location.href = 'dashboard.html';
    } else {
        displayErrorMessage("Email ou mot de passe incorrect.");
    }
}

function isEmailDomainValid(email) {
    return email.endsWith('@laplateforme.io');
}

function findUserInStorage(email, password) {
    const usersJSON = localStorage.getItem('users');
    const usersList = JSON.parse(usersJSON) || [];
    return usersList.find(user => user.email === email && user.password === password);
}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-msg');
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
}

function setupFleeingButtonEffect() {
    const loginBtn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    function areLoginFieldsEmpty() {
        return emailInput.value.trim() === "" || passwordInput.value.trim() === "";
    }

    loginBtn.addEventListener('mouseover', () => {
        if (areLoginFieldsEmpty()) {
            const randomX = Math.random() * 300 - 150;
            const randomY = Math.random() * 300 - 150;
            
            loginBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            loginBtn.classList.replace('bg-blue-600', 'bg-red-500');
            loginBtn.innerText = "Remplis d'abord !";
        }
    });

    const inputs = [emailInput, passwordInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (!areLoginFieldsEmpty()) {
                loginBtn.style.transform = 'translate(0, 0)';
                loginBtn.classList.replace('bg-red-500', 'bg-blue-600');
                loginBtn.innerText = "Se connecter";
            }
        });
    });
}