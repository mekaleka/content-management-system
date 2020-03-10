DROP DATABASE IF EXISTS contact_DB;

CREATE DATABASE contact_DB;

USE contact_DB;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);
CREATE TABLE position (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2) NULL,
  department_id INT(30),
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  pos_id INT,
  manager_id INT,
  PRIMARY KEY(id)
);

INSERT INTO department VALUES(1, "marketing");
INSERT INTO department VALUES(2, "production");

INSERT INTO position VALUES(1, "manager", 1150000, 1);
INSERT INTO position VALUES(2, "manager", 120000, 2);
INSERT INTO position VALUES(3, "team_leader", 87000, 1);
INSERT INTO position VALUES(4, "team_leader", 97000, 2);
INSERT INTO position VALUES(5, "engineer", 120000, 2);


INSERT INTO employee (id, first_name, last_name, pos_id) VALUES(1, "John", "Smith", 1);
INSERT INTO employee (id, first_name, last_name, pos_id) VALUES(2, "Amy", "Johnson", 2);
INSERT INTO employee  VALUES(3, "Conrad", "Armada", 3, 1);
INSERT INTO employee  VALUES(4, "Sam", "Sanchez", 4, 2);
INSERT INTO employee  VALUES(5, "Matt", "Zo", 5, 1);
INSERT INTO employee  VALUES(6, "Nadia", "Ali", 6, 2);
