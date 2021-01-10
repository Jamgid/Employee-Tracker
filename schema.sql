-- Deletes the database if the name "employees_db" is in use ----
DROP DATABASE if exists employees_db;
-- Creates a database named "employees_db" ----
CREATE DATABASE employees_db;
-- Sets as default schema ----
USE employees_db;
-- Create "department" table ----
CREATE TABLE department(
	id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
);
-- Create "role" table ----
CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) references department(id)
);
-- Create "employee" table ----
CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) references role(id),
FOREIGN KEY (manager_id) references employee(id)
);
-- For viewing tables during testing ----
SELECT * FROM employees_db.department;
SELECT * FROM employees_db.employee;
SELECT * FROM employees_db.role;