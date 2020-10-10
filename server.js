const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");
const { of } = require("rxjs");
const { start } = require("repl");

const connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "ee_info_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id" + connection.threadId);

    startScreen();
});


function startScreen() {
    inquirer
    .prompt({

        type: "list",
        choices: [
            "Add role",
            "Add department",
            "Add employee",
            "View roles",
            "View departments",
            "View employees",
            "Update employee role",
            "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
    })
    .then(function(result) {
        console.log(" You entered: " + result.option);

        switch (result.option) {
            case: "Add role":
                addRole();
                break;
            case: "Add department":
                addDepartment();
                break;
            case: "Add employee":
                addEmployee();
                break;
            case: "View roles":
                viewRoles();
                break;
            case: "View departments":
                viewDepartment();
                break;
            case: "View employees":
                viewEmployees();
                break;
            case: "Update employee role":
                updateEmployee();
                break;
            default:
                quit();

        }
    });
}

function addRole() {

    inquirer.prompt( [
        {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salaryTotal"
        },
        {
            type: "input",
            message: "What is the department id number?",
            name: "deptID"
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.roleName, answer,salaryTotal, answer.deptID], function(err, res) {
            if(err) throw err;
            console.table(res);
            startScreen();
        });
    });
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