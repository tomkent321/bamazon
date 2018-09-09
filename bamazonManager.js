
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
}); 

connection.connect(function(err) {
  if (err) throw err;

  runManager();
});

function runManager(){

  var arrCurDept=[];



  function getDepts(){
    var query = "SELECT department_name FROM departments";
    connection.query(query, function (err, res) {

      for (var i = 0; i < res.length; i++) {
        arrCurDept.push(res[i].department_name);
      }

      return arrCurDept;

    });
  }

      getDepts();    


    function mainMenu(){

      inquirer
        .prompt({
          name: "action",
          type: "rawlist",
          message: "\nWhat would you like to do?\n",
          choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"

          ]
        })       
      
        .then(function (answer) {
          switch (answer.action) {
            case "View Products for Sale":
              viewProducts();
              break;

            case "View Low Inventory":
              viewLowInventory();
              break;

            case "Add to Inventory":
              addInventory();
              break;

            case "Add New Product":
              addProduct();
              break;

          }
        }); 
                  
      } 


function viewProducts(){
  var query = "SELECT * FROM products";  //query without variable

  //this line takes the query, replaces the ? from var query with object, res is the result  
  connection.query(query, function (err, res) {


    var table = new Table({
      head: ['item ID', 'Product Name', 'Dept', 'Price', 'Qty in Stock']
      , colWidths: [10, 30, 10, 25, 14]
    }); 

    for (var i = 0; i < res.length; i++) {

      table.push([
        res[i].item_Id,
        res[i].product_name,
        res[i].department_name,
        "$" + (Math.round((res[i].price + 0.00001) * 100) / 100).toLocaleString('en'),
        res[i].stock_quantity
      ])

    }
      console.log("                ** Al's Aircraft Barn **\n");
      console.log("                 ** Total Inventory **\n");
      console.log(table.toString());
      console.log("\n");
      
      mainMenu();
    });
        console.log("\n");
        
} 


function viewLowInventory(){

    var query = "SELECT * FROM products WHERE stock_quantity < 5";  //query without variable

    //this line takes the query, replaces the ? from var query with object, res is the result  
  connection.query(query, function (err, res) {
    var table = new Table({
      head: ['item ID', 'Product Name', 'Dept', 'Price', 'Qty in Stock']
      , colWidths: [10, 30, 10, 25, 14]
    }); 

    for (var i = 0; i < res.length; i++) {

      table.push([
        res[i].item_Id,
        res[i].product_name,
        res[i].department_name,
        "$" + (Math.round((res[i].price + 0.00001) * 100) / 100).toLocaleString('en'),
        res[i].stock_quantity
      ])

    }
      console.log("                ** Al's Aircraft Barn **\n");
      console.log("                 ** Low Inventory (less than 5) **\n");
      console.log(table.toString());
      console.log("\n");
      
      mainMenu();
    });
        console.log("\n");
        
} 

function addProduct(){
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the name of the product you wish to add?"
        },

        {
          name: "department",
          type: "input",
          message: "What department is it in?"
        },

        {
          name: "quantity",
          type: "input",
          message: "How many would you like to add?"
        },
        {
          name: "price",
          type: "input",
          message: "What is the price for each?"
        }
      ])
    .then(function(answer){

          
      if (arrCurDept.indexOf(answer.department.toLowerCase()) == -1) {
        console.log("You entered an invalid department name. Please try again or ask your manager to create a new department");
        mainMenu();
      } else {

        var query = connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function (err, res) {

            var table = new Table({
              head: ['quantity', 'Product Name', 'Dept', 'Price']
              , colWidths: [10, 30, 10, 25]
            });

            table.push([
              answer.quantity,
              answer.product,
              answer.department,
              "$" + (Math.round((parseFloat(answer.price) + 0.00001) * 100) / 100).toLocaleString('en'),
            ])


            console.log("\n\n                ** Al's Aircraft Barn **\n");
            console.log("You added a new product:  \n");

            console.log(table.toString());

            mainMenu();
              });
            }
          
    })
  };

function addInventory(){
    
  var query = "SELECT * FROM products";  

  connection.query(query, function (err, res) {
    var table = new Table({
      head: ['item ID', 'Product Name', 'Dept', 'Price', 'Qty in Stock']
      , colWidths: [10, 30, 10, 25, 14]
    }); 

    for (var i = 0; i < res.length; i++) {

      table.push([
        res[i].item_Id,
        res[i].product_name,
        res[i].department_name,
        "$" + (Math.round((res[i].price + 0.00001) * 100) / 100).toLocaleString('en'),
        res[i].stock_quantity
      ])

  }
    console.log("                ** Al's Aircraft Barn **\n");
    console.log("                 ** Current Inventory **\n");
    console.log(table.toString());
    console.log("\n");

    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the ID number of the product you wish to add inventory?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to add?"
        }
      ])
      .then(function (answer) {

        for (var i = 0; i < res.length; i++) {

          if (res[i].item_Id == answer.item) {
            var id = res[i].item_Id;
            var description = res[i].product_name;
            var priceEa = res[i].price;
            var inStock = parseInt(res[i].stock_quantity);

          }

        }

        console.log("\n\nYou have ordered: " + answer.quantity + " of item #" + answer.item + ". " + description);

        var query = "UPDATE products SET stock_quantity = ? WHERE item_Id = ?";

        connection.query(query, [(inStock + parseInt(answer.quantity)), id], function (err, res) {

          console.log("\n** Done ** \n\nYou have added: " + answer.quantity + " " + description + "(s) to the inventory.");
          mainMenu();
        });
      })
  });
} 
    

mainMenu();

} //end runManager