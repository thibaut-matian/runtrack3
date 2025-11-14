<?php
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


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'server', 'message' => 'Méthode non autorisée.']);
}

// Récupère les données du formulaire
$prenom = $_POST['prenom'] ?? '';
$nom = $_POST['nom'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';



if (empty($prenom) || empty($nom) || empty($email) || empty($password)) {
    sendJsonResponse(['success' => false, 'error' => 'form', 'message' => 'Tous les champs sont requis.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(['success' => false, 'error' => 'email', 'message' => 'Format d\'email invalide.']);
}

if (strlen($password) < 8) {
    sendJsonResponse(['success' => false, 'error' => 'password', 'message' => 'Le mot de passe doit faire 8 caractères minimum.']);
}


$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // D'ABORD, on vérifie si l'email existe déjà
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        // L'email existe
        sendJsonResponse(['success' => false, 'error' => 'email', 'message' => 'Cet email est déjà utilisé.']);
    }

    // ENSUITE, on insère le nouvel utilisateur
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nom, $prenom, $email, $hashedPassword]);
    sendJsonResponse(['success' => true]);

} catch (PDOException $e) {
    sendJsonResponse(['success' => false, 'error' => 'server', 'message' => 'Erreur de base de données: ' . $e->getMessage()]);
}