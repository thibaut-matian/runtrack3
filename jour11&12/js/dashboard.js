let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    redirectUserIfGuest();
    initializeUserInterface();
});

// --- SÉCURITÉ & SESSION ---

function redirectUserIfGuest() {
    const userSession = sessionStorage.getItem('currentUser');
    
    if (!userSession) {
        window.location.href = 'index.html';
    } else {
        currentUser = JSON.parse(userSession);
    }
}

function logoutUser() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// --- INTERFACE UTILISATEUR ---

function initializeUserInterface() {
    displayUserProfile();
    renderMonthCalendar();
    
    // --- AJOUT ICI : On vérifie si on doit afficher le bouton Admin ---
    displayAdminButtonIfAllowed();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
}

function displayUserProfile() {
    if (currentUser) {
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = `${currentUser.prenom} ${currentUser.nom}`;
        
        const userInitialsElement = document.getElementById('user-initials');
        userInitialsElement.textContent = (currentUser.prenom[0] + currentUser.nom[0]).toUpperCase();
    }
}

// --- LOGIQUE DU CALENDRIER ---

function renderMonthCalendar() {
    const calendarContainer = document.getElementById('calendar-grid');
    const daysInCurrentMonth = 30; 
    
    const todayDate = new Date().getDate();

    const allPresences = JSON.parse(localStorage.getItem('presences')) || {};

    calendarContainer.innerHTML = '';

    for (let dayNumber = 1; dayNumber <= daysInCurrentMonth; dayNumber++) {
        const isDateInPast = dayNumber < todayDate;
        
        const dayKey = `day-${dayNumber}`;
        const usersPresentToday = allPresences[dayKey] || [];
        const isUserPresent = usersPresentToday.includes(currentUser.email);

        const dayCard = createDayCardElement(dayNumber, isDateInPast, isUserPresent);
        calendarContainer.appendChild(dayCard);
    }
}

function createDayCardElement(dayNumber, isPast, isPresent) {
    const card = document.createElement('div');
    
    let classList = `
        relative h-24 border border-white/30 rounded-lg p-2 flex flex-col justify-between
        backdrop-blur-sm shadow-sm select-none transition-all
    `;

    if (isPast) {
        classList += ` bg-gray-200/50 opacity-60 cursor-not-allowed`;
    } else {
        classList += ` bg-white/30 hover:bg-white/60 cursor-pointer group`;
    }
    
    if (isPresent) {
        classList += ` ring-2 ring-green-400`;
    }

    card.className = classList;
    
    const indicatorColor = isPresent ? 'bg-green-500' : 'bg-gray-300';

    card.innerHTML = `
        <span class="font-bold text-blue-900">${dayNumber}</span>
        <div class="status-indicator w-3 h-3 rounded-full ${indicatorColor} self-end"></div>
    `;

    if (!isPast) {
        card.addEventListener('click', () => toggleUserAttendance(card, dayNumber));
    }

    return card;
}

function toggleUserAttendance(cardElement, dayNumber) {
    const indicator = cardElement.querySelector('.status-indicator');
    const isCurrentlyPresent = indicator.classList.contains('bg-green-500');

    const todayDate = new Date().getDate();
    if (dayNumber < todayDate) {
        alert("Impossible de modifier une date passée !");
        return;
    }

    if (isCurrentlyPresent) {
        indicator.classList.replace('bg-green-500', 'bg-gray-300');
        cardElement.classList.remove('ring-2', 'ring-green-400');
        savePresenceToStorage(dayNumber, false); 
    } else {
        indicator.classList.replace('bg-gray-300', 'bg-green-500');
        cardElement.classList.add('ring-2', 'ring-green-400');
        savePresenceToStorage(dayNumber, true); 
    }
}

function savePresenceToStorage(day, isPresent) {
    let allPresences = JSON.parse(localStorage.getItem('presences')) || {};
    const dayKey = `day-${day}`;
    let usersPresentToday = allPresences[dayKey] || [];

    if (isPresent) {
        if (!usersPresentToday.includes(currentUser.email)) {
            usersPresentToday.push(currentUser.email);
        }
    } else {
        usersPresentToday = usersPresentToday.filter(email => email !== currentUser.email);
    }

    allPresences[dayKey] = usersPresentToday;
    localStorage.setItem('presences', JSON.stringify(allPresences));
}

// --- AJOUT : FONCTION POUR AFFICHER LE BOUTON ADMIN ---

function displayAdminButtonIfAllowed() {
    // Vérifie si l'utilisateur est admin ou modérateur
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'moderator')) {
        
        const container = document.getElementById('admin-button-container');
        
        // Sécurité : on vérifie que le conteneur existe dans le HTML
        if (container) {
            const btn = document.createElement('a');
            btn.href = 'admin.html'; 
            btn.className = 'btn btn-warning btn-sm mr-2 shadow-lg text-slate-900 font-bold'; 
            
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                Administration
            `;

            container.appendChild(btn);
        }
    }
}