USE contract_DB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);
--created a table for employee positions
CREATE TABLE position (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,2) NULL,
  department_id INT(30)
);
--created a table for employee. 
CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  pos_id INT,
  manager_id INT
);
--inserting values into department table. 
INSERT INTO department VALUES(1, "marketing");
INSERT INTO department VALUES(2, "production");
--inserting values into position table.
INSERT INTO position VALUES(1, "manager", 120000, 1);
INSERT INTO position VALUES(2, "manager", 120000, 2);
INSERT INTO position VALUES(3, "team_leader", 100000, 1);
INSERT INTO position VALUES(4, "team_leader", 100000, 2);

--inserts values into employee table. 
INSERT INTO employee (id, first_name, last_name, pos_id) VALUES(1, "John", "Smith", 1);
INSERT INTO employee (id, first_name, last_name, pos_id) VALUES(2, "Amy", "Johnson", 2);
INSERT INTO employee  VALUES(3, "Conrad", "Armada", 3, 1);
INSERT INTO employee  VALUES(4, "Sam", "Sanchez", 4, 2);
