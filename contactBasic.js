var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "contract_db"
  });

  //connect to mysql server and sql database. 
  connection.connect(function(err) {
      if (err) throw err;
      console.log("connection")
      start();
  })
//
  function start() {
    inquirer
      .prompt({
        name: "toView",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees?", "Add Employee?", "View All Departments?", "Add Department?", "View All Position?", "Add Position?", "exit"]
      })
      .then(function(answer) {
        if (answer.toView === "View All Employees?") {
          viewEmployees();
        }
        else if (answer.toView === "View All Departments?") {
          viewDepartment();
        }else if (answer.toView === "View All Position?") {
          viewPosition();
        }
        else if(answer.toView === "Add Employee?") {
          addEmployee();
        } else{
          connection.end();
        }
      });
  }
//selects all employee data when called. 
  function viewEmployees(){
    console.log("employeeData")
    connection.query ("select * from employee", function(err, data){
      if (err) throw err
      console.table(data)
      // console.log(err)
      start()
    })
  }
//selects all department data when called.
  function viewDepartment(){
    console.log("employeeData")
    connection.query ("select * from department", function(err, data){
      if (err) throw err
      console.table(data)
      // console.log(err)
      start()
    })
  }
//selects all position data when called.
  function viewPosition(){
    console.log("employeeData")
    connection.query ("select * from position", function(err, data){
      if (err) throw err
      console.table(data)
      // console.log(err)
      start()
    })
  }

  function viewDepartment(){
    console.log("employeeData")
    connection.query ("select * from department", function(err, data){
      if (err) throw err
      console.table(data)
      // console.log(err)
      start()
    })
  }

  function addEmployee(){
    console.log("addEmployee")
    inquirer.prompt([
      {
        type: "input", 
        name: "firstname",
        message: "firstname"
      },
      {
        type: "input", 
        name: "lastname",
        message: "lastname"
      },
      {
        type: "list", 
        name: "positionid",
        message: "positionid",
        choices: [1, 2, 3, 4]
      },
      {
        type: "list", 
        name: "managerid",
        message: "managerid",
        choices: [1, 2]
      }
    ])
    .then(function(response){
      connection.query ("insert into employee (first_name, last_name, pos_id, manager_id) values(?, ?, ?, ?)",[response.firstname, response.lastname, response.positionid, response.managerid], function(err, data){
        if (err) throw err
        console.table(data)
        // console.log(err)
        start()
      })
      
    })
    
  }