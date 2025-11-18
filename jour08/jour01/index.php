<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Inscription</title>
  <link rel="stylesheet" href="style.css">
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

</head>
<body class="min-h-screen flex flex-col">

<header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full flex justify-between items-center px-6 py-3">    
    <div class="brand"><strong>MonSite</strong></div>
    <nav>
      <ul>
        <li><a href="index.php">Accueil</a></li>
        <li><a href="index.php">Inscription</a></li>
        <li><a href="index.php">Connexion</a></li>
        <li><a href="index.php">Rechercher</a></li>
      </ul>
    </nav>
  </header>

  <main class="flex-1 p-6">
   <section aria-labelledby="inscription-titre" class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
      
      <div class="text-center">
        <h1 id="inscription-titre" class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Créer un compte
        </h1>
        <p class="mt-2 text-sm text-gray-500">Rejoignez notre communauté dès aujourd'hui</p>
      </div>
  
      <form action="index.php" method="post" novalidate class="mt-8 space-y-6">
        
        <fieldset class="space-y-2">
          <legend class="text-sm font-medium text-gray-700">Civilité</legend>
          <div class="flex items-center space-x-6 mt-2">
            <label class="flex items-center cursor-pointer group">
                <input type="radio" name="civilite" value="monsieur" required class="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer">
                <span class="ml-2 text-sm text-gray-600 group-hover:text-purple-600 transition">Monsieur</span>
            </label>
            <label class="flex items-center cursor-pointer group">
                <input type="radio" name="civilite" value="madame" class="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer">
                <span class="ml-2 text-sm text-gray-600 group-hover:text-purple-600 transition">Madame</span>
            </label>
            <label class="flex items-center cursor-pointer group">
                <input type="radio" name="civilite" value="autre" class="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer">
                <span class="ml-2 text-sm text-gray-600 group-hover:text-purple-600 transition">Autre</span>
            </label>
          </div>
        </fieldset>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input id="prenom" name="prenom" type="text" required 
                     class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm hover:shadow-md" placeholder="Jean">
            </div>
          </div>
  
          <div>
            <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input id="nom" name="nom" type="text" required 
                     class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm hover:shadow-md" placeholder="Dupont">
            </div>
          </div>
        </div>
  
        <div>
          <label for="adresse" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <input id="adresse" name="adresse" type="text" 
                   class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm" placeholder="123 Rue de l'Innovation">
          </div>
        </div>
  
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <input id="email" name="email" type="email" required 
                   class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm" placeholder="exemple@email.com">
          </div>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input id="password" name="password" type="password" minlength="6" required 
                     class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm">
            </div>
          </div>
          <div>
            <label for="password_conf" class="block text-sm font-medium text-gray-700 mb-1">Confirmer</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input id="password_conf" name="password_conf" type="password" minlength="6" required 
                     class="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out sm:text-sm shadow-sm">
            </div>
          </div>
        </div>
  
        <fieldset class="border-t border-gray-200 pt-4">
          <legend class="text-sm font-medium text-gray-700 mb-3">Passions</legend>
          <div class="grid grid-cols-2 gap-4">
             <label class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition">
                 <input type="checkbox" name="passions[]" value="informatique" class="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition duration-150 ease-in-out">
                 <span class="text-gray-700">Informatique</span>
             </label>
             <label class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition">
                 <input type="checkbox" name="passions[]" value="voyages" class="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition duration-150 ease-in-out">
                 <span class="text-gray-700">Voyages</span>
             </label>
             <label class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition">
                 <input type="checkbox" name="passions[]" value="sport" class="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition duration-150 ease-in-out">
                 <span class="text-gray-700">Sport</span>
             </label>
             <label class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition">
                 <input type="checkbox" name="passions[]" value="lecture" class="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition duration-150 ease-in-out">
                 <span class="text-gray-700">Lecture</span>
             </label>
          </div>
        </fieldset>
  
        <div class="pt-4">
          <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Valider mon inscription
          </button>
        </div>
        
      </form>
    </div>
  </section>
  </main>

  <footer class= "bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full flex justify-between items-center px-6 py-3">
    <nav>
      <ul>
        <li><a href="index.php">Accueil</a></li>
        <li><a href="index.php">Inscription</a></li>
        <li><a href="index.php">Connexion</a></li>
        <li><a href="index.php">Rechercher</a></li>
      </ul>
    </nav>
    <small>&copy; MonSite</small>
  </footer>

</body>
</html>