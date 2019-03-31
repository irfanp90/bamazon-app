var mysql = require("mysql");
var inquirer = require("inquirer");
//connecting to My SQL
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showTable();
});
//show user data from the products table
function showTable() {
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      console.log(
        "Item ID: " +
          response[i].item_id +
          " | " +
          "Product: " +
          response[i].product_name +
          " | " +
          "Department: " +
          response[i].department_name +
          " | " +
          "Price: " +
          response[i].price +
          " | " +
          "Stock-quantity: " +
          response[i].stock_quantity
      );
    }
    promptUser();
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What would you like to purchase?",
        name: "purchase"
      }
    ])
    .then(function(answer) {
      console.log(answer.purchase);
    });
}
