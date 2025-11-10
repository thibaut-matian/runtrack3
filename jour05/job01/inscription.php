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
    <title>Inscription</title>
    <link rel="stylesheet" href="style.css">

</head>
<body>

    <div class="form-container">
        <h2>Créer un compte</h2>
        
        <form id="inscriptionForm">

            <div class="form-group">
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom">
                <span class="error-message" id="error-prenom"></span>
            </div>
            
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom">
                <span class="error-message" id="error-nom"></span>
            </div>

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

            <div class="form-group">
                <label for="password_confirm">Confirmer le mot de passe</label>
                <input type="password" id="password_confirm" name="password_confirm">
                <span class="error-message" id="error-password_confirm"></span>
            </div>
            
            <div class="form-group toggle-password">
                <input type="checkbox" id="showPasswordToggle">
                <label for="showPasswordToggle">Afficher les mots de passe</label>
            </div>

            <button type="submit">S'inscrire</button>
        </form>
        <p style="text-align: center; margin-top: 10px;">
            Déjà un compte ? <a href="connexion.php">Connectez-vous</a>
        </p>
    </div>
<script src = "inscription.js"></script>
</body>
</html>