-- Création de la base de données
CREATE DATABASE db_miniproject_tasks;

-- Création de la table
CREATE TABLE tasks (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	dueDate DATE,
	isDone TINYINT
	);