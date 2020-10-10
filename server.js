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