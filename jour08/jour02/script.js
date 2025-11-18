

// --- CONFIGURATION ---
const API_KEY = '4de27dc638c6775bc850c040cc77cb6f'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL_HD = 'https://image.tmdb.org/t/p/original'; 
const IMG_URL_SD = 'https://image.tmdb.org/t/p/w500';  
   

// --- FONCTION PRINCIPALE ---
async function loadMovies() {
    try {
        // Récupère les films actuellement au cinéma
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&page=1`);
        const data = await response.json();
        
        if (!data.results) {
            console.error("Erreur: Pas de résultats");
            return;
        }

        const movies = data.results;

        // On découpe : les 5 premiers pour le slider, les 8 suivants pour la grille
        displayCarousel(movies.slice(0, 5)); 
        displayGrid(movies.slice(5, 13)); 
        
    } catch (error) {
        console.error("Erreur lors du chargement des films:", error);
    }
}

// --- GESTION DU CARROUSEL ---
function displayCarousel(movies) {
    const container = document.getElementById('movie-carousel');
    let htmlContent = '';

    movies.forEach((movie, index) => {
        // Calcul des index pour la navigation infinie (boucle)
        const prevIndex = index === 0 ? movies.length - 1 : index - 1;
        const nextIndex = index === movies.length - 1 ? 0 : index + 1;

        htmlContent += `
        <div id="slide${index}" class="carousel-item relative w-full transition-all duration-500 ease-in-out">
            <img src="${IMG_URL_HD + movie.backdrop_path}" class="w-full object-cover" alt="${movie.title}" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <h2 class="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg slide-title">${movie.title}</h2>
                <p class="text-gray-200 mb-6 max-w-xl drop-shadow-md line-clamp-2 hidden md:block text-sm md:text-base">
                    ${movie.overview}
                </p>
                <button class="btn border-none bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 w-fit hover:scale-105 transition-transform">
                    En savoir plus
                </button>
            </div>
            
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide${prevIndex}" class="btn btn-circle border-none bg-white/10 backdrop-blur-md text-white hover:bg-white/20">❮</a> 
                <a href="#slide${nextIndex}" class="btn btn-circle border-none bg-white/10 backdrop-blur-md text-white hover:bg-white/20">❯</a>
            </div>
        </div>
        `;
    });

    container.innerHTML = htmlContent;
}

// --- GESTION DE LA GRILLE ---
function displayGrid(movies) {
    const container = document.getElementById('movies-grid');
    let htmlContent = '';

    movies.forEach(movie => {
        // On formatte la date (ex: 2024)
        const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        // On arrondit la note (ex: 8.4)
        const rate = movie.vote_average.toFixed(1);

        htmlContent += `
        <div class="group relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer">
            
            <figure class="aspect-[2/3] w-full overflow-hidden">
                <img src="${IMG_URL_SD + movie.poster_path}" 
                     alt="${movie.title}" 
                     class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                />
            </figure>
            
            <div class="absolute top-3 right-3 backdrop-blur-md bg-black/40 border border-white/20 px-2 py-1 rounded-lg text-xs font-bold text-yellow-400 flex items-center gap-1">
                <span>★</span> ${rate}
            </div>

            <div class="p-4">
                <h4 class="text-white font-bold truncate" title="${movie.title}">${movie.title}</h4>
                <div class="flex justify-between items-center mt-2">
                    <p class="text-xs text-gray-400">${year}</p>
                    <span class="text-[10px] uppercase tracking-wide text-purple-400 border border-purple-400/30 px-1.5 py-0.5 rounded">Film</span>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = htmlContent;
}

// Lancement du script au chargement de la page
document.addEventListener('DOMContentLoaded', loadMovies);