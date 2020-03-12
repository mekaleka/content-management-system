//Establishing connections with dependencies.
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database.
var connection = mysql.createConnection({
  host: "localhost",

  //Port; if not 3306
  port: 3306,

  //Username
  user: "root",

  //Password
  password: "",
  database: "contact_db"
});

//connect to mysql workbench.
connection.connect(function(err) {
  if (err) throw err;
  console.log("connection");
  start();
});

//Start function with a prompt to allow user to select between questions.
function start() {
  //uses
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
        "Update Position",
        "exit"
      ]
    }) //if else statements that defines the text that the user will select to view or update.
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
      } else if (answer.toView === "Update Position") {
        updatePosition();
      } else {
        connection.end();
      }
    });
}

//Allows user to view and retrieve all employee data when called.
function viewEmployee() {
  console.log("employeeData");
  connection.query("select * from employee", function(err, data) {
    if (err) throw err;
    console.table(data);
    // console.log(err)
    start();
  });
}

//Allows user to view and retrieve all department data when called.
function viewDepartment() {
  console.log("employeeData");
  connection.query("select * from department", function(err, data) {
    if (err) throw err;
    console.table(data);
    // console.log(err)
    start();
  });
}

//Allows user to view and retrieve all employee position data when called.
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
        //input prompt allows user to add employee first name.
        type: "input",
        name: "firstname",
        message: "Add First Name"
      },
      {
        //input prompt allows user to add employee last name.
        type: "input",
        name: "lastname",
        message: "Add Last Name"
      },
      {
        //A list that displays the position ID options 1-4.
        type: "list",
        name: "positionid",
        message: "Assign a Position ID",
        choices: [1, 2, 3, 4]
      },
      {
        //A list prompt that displays the manager IF options 1 and 2.
        type: "list",
        name: "managerid",
        message: "Assign a Manager ID",
        choices: [1, 2]
      }
    ]) //Initiates a response for the input values to be displayed after entered by the user.
    .then(function(response) {
      connection.query(
        //inserts the data into employee table and first name, last name, pos_id and manager_id column.
        "insert into employee (first_name, last_name, pos_id, manager_id) values(?, ?, ?, ?)",
        [
          response.firstname,
          response.lastname,
          response.positionid,
          response.managerid
        ], //err throws an error if response does not work.
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
        // Prompt that allows user to input a new department.
        type: "input",
        name: "department",
        message: "Add a New Department"
      }
    ]) //Initiates a response for the input values to be displayed after entered by the user.
    .then(function(response) {
      connection.query(
        //inserts the data into department table and name column.
        "insert into department (name) values(?)",
        response.department,
        //err throws an error if response does not work.
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
        // Prompt that allows user to input a new employee position.
        type: "input",
        name: "position",
        message: "Add a Position"
      },
      {
        // Prompt that allows user to input a new employee salary.
        type: "input",
        name: "salary",
        message: "Add a Salary"
      },
      {
        // Prompt that allows user to input a new employee dept Id.
        type: "input",
        name: "department_id",
        message: "Add a dept ID"
      }
    ])
    .then(function(response) {
      connection.query(
        //inserts the data into the position table and title, salary, and dept ID column.
        "INSERT INTO position SET ?",
        {
          title: response.position,
          salary: response.salary,
          department_id: response.department_id
        },
        //err throws an error if response does not work.
        function(err, data) {
          if (err) throw err;
          console.table(data);
          // console.log(err)
          start();
        }
      );
    });
}
//function to update a Position to the position table.
function updatePosition() {
  inquirer
    .prompt([
      {// Prompt that allows user to update an employee Id.
        type: "input",
        name: "employeeID",
        message: "Update employee ID"
      },
      {// Prompt that allows user to update an employee position Id with choices.
        type: "choices",
        name: "positionID",
        message: "Update Position ID",
        choices: [1, 2, 3, 4]
      }
    ])
    .then(function(response) {
      connection.query(
        //Updates the data into the employee position table.
        "UPDATE employee SET pos_id = ? WHERE id = ?",
        [response.positionID, response.employeeID],
        function(err, result) {
          start();
        }
      );
    });
}
