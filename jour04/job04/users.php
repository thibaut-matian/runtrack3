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

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->query("SELECT id, nom, prenom, email FROM utilisateurs");
    $users = $stmt->fetchAll();

   
    header('Content-Type: application/json');
    echo json_encode($users);

} catch (\PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['erreur' => $e->getMessage()]);
}