let currentUser = null;
let currentDate = new Date(); // 1. Variable globale pour la navigation (mois affiché)

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
    displayAdminButtonIfAllowed();
    setupCalendarNavigation();
    
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
    const dateElement = document.getElementById("date-display");
    const calendarContainer = document.getElementById('calendar-grid');
    
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();

    // 3. On a besoin de la "vraie" date d'aujourd'hui juste pour savoir si un jour est passé
    const realToday = new Date();
    const todayDayNumber = realToday.getDate(); 

    // Calcul du nombre de jours dans le mois affiché
    const daysInCurrentMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    // Mise à jour du texte du bouton (ex: "Novembre 2025")
    if (dateElement) {
       dateElement.textContent = monthNames[currentMonthIndex] + " " + currentYear;
    }

    const allPresences = JSON.parse(localStorage.getItem('presences')) || {};

    calendarContainer.innerHTML = '';

    for (let dayNumber = 1; dayNumber <= daysInCurrentMonth; dayNumber++) {
        
        // Vérifie si le jour est passé (seulement si on regarde le mois en cours)
        // Note : Pour l'instant, cette logique est simple. Elle compare juste le numéro du jour.
        let isDateInPast = false;
        if (currentYear === realToday.getFullYear() && currentMonthIndex === realToday.getMonth()) {
             isDateInPast = dayNumber < todayDayNumber;
        } else if (currentDate < realToday) {
             // Si le mois affiché est avant le mois actuel, tout est "passé"
             // (Nous améliorerons cette logique de navigation juste après)
             isDateInPast = true; 
        }
        
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

    // Petite sécurité supplémentaire
    const realToday = new Date();
    if (currentDate.getMonth() === realToday.getMonth() && dayNumber < realToday.getDate()) {
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

// --- FONCTION POUR AFFICHER LE BOUTON ADMIN ---

function displayAdminButtonIfAllowed() {
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'moderator')) {
        const container = document.getElementById('admin-button-container');
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

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn && nextBtn) {
        // Clic sur "Mois précédent"
        prevBtn.addEventListener('click', () => {
            // On retire 1 mois à la date globale
            currentDate.setMonth(currentDate.getMonth() - 1);
            // On relance l'affichage
            renderMonthCalendar();
        });

        // Clic sur "Mois suivant"
        nextBtn.addEventListener('click', () => {
            // On ajoute 1 mois à la date globale
            currentDate.setMonth(currentDate.getMonth() + 1);
            // On relance l'affichage
            renderMonthCalendar();
        });
    }
}