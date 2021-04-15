CREATE DATABASE employeedb;
USE employeedb ;

CREATE TABLE employees (
 id INT NOT NULL AUTO_INCREMENT,
 name TEXT(255) NOT NULL,
 position TEXT(255) NOT NULL,
 experience INT NOT NULL,
 salary DECIMAL(13, 4) NOT NULL,
 PRIMARY KEY (id));