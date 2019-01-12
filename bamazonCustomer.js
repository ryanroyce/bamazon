// requiring all of the packages that will be used in this node app
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// establishing connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "ryanminor",
    password: "limabean13",
    database: "bamazon"
});
// confirming the connection in the CLI
connection.connect((err) => {
    if (err) throw err;
    console.log("\nWELCOME TO BAMAZON!\n");
    // running the function that will be written below to initiate the Node program
    start();
});

function start() {
    // with the bamazon database put in mysql command to select from the products table
    // greatbay activity was really helpful with this part    
    connection.query(
        'SELECT * FROM products', (err, res) => {
            if (err) throw err;
            // displays the products table from mysql
            console.table(res);
            // establishes an empty array to push the product_names into
            var productArr = [];
            // pushes all of the product_names from the products table in mysql into the productArr
            for (var i = 0; i < res.length; i++) {
                productArr.push(res[i].product_name)
            }
            // using the inquirer package, create the questions that will be used in the initial prompts
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
                    // to ensure that only numbers are used as input
                    validate: (value) => {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
                .then((purchase) => {
                    // establishes two new variables to store the stock_quantity and updated stock_quantity inside of
                    let quantity = res[productArr.indexOf(purchase.item)].stock_quantity;
                    let updatedQuantity = quantity - purchase.buy;
                    // also stores the cost from price in the products database as well as the totalCost that is the price multiplied by the quantity
                    // we will need these variables later once an item is purchased
                    let cost = res[productArr.indexOf(purchase.item)].price
                    let totalCost = cost * purchase.buy;

                    // if else statement to update stock_quantity, or determine if there is an insufficient stock_quantity
                    if (purchase.buy <= quantity) {
                        // connect to products database in mysql and updates the table
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: updatedQuantity
                                },
                                {
                                    product_name: purchase.item
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                                // console logs to confirm order is placed and to display the total
                                console.log(`\nORDER PLACED!\nYOUR TOTAL IS: $${totalCost}\n`);
                                inquirer.prompt([
                                    {
                                        type: 'rawlist',
                                        message: 'CONTINUE SHOPPING?',
                                        name: 'continue',
                                        choices: ['YES', 'NO']
                                    }
                                ]).then((purchase) => {
                                    if (purchase.continue === 'YES') {
                                        start();
                                    } else {
                                        console.log("\nGOODBYE FROM BAMAZON!\n");
                                        connection.end();
                                    }
                                })
                            });
                    }
                    // else statement if quantity purchased is greater than quantity available
                    else {
                        console.log("\nINSUFFICIENT QUANTITY!\n");
                        inquirer.prompt([
                            {
                                type: 'rawlist',
                                message: 'CONTINUE SHOPPING?',
                                name: 'continue',
                                choices: ['YES', 'NO']
                            }
                        ]).then((purchase) => {
                            if (purchase.continue === 'YES') {
                                start();
                            } else {
                                console.log("\nGOODBYE FROM BAMAZON!\n");
                                connection.end();
                            }
                        })
                    }
                });
        });
};
