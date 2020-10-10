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
}