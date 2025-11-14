<?php

session_start();
$host = 'localhost';
$db   = 'utilisateurs';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Fonction pour envoyer une réponse JSON et terminer le script
function sendJsonResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

// --- 3. Réception et validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Méthode non autorisée.']);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    sendJsonResponse(['success' => false, 'message' => 'Email et mot de passe requis.']);
}

// --- 4. Connexion et Vérification ---
try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // ÉTAPE A : Trouver l'utilisateur par email
    $stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    $userFound = $stmt->fetch();

    // ÉTAPE B : Vérifier si l'utilisateur existe ET si le mot de passe est correct
    if ($userFound) {
        // L'utilisateur existe, on vérifie son mot de passe
        // 
        if (password_verify($password, $userFound['password'])) {
            
            // C'EST LA BONNE PERSONNE !
            // Le mot de passe est correct. On ouvre la session.
            
            // Régénère l'ID de session pour des raisons de sécurité
            session_regenerate_id(true); 

            // On stocke les infos de l'utilisateur dans la session
            $_SESSION['user_id'] = $userFound['id'];
            $_SESSION['user_prenom'] = $userFound['prenom'];
            // On pourrait stocker aussi le nom, l'email...
            
            // On envoie la réponse de succès au JavaScript
            sendJsonResponse(['success' => true]);

        } else {
            // Mot de passe incorrect
            sendJsonResponse(['success' => false, 'message' => 'Email ou mot de passe incorrect.']);
        }
    } else {
        // Utilisateur (email) non trouvé
        sendJsonResponse(['success' => false, 'message' => 'Email ou mot de passe incorrect.']);
    }

} catch (PDOException $e) {
    // Erreur de base de données
    sendJsonResponse(['success' => false, 'message' => 'Erreur de connexion au serveur.']);
}