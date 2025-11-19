<?php
// --- CONFIGURATION ---
$apiKey = "4de27dc638c6775bc850c040cc77cb6f"; // Remets bien ta clé !

// URLs de base images
$imgBaseHd = "https://image.tmdb.org/t/p/original";
$imgBaseSd = "https://image.tmdb.org/t/p/w500";

// --- LOGIQUE DE RECHERCHE ---
// On vérifie si il y a une recherche dans l'URL (ex: index.php?search=Batman)
$searchQuery = isset($_GET['search']) ? $_GET['search'] : null;

if ($searchQuery) {
    // CAS 1 : RECHERCHE
    // On encode la recherche pour les espaces (ex: "Star Wars" devient "Star%20Wars")
    $encodedQuery = urlencode($searchQuery);
    $apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=$apiKey&language=fr-FR&query=$encodedQuery&page=1";
    $sectionTitle = "Résultats pour : " . htmlspecialchars($searchQuery);
} else {
    // CAS 2 : ACCUEIL CLASSIQUE (Tendances)
    $apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=$apiKey&language=fr-FR&page=1";
    $sectionTitle = "Tendances du moment";
}

// --- RECUPERATION DES DONNEES ---
$response = @file_get_contents($apiUrl);
$data = json_decode($response, true);

$carouselMovies = [];
$gridMovies = [];

if ($data && isset($data['results'])) {
    // Si c'est une recherche, on n'affiche pas le carrousel, on met tout dans la grille
    if ($searchQuery) {
        $gridMovies = $data['results']; 
    } else {
        // Si c'est l'accueil, on garde la séparation Carrousel / Grille
        $carouselMovies = array_slice($data['results'], 0, 5);
        $gridMovies = array_slice($data['results'], 5, 15); // J'ai mis 15 pour en avoir plus
    }
} else {
    $errorMsg = "Aucun résultat ou erreur API.";
}
?>

<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cinéthèque PHP Liquid</title>
    
    <link rel="stylesheet" href="style.css">

    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex flex-col relative">

    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob"></div>
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob delay-2000"></div>
        <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob delay-4000"></div>
    </div>

    <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div class="navbar container mx-auto">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg backdrop-blur-xl bg-white/10 border border-white/10 rounded-box w-52 text-white">
                        <li><a>Films</a></li>
                        <li><a>Séries</a></li>
                    </ul>
                </div>
                <a  href= "http://localhost/runtrack3/jour08/jour02/#slide0" class="btn btn-ghost text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">CINETHEQUE</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1 font-medium text-gray-200">
                    <li><a href = "http://localhost/runtrack3/jour08/jour02/#slide0" class="hover:bg-white/10 hover:text-white transition rounded-lg">Accueil</a></li>
                    <li><a class="hover:bg-white/10 hover:text-white transition rounded-lg">Films</a></li>
                    <li><a class="hover:bg-white/10 hover:text-white transition rounded-lg">Séries</a></li>
                </ul>
            </div>
            <div class="navbar-end gap-3">
                <form action="" method="GET" class="form-control">
                    <input type="text" name="search" placeholder="Recherche..." class="input input-sm rounded-full bg-black/20 border-white/10 text-white focus:outline-none focus:bg-black/40 w-24 md:w-auto transition-all" />
                </form>
                <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-8 ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                        <span class="text-xs">TM</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-8 space-y-12">

       <?php if(isset($errorMsg)): ?>
            <div class="alert alert-error"><?php echo $errorMsg; ?></div>
        <?php endif; ?>

        <?php if (!$searchQuery && !empty($carouselMovies)): ?>

        
        <?php endif; ?>
        <section class="w-full max-w-6xl mx-auto">
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 p-2 rounded-3xl shadow-2xl">
                <div class="carousel w-full rounded-2xl aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    
                    <?php 
                    // Compter le nombre de slides pour la logique prev/next
                    $totalSlides = count($carouselMovies);
                    
                    foreach($carouselMovies as $index => $movie): 
                        // Calcul des IDs pour la navigation infinie
                        // Si on est au slide 0, le précédent est le dernier slide
                        $prevSlide = ($index == 0) ? $totalSlides - 1 : $index - 1;
                        // Si on est au dernier slide, le suivant est le slide 0
                        $nextSlide = ($index == $totalSlides - 1) ? 0 : $index + 1;
                    ?>
                    
                    <div id="slide<?php echo $index; ?>" class="carousel-item relative w-full transition-all duration-500">
                        <img src="<?php echo $imgBaseHd . $movie['backdrop_path']; ?>" class="w-full object-cover" alt="<?php echo $movie['title']; ?>" />
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                            <h2 class="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                <?php echo $movie['title']; ?>
                            </h2>
                            <p class="text-gray-200 mb-6 max-w-xl drop-shadow-md line-clamp-2 hidden md:block">
                                <?php echo $movie['overview']; ?>
                            </p>
                            <button class="btn border-none bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 w-fit hover:scale-105 transition-transform">
                                Détails
                            </button>
                        </div>
                        
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide<?php echo $prevSlide; ?>" class="btn btn-circle border-none bg-white/10 backdrop-blur-md text-white hover:bg-white/20">❮</a> 
                            <a href="#slide<?php echo $nextSlide; ?>" class="btn btn-circle border-none bg-white/10 backdrop-blur-md text-white hover:bg-white/20">❯</a>
                        </div>
                    </div>

                    <?php endforeach; ?>
                    
                    <?php if($totalSlides == 0): ?>
                        <div class="flex items-center justify-center w-full h-full text-gray-500">Aucun film chargé.</div>
                    <?php endif; ?>

                </div>
            </div>
        </section>

        <section>
            <div class="flex items-center gap-3 mb-6">
                <div class="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 class="text-2xl font-bold text-white"><? echo $sectionTitle; ?</h3>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                <?php foreach($gridMovies as $movie): 
                    // Formatage des données
                    $note = number_format($movie['vote_average'], 1);
                    $annee = substr($movie['release_date'], 0, 4); // On garde juste l'année (YYYY)
                ?>
                
                <div class="group relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer">
                    <figure class="aspect-[2/3] w-full overflow-hidden">
                        <img src="<?php echo $imgBaseSd . $movie['poster_path']; ?>" 
                             alt="<?php echo $movie['title']; ?>" 
                             class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </figure>
                    
                    <div class="absolute top-3 right-3 backdrop-blur-md bg-black/40 border border-white/20 px-2 py-1 rounded-lg text-xs font-bold text-yellow-400 flex items-center gap-1">
                        <span>★</span> <?php echo $note; ?>
                    </div>

                    <div class="p-4">
                        <h4 class="text-white font-bold truncate"><?php echo $movie['title']; ?></h4>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-xs text-gray-400"><?php echo $annee; ?></p>
                            <span class="text-[10px] uppercase tracking-wide text-purple-400 border border-purple-400/30 px-1.5 py-0.5 rounded">Film</span>
                        </div>
                    </div>
                </div>

                <?php endforeach; ?>

            </div>
        </section>

    </main>

    <footer class="mt-16 border-t border-white/10 backdrop-blur-md bg-black/20 text-gray-400">
        <div class="container mx-auto px-6 py-10 text-center">
            <p class="text-sm">&copy; <?php echo date('Y'); ?> Cinéthèque. Propulsé par PHP & TMDB.</p>
        </div>
    </footer>

</body>
</html>