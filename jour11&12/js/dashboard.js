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
    
    // Date du jour pour gérer le passé/futur
    const todayDate = new Date().getDate();

    // 1. On récupère TOUTES les présences stockées
    const allPresences = JSON.parse(localStorage.getItem('presences')) || {};

    calendarContainer.innerHTML = '';

    for (let dayNumber = 1; dayNumber <= daysInCurrentMonth; dayNumber++) {
        const isDateInPast = dayNumber < todayDate;
        
        // 2. On vérifie si l'utilisateur actuel est présent ce jour-là
        const dayKey = `day-${dayNumber}`;
        const usersPresentToday = allPresences[dayKey] || [];
        const isUserPresent = usersPresentToday.includes(currentUser.email);

        // On crée la carte avec ces infos
        const dayCard = createDayCardElement(dayNumber, isDateInPast, isUserPresent);
        calendarContainer.appendChild(dayCard);
    }
}

function createDayCardElement(dayNumber, isPast, isPresent) {
    const card = document.createElement('div');
    
    // Styles de base
    let classList = `
        relative h-24 border border-white/30 rounded-lg p-2 flex flex-col justify-between
        backdrop-blur-sm shadow-sm select-none transition-all
    `;

    // Styles conditionnels (Passé vs Futur)
    if (isPast) {
        classList += ` bg-gray-200/50 opacity-60 cursor-not-allowed`;
    } else {
        classList += ` bg-white/30 hover:bg-white/60 cursor-pointer group`;
    }
    
    // Styles conditionnels (Présent vs Absent)
    // Si présent, on ajoute le bord vert (ring)
    if (isPresent) {
        classList += ` ring-2 ring-green-400`;
    }

    card.className = classList;
    
    // Couleur de la pastille
    const indicatorColor = isPresent ? 'bg-green-500' : 'bg-gray-300';

    card.innerHTML = `
        <span class="font-bold text-blue-900">${dayNumber}</span>
        <div class="status-indicator w-3 h-3 rounded-full ${indicatorColor} self-end"></div>
    `;

    // Interaction (seulement si date future)
    if (!isPast) {
        card.addEventListener('click', () => toggleUserAttendance(card, dayNumber));
    }

    return card;
}

function toggleUserAttendance(cardElement, dayNumber) {
    const indicator = cardElement.querySelector('.status-indicator');
    const isCurrentlyPresent = indicator.classList.contains('bg-green-500');

    // Double sécurité date
    const todayDate = new Date().getDate();
    if (dayNumber < todayDate) {
        alert("Impossible de modifier une date passée !");
        return;
    }

    if (isCurrentlyPresent) {
        // Devient Absent
        indicator.classList.replace('bg-green-500', 'bg-gray-300');
        cardElement.classList.remove('ring-2', 'ring-green-400');
        savePresenceToStorage(dayNumber, false); // Sauvegarde
    } else {
        // Devient Présent
        indicator.classList.replace('bg-gray-300', 'bg-green-500');
        cardElement.classList.add('ring-2', 'ring-green-400');
        savePresenceToStorage(dayNumber, true); // Sauvegarde
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