-- Creo la BDD
CREATE DATABASE likeme;
-- Ingreso a la BDD
\c likeme;

--Creo La Tabla
CREATE TABLE posts (
  id VARCHAR(36) NOT NULL PRIMARY KEY, 
  titulo VARCHAR(25) NOT NULL, 
  img VARCHAR(1000) NOT NULL, 
  descripcion VARCHAR(255) NOT NULL, 
  likes INT NULL
);
