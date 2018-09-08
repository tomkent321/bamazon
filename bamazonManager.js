
var mysql = require("mysql");
var inquirer = require("inquirer");


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
      
          .then(function(answer) {      
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
    connection.query(query, function(err, res) {
        
        console.log("\n");
        console.log("                ** Al's Aircraft Barn **\n");
        console.log("                ** Total Inventory **\n");
        console.log("item ID  Product Name   Department   \tPrice   \t quantity in stock");
        console.log("-------  -------------- ----------   \t-----   \t ----------------");
                
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_Id + ".\t" + res[i].product_name + "\t" + res[i].department_name +"\t\t$" + (res[i].price).toLocaleString('en') + "\t " + res[i].stock_quantity);
        //console.log(res[i].item_Id + ". " + res[i].product_name + "   \t$" + parseFloat(res[i].price).toFixed(2).toLocaleString('en'));
      }
      mainMenu();
    });
        console.log("\n");
        
} 


function viewLowInventory(){

    var query = "SELECT * FROM products WHERE stock_quantity < 5";  //query without variable

    //this line takes the query, replaces the ? from var query with object, res is the result  
    connection.query(query, function(err, res) {
        
        console.log("\n");
        console.log("                ** Al's Aircraft Barn **\n");
        console.log("       ** Low Inventory (less than 5) Products **\n");
        console.log("item ID  Product Name   Department   \tPrice   \t quantity in stock");
        console.log("-------  -------------- ----------   \t-----   \t ----------------");
                
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_Id + ".\t" + res[i].product_name + "\t" + res[i].department_name +"\t\t$" + (res[i].price).toLocaleString('en') + "\t " + res[i].stock_quantity);
      }
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
                type: "rawlist",
                message: "\nWhat department is it in?\n",
                choices: [
                  "jet",
                  "jetprop",
                  "piston",
                  "heli",
                  "other"
                ]
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

            var query = connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
              },
              function(err, res) {
                console.log("\n\nYou have added: " + answer.quantity + " " + answer.product + "(s) in the " + answer.department + " department with a sales price of $" + answer.price.toLocaleString('en') + " each." );
                mainMenu();
              });

          
    })
  };

function addInventory(){
    
  var query = "SELECT * FROM products";  

  connection.query(query, function(err, res) {
      console.log("\n");
              
      console.log("\n");
      console.log("                ** Al's Aircraft Barn **\n");
      console.log("                ** Current Inventory **\n");
      console.log("item ID  Product Name   Department   \tPrice   \t quantity in stock");
      console.log("-------  -------------- ----------   \t-----   \t ----------------");
              
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_Id + ".\t" + res[i].product_name + "\t" + res[i].department_name +"\t\t$" + (res[i].price).toLocaleString('en') + "\t " + res[i].stock_quantity);
    }
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
  .then(function(answer){

      for(var i = 0; i < res.length; i++){

        if (res[i].item_Id == answer.item){
          var id = res[i].item_Id;
          var description = res[i].product_name;
          var priceEa = res[i].price;
          var inStock = parseInt(res[i].stock_quantity);

        }

      }

      console.log("\n\nYou have ordered: " + answer.quantity + " of item #" + answer.item + ". " + description);
   
          var query = "UPDATE products SET stock_quantity = ? WHERE item_Id = ?" ;  

            connection.query(query, [(inStock + parseInt(answer.quantity)), id ],function(err, res) {

              console.log("\n** Done ** \n\nYou have added: " + answer.quantity + " " + description + "(s) to the inventory.");   
              mainMenu();
            });
      })
  });
} 
    

mainMenu();

} //end runManager