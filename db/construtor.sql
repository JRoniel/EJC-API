-- Criação do banco de dados
CREATE DATABASE db_ejc_dev;

-- Utiliza o banco de dados criado
USE db_ejc_dev;

-- Criação da tabela 'users'
CREATE TABLE users (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
