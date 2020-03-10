var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database.
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "contact_db"
});

//connect to mysql workbench.
connection.connect(function(err) {
  if (err) throw err;
  console.log("connection");
  start();
});

//Function with a prompt to allow user to select between questions.
function start() {
  inquirer
    .prompt({
      name: "toView",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employee?",
        "Add Employee?",
        "View All Department?",
        "Add Department?",
        "View All Position?",
        "Add Position?",
        "exit"
      ]
    }) //if else statements for answering selections to view.
    .then(function(answer) {
      if (answer.toView === "View All Employee?") {
        viewEmployee();
      } else if (answer.toView === "Add Employee?") {
        addEmployee();
      } else if (answer.toView === "View All Department?") {
        viewDepartment();
      } else if (answer.toView === "Add Department?") {
        addDepartment();
      } else if (answer.toView === "View All Position?") {
        viewPosition();
      } else if (answer.toView === "Add Position?") {
        addPosition();
      } else {
        connection.end();
      }
    });
}

//Allows user to retrieve all employee data when called.
function viewEmployee() {
  console.log("employeeData");
  connection.query("select * from employee", function(err, data) {
    if (err) throw err;
    console.table(data);
    // console.log(err)
    start();
  });
}

//Allows user to retrieve all department data when called.
function viewDepartment() {
  console.log("employeeData");
  connection.query("select * from department", function(err, data) {
    if (err) throw err;
    console.table(data);
    // console.log(err)
    start();
  });
}

//Allows user to retrieve all employee position data when called.
function viewPosition() {
  console.log("employeeData");
  connection.query("select * from position", function(err, data) {
    if (err) throw err;
    console.table(data);
    // console.log(err)
    start();
  });
}

//function to add an employee to the employee table.
function addEmployee() {
  console.log("Add Employee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "Add First Name"
      },
      {
        type: "input",
        name: "lastname",
        message: "Add Last Name"
      },
      {
        type: "list",
        name: "positionid",
        message: "Assign a Position ID",
        choices: [1, 2, 3, 4]
      },
      {
        type: "list",
        name: "managerid",
        message: "Assign a Manager ID",
        choices: [1, 2]
      }
    ])
    .then(function(response) {
      connection.query(
        "insert into employee (first_name, last_name, pos_id, manager_id) values(?, ?, ?, ?)",
        [
          response.firstname,
          response.lastname,
          response.positionid,
          response.managerid
        ],
        function(err, data) {
          if (err) throw err;
          console.table(data);
          // console.log(err)
          start();
        }
      );
    });
}

//function to add a Department to the Department table.
function addDepartment() {
  console.log("Department Name");
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Add a New Department"
      }
    ])
    .then(function(response) {
      connection.query(
        "insert into department (name) values(?)",
        [response.department],
        function(err, data) {
          if (err) throw err;
          console.table(data);
          // console.log(err)
          start();
        }
      );
    });
}

//function to add a Position to the position table.
function addPosition() {
  console.log("Position Name");
  inquirer
    .prompt([
      {
        type: "input",
        name: "position",
        message: "Add a Position"
      },
      {
        type: "input",
        name: "salary",
        message: "Add a Salary"
      },
      {
        type: "input",
        name: "department_id",
        message: "Add a dept ID"
      }
    ])
    .then(function(response) {
      connection.query(
        "INSERT INTO position SET ?",
        {
          title: response.position,
          salary: response.salary,
          department_id: response.department_id
        },
        function(err, data) {
          if (err) throw err;
          console.table(data);
          // console.log(err)
          start();
        }
      );
    });
}
