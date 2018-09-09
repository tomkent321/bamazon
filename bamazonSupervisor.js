var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');
 
// // instantiate
// var table = new Table({
//     head: ['Dept Id', 'Dept Name', 'Overhead (%)', "Dept Sales" , "Dept Profit"]
//   , colWidths: [14, 14, 15, 20, 20]
// }); 
// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     [1, 'jet', '35%', '$5,519,000.95', '$4,123,899.02'],
//     [1, 'jetprop', '28%', '$5,519,000.95', '$4,123,899.02']
//   , 
// );
// console.log(table.toString());
// // end table


var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
}); 

connection.connect(function(err) {
  if (err) throw err;

  runSupervisor();
});

function runSupervisor(){

    function mainMenu(){
        inquirer
          .prompt({         
            name: "action",
            type: "rawlist",
            message: "\nWhat would you like to do?\n",
            choices: [
              "View Product Sales by Department",
              "Create New Department"
              
            ]
          })       
      
          .then(function(answer) {      
            switch (answer.action) {
            case "View Product Sales by Department":
              viewSalesByDept();
              break;
      
            case "Create New Department":
              createDept();
              break;
      
            // case "Add to Inventory":
            //   addInventory();
            //   break;
      
            // case "Add New Product":
            //   addProduct();
            //   break;
      
            }     
          });         
      } 

      
function viewSalesByDept(){

    var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS dept_sales";  
        query += " FROM departments "; 
        query += "INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id";
     
    connection.query(query, function(err, res) {
        if(err) {
          throw err;
        } else {
          
         
          // instantiate
      var table = new Table({
        head: ['Dept Id', 'Dept Name', 'Overhead (%)', "Dept Sales" , "Dept Profit"]
      , colWidths: [10, 14, 15, 20, 20]
      }); 

      for(var i = 0; i< res.length; i++) {

        var profit = res[i].dept_sales - (res[i].dept_sales * res[i].over_head_costs);

        table.push([res[i].department_id,
                    res[i].department_name,
                    (Math.round(((res[i].over_head_costs * 100) + 0.00001) * 100) / 100) + "%",
                    "$" + (Math.round((res[i].dept_sales + 0.00001) * 100) / 100).toLocaleString('en'),
                    "$" + (Math.round((profit + 0.00001) * 100) / 100).toLocaleString('en')
                    ]);
      }

      console.log("\n                       Al's Aircraft Barn");
      console.log("             *****  Sales and Profit by Department   *****\n");
        
      console.log(table.toString());


        }
        mainMenu();
    });


      
      
} 


function createDept(){
  
    inquirer
    .prompt([
          {
                name: "newDept",
                type: "input",
                message: "What is the name of the new department?"
          },
            {
                name: "overHead",
                type: "input",
                message: "What is the overhead percentage?"
            }
            
      ])
    .then(function(answer){

            var query = connection.query(
              "INSERT INTO departments SET ?",
              {
                department_name: answer.newDept,
                over_head_costs: parseFloat(answer.overHead / 100)
              },
              function(err, res) {
                console.log("\n\nYou have added: " + answer.newDept + " as a new department with an overhead cost of  " + answer.overHead + "%.");
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