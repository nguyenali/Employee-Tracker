DROP DATABASE IF EXISTS ee_info_db;

CREATE DATABASE ee_info_db;

USE ee_info_db;

CREATE TABLE role (

id INT NOT NULL AUTO_INCREMENT,

title VARCHAR(30) NOT NULL,

salary DECIMAL (10,2) not NULL,

department_id INT not NULL,

PRIMARY KEY(id)

);

CREATE TABLE department (

id INT NOT NULL AUTO_INCREMENT,

name VARCHAR(30) NOT NULL,

PRIMARY KEY (id)

);

CREATE TABLE employee (

id INT NOT NULL AUTO_INCREMENT,

first_name VARCHAR(30) NOT NULL,

last_name VARCHAR(30) NOT NULL,

role_id INT NOT NULL,

manager_id INT,

PRIMARY KEY (id)

);