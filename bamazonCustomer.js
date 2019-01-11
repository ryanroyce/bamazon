// requiring all of the packages that will be used in this node app
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// establishing connection to mysql
const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"ryanminor",
    password:"",
    database:"bamazon"
});
// confirming the connection in the CLI
connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    // running the function that will be written below to initiate the Node program
    start();
  });

function start() {

};
