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
//function to prompt user what to purchase

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please choose item id of the product you would like to purchase?",
        name: "purchase"
      }
    ])
    .then(function(answer) {
      // console.log(answer.purchase);
      connection.query(
        "select * from products where item_id='" + answer.purchase + "'",
        function(err, data) {
          if (err) throw err;
          console.log(data);
          //if statement to make sure user enters the correct item id if not then user needs to correctly pick the item id
          if (data.length === 0) {
            console.log(
              "Product is not available. Please chose item id available in the table."
            );
            promptUser();
          } else {
            console.log("GOOD");
            //prompt user to ask user the units of product to purchase
            inquirer
              .prompt([
                {
                  type: "input",
                  message:
                    "How many units of the product would you like to buy?",
                  name: "units"
                }
              ])
              .then(function(answerTwo) {
                if (answerTwo.units > response[i].stock_quantity) {
                  console.log(
                    "We are sorry! We only have" +
                      response[i].stock_quantity +
                      "quantities of item selected "
                  );
                  promptUser();
                }
              });
          }
        }
      );
    });
}
