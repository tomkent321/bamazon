//1. dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//2. connection set up
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
}); //2. end of connection set up


//3. inside the connection
connection.connect(function(err) {
  if (err) throw err;

  runManager();
});

// 4. functions

  // main function

function runManager(){

    function mainMenu() {
        inquirer
          .prompt({         //begin prompt
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
            
            ]
          })           // end prompt
      
          .then(function(answer) {      //  ( begin then  { begin function(answer)
            switch (answer.action) {
            case "View Products for Sale":
              artistSearch();
              break;
      
            case "View Low Inventory":
              multiSearch();
              break;
      
            case "Add to Inventory":
              rangeSearch();
              break;
      
            case "Search for a specific song":
              songSearch();
              break;
      
            case "Find artists with a top song and top album in the same year":
              songAndAlbumSearch();
              break;
            }     // } end switch
          });         //  }end  inquirer function(answer)  ) end  inquirer .then
      } 





    
function viewProductsforSale(){


}






}