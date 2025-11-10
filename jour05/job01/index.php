<?php
// TOUJOURS démarrer la session au tout début du fichier
session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        nav { margin-top: 20px; }
        nav a { margin-right: 15px; }
    </style>
</head>
<body>

    <h1>Mon Super Site</h1>

    <?php
    // On vérifie si une variable de session 'user_prenom' existe
    // On la créera lors de la connexion
    if (isset($_SESSION['user_prenom'])) {
        // --- UTILISATEUR CONNECTÉ ---
    ?>
    
        <p>Bonjour, <strong><?php echo htmlspecialchars($_SESSION['user_prenom']); ?></strong> !</p>
        <nav>
            <a href="profil.php">Mon Profil (à faire)</a>
            <a href="deconnexion.php">Se déconnecter</a>
        </nav>

    <?php
    } else {
        // --- UTILISATEUR NON CONNECTÉ ---
    ?>

        <p>Vous n'êtes pas connecté.</p>
        <nav>
            <a href="inscription.php">S'inscrire</a>
            <a href="connexion.php">Se connecter</a>
        </nav>

    <?php
    }
    ?>

</body>
</html>