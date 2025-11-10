<?php
session_start();

// Si l'utilisateur est déjà connecté, on le redirige vers l'accueil
if (isset($_SESSION['user_prenom'])) {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="form-container">
        <h2>Se connecter</h2>
        
        <form id="connexionForm">

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
                <span class="error-message" id="error-email"></span>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password">
                <span class="error-message" id="error-password"></span>
            </div>

            <button type="submit">Se connecter</button>
        </form>
        <p style="text-align: center; margin-top: 10px;">
            Pas de compte ? <a href="inscription.php">Inscrivez-vous</a>
        </p>
    </div>

</body>
</html>