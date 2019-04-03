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
      },
      {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "units"
      }
    ])
    .then(function(answer) {
      // console.log(answer.purchase);
      var purchase = answer.purchase;
      connection.query(
        "select * from products where item_id=?",
        purchase,

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
            if (data[0].stock_quantity > answer.units) {
              console.log("READY TO PURCHASE");
              var total = answer.units * data[0].price;
              console.log(total);
              updateData(data[0].item_id, answer.units);
            } else {
              console.log("Insufficient quantity ");
            }

            // promptUnit();
          }
        }
      );
    });
}

function updateData(id, qty) {
  // console.log(id + qty);
  connection.query("", function(err, data) {});
}

//prompt user to ask user the units of product to purchase
// function promptUnit() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "How many units of the product would you like to buy?",
//         name: "units"
//       }
//     ])
//     .then(function(answerTwo) {
//       connection.query("select * from products", function(err, response) {
//         if (err) throw err;
//         // console.log(response);
//         for (var i = 0; i < response.length; i++) {
//           var stockQty = response[i].stock_quantity; //query the database by passing id number
//           var qty = answerTwo.units;

//           // console.log(qty + " UNITS ");
//           // console.log(" hello " + stockQty);
//           if (qty > stockQty) {
//             console.log(
//               "We are sorry! We only have " +
//                 stockQty +
//                 " quantities of item selected "
//             );
//             // promptUser();
//           }
//         }
//       });
//     });
// }
