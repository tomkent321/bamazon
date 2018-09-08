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

  runStore();
});

function runStore(){

function showInventory(){

    var query = "SELECT * FROM products";  //query without variable

    //this line takes the query, replaces the ? from var query with object, res is the result  
    connection.query(query, function(err, res) {
        console.log("\n");
                
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_Id + ". " + res[i].product_name + "   \t$" + (res[i].price).toLocaleString('en'));
        //console.log(res[i].item_Id + ". " + res[i].product_name + "   \t$" + parseFloat(res[i].price).toFixed(2).toLocaleString('en'));
      }
        console.log("\n");
      inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID number of the product you wish to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(answer){






        var description = res[answer.item-1].product_name;
        console.log("description: " + description);
        
        var priceEa = res[answer.item-1].price;
        var itemNum = answer.item;
        var inStock = res[answer.item-1].stock_quantity;
        var orderQuantity = answer.quantity;
2

        console.log("\n\nYou have ordered: " + answer.quantity + " of item #" + answer.item + ". " + description);
     
        if(answer.quantity > res[answer.item-1].stock_quantity){
            console.log("\n\nSorry! We have insufficient quantity to fulfill your order.\nWould you like to order something else?\n");
            

            inquirer
            .prompt([
              {         //begin prompt
                name: "continue",
                type: "rawlist",
                message: "\nTry another aircraf?\n",
                choices: [
                  "Yes",
                  "No"
                
                ]
              }
              ])
            .then(answer => {
              if(answer.continue == "Yes") {
                
                showInventory();
              } else{
                console.log("Thank you for shopping at Al's Aircraft Barn!");
                return;
              }
          
    
          });
            
        } else {
            //console.log("in stock: ",res[answer.item-1].stock_quantity );
            
            var query = "UPDATE products SET stock_quantity = ? WHERE item_Id = ?" ;  
 
            connection.query(query, [(inStock - orderQuantity), itemNum],function(err, res) {

                //console.log("Inventory updated!");
                console.log("\n** Order Complete ** \n\nYou have purchased: " + orderQuantity + " " + description + "(s) at $" + priceEa.toLocaleString('en') + " each \n------------------------------------\nTotal: $" + (orderQuantity * priceEa).toLocaleString('en'));  
                


                inquirer
                .prompt([
                  {         //begin prompt
                    name: "continue",
                    type: "rawlist",
                    message: "\nBuy another aircraf?\n",
                    choices: [
                      "Yes",
                      "No"
                    
                    ]
                  }
                  ])
                .then(answer => {
                  if(answer.continue == "Yes") {
                    
                    showInventory();
                  } else{
                    console.log("Thank you for shopping at Al's Aircraft Barn!");
                    return;
                  }
              
        
              });






              });
             
        }


    })

     
    });
    
} //end of showInventory()

showInventory(); 
}//end of runStore()



