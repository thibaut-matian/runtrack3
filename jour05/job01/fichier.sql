-- D'abord, on crée la BONNE base de données
CREATE DATABASE IF NOT EXISTS utilisateurs 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- On l'utilise
USE utilisateurs;

-- On supprime la table 'utilisateuurs' si elle existe
DROP TABLE IF EXISTS utilisateuurs;
-- On supprime la table 'utilisateurs' si elle existe
DROP TABLE IF EXISTS utilisateurs;

-- On crée la BONNE table 'utilisateurs' (un 'u')
CREATE TABLE utilisateurs (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB;