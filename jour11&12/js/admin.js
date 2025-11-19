let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    initializeAdminInterface();
});

// --- SÉCURITÉ ---

function checkAdminAuth() {
    const userSession = sessionStorage.getItem('currentUser');
    
    if (!userSession) {
        window.location.href = 'index.html'; // Pas connecté
        return;
    }
    
    currentUser = JSON.parse(userSession);

    // Si l'utilisateur est un étudiant simple, il n'a rien à faire ici
    if (currentUser.role === 'student') {
        alert("Accès refusé : Réservé au staff.");
        window.location.href = 'dashboard.html';
    }
}

function initializeAdminInterface() {
    // Afficher le badge du rôle
    const roleBadge = document.getElementById('admin-role-badge');
    roleBadge.textContent = currentUser.role.toUpperCase();
    
    // Bouton déconnexion
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Charger les données
    renderPresenceList();

    // Si c'est un ADMIN, on charge aussi la gestion des utilisateurs
    if (currentUser.role === 'admin') {
        document.getElementById('admin-users-section').classList.remove('hidden');
        renderUsersList();
    }
}

// --- GESTION DES PRÉSENCES (Modo & Admin) ---

function renderPresenceList() {
    const tbody = document.getElementById('presence-table-body');
    const presences = JSON.parse(localStorage.getItem('presences')) || {};
    const msgEmpty = document.getElementById('no-presence-msg');
    
    tbody.innerHTML = '';
    let hasData = false;

    // On boucle sur chaque jour (day-1, day-2...)
    // Object.entries transforme l'objet en liste [[cle, valeur], ...]
    Object.entries(presences).forEach(([dayKey, emailList]) => {
        const dayNumber = dayKey.replace('day-', ''); // On garde juste le chiffre
        
        emailList.forEach(email => {
            hasData = true;
            const tr = document.createElement('tr');
            tr.className = "border-b border-white/10 hover:bg-white/5";
            
            tr.innerHTML = `
                <td class="font-bold text-blue-300">Jour ${dayNumber}</td>
                <td>${email}</td>
                <td><span class="badge badge-warning badge-sm">En attente</span></td>
                <td>
                    <button onclick="validatePresence(this)" class="btn btn-success btn-xs text-white">Accepter</button>
                    <button onclick="rejectPresence('${dayKey}', '${email}')" class="btn btn-error btn-xs text-white">Refuser</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });

    if (!hasData) msgEmpty.classList.remove('hidden');
    else msgEmpty.classList.add('hidden');
}

// Actions des boutons (Simulation visuelle pour l'instant)
window.validatePresence = function(btn) {
    // On change juste visuellement pour montrer que ça marche
    const row = btn.closest('tr');
    const badge = row.querySelector('.badge');
    badge.className = "badge badge-success badge-sm";
    badge.textContent = "Validé";
    btn.parentElement.innerHTML = `<span class="text-success text-sm">Confirmé</span>`;
};

window.rejectPresence = function(dayKey, emailToRemove) {
    if(confirm("Refuser cette présence ?")) {
        // 1. Lire la base
        let presences = JSON.parse(localStorage.getItem('presences'));
        
        // 2. Filtrer pour enlever l'email
        presences[dayKey] = presences[dayKey].filter(e => e !== emailToRemove);
        
        // 3. Sauvegarder
        localStorage.setItem('presences', JSON.stringify(presences));
        
        // 4. Rafraîchir l'affichage
        renderPresenceList();
    }
};

// --- GESTION DES UTILISATEURS (Admin Seul) ---

function renderUsersList() {
    const tbody = document.getElementById('users-table-body');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-white/10";
        
        // On ne peut pas se modifier soi-même pour éviter de se bloquer
        const isSelf = user.email === currentUser.email;
        
        let actionButtons = '';
        if (!isSelf) {
            actionButtons = `
                <button onclick="changeUserRole('${user.email}', 'moderator')" class="btn btn-xs btn-info">Mettre Modo</button>
                <button onclick="changeUserRole('${user.email}', 'student')" class="btn btn-xs btn-ghost border-white/20">Mettre Élève</button>
            `;
        } else {
            actionButtons = `<span class="opacity-50 text-xs">C'est vous</span>`;
        }

        tr.innerHTML = `
            <td class="font-bold">${user.prenom} ${user.nom}</td>
            <td class="opacity-70">${user.email}</td>
            <td><span class="badge badge-outline text-white">${user.role}</span></td>
            <td class="flex gap-2">${actionButtons}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.changeUserRole = function(targetEmail, newRole) {
    let users = JSON.parse(localStorage.getItem('users'));
    
    // On trouve l'utilisateur et on change son rôle
    const userIndex = users.findIndex(u => u.email === targetEmail);
    if (userIndex !== -1) {
        users[userIndex].role = newRole;
        localStorage.setItem('users', JSON.stringify(users));
        renderUsersList(); // Rafraîchir
        alert(`Rôle de ${targetEmail} changé en ${newRole}`);
    }
};