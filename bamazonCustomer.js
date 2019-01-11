// requiring all of the packages that will be used in this node app
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// establishing connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "ryanminor",
    password: "",
    database: "bamazon"
});
// confirming the connection in the CLI
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWELCOME TO BAMAZON!\n");
    // running the function that will be written below to initiate the Node program
    start();
});

function start() {
    // with the bamazon database put in mysql command to select from the products table
    // greatbay activity was really helpful with this part    
    connection.query(
        'SELECT * FROM products', function (err, results) {
            if (err) throw err;
            // displays the table from mysql
            console.table(results);
            // Define choice array to add products
            var productArr = [];
            //create choices for each item
            for (var i = 0; i < results.length; i++) {
                productArr.push(results[i].product_name)
            }
            //using the inquirer package, create the questions that will be used in the initial prompts
            inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'item',
                    message: 'What is the ID of the product you would like to buy?',
                    choices: productArr
                },
                {
                    type: 'input',
                    name: 'buy',
                    message: 'How many units would you like to buy?',
                }
            ]);
        }
    );
};