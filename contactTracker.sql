DROP DATABASE IF EXISTS contract_DB;
CREATE DATABASE contract_DB;

USE contract_DB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE position (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,2) NULL,
  department_id INT(30)
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT PRIMARY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  pos_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);