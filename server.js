const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");
const { of } = require("rxjs");

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