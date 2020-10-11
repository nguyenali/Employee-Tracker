const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');



const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id" + connection.threadId);

    startPrompt();
});


function startPrompt() {
  inquirer.prompt([
  {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
            "View All Employees?", 
            "View All Employee's By Roles?",
            "View all Emplyees By Deparments", 
            "Update Employee",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
          ]
  }
]).then(function(val) {
      switch (val.choice) {
          case "View All Employees?":
            viewAllEmployees();
          break;
  
        case "View All Employee's By Roles?":
            viewAllRoles();
          break;
        case "View all Emplyees By Deparments":
            viewAllDepartments();
          break;
        
        case "Add Employee?":
              addEmployee();
            break;

        case "Update Employee":
              updateEmployee();
            break;
    
          case "Add Role?":
              addRole();
            break;
    
          case "Add Department?":
              addDepartment();
            break;
  
          }
  })
}


function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
})
}

function viewAllRoles() {
connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
function(err, res) {
if (err) throw err
console.table(res)
startPrompt()
})
}

function viewAllDepartments() {
connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
})
}




function addDepartment() {


    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(answer){



        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })
    })
}

function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "eeFirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "eeLastName"
        },
        {
          type: "input",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function(answer) {
  
        
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }

function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "eeUpdate"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
        // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
        //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
        //console.log(query);
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }


function viewRoles() {
    
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
    // show the result to the user (console.table)
  }

function viewDepartment() {
    // select from the db
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
    // show the result to the user (console.table)
  }

function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
    // show the result to the user (console.table)
  }

function quit() {
    connection.end();
    process.exit();
}