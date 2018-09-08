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
  var thisSale = [];
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

        for(var i = 0; i < res.length; i++){

          if (res[i].item_Id == answer.item){
            var id = res[i].item_Id;
            var description = res[i].product_name;
            var priceEa = res[i].price;
            var inStock = res[i].stock_quantity;

          }

        }

        console.log("\n\nYou have ordered: " + answer.quantity + " of item #" + answer.item + ". " + description);
     
        //if(answer.quantity > res[answer.item-1].stock_quantity){
          if(answer.quantity > inStock){  
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
 
            //connection.query(query, [(inStock - orderQuantity), itemNum],function(err, res) {
              connection.query(query, [(inStock - answer.quantity), answer.item],function(err, res) {

                //console.log("Inventory updated!");
                console.log("\n** Order Complete ** \n\nYou have purchased: " + answer.quantity + " " + description + "(s) at $" + priceEa.toLocaleString('en') + " each \n------------------------------------\nTotal: $" + (answer.quantity * priceEa).toLocaleString('en'));  
                
                thisSale.push({id: id,
                              description: description,
                              quantity: answer.quantity,
                              price: priceEa,
                                              });

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

                    console.log(" \t\t****** Your total purchase this session  ********\n");
                    console.log(" \tid\tQty\tdescription\teach\t\t         total");
                    console.log(" \t--\t----\t--------------\t----------\t\t-----------");
                    
                        var totalPrice = 0;

                    for (var key in  thisSale) {
                    
                      
                      console.log(" \t" + thisSale[key].id + " \t" + thisSale[key].quantity + " \t" + thisSale[key].description + " \t $" + parseFloat((thisSale[key].price).toFixed(2)).toLocaleString().replace(/\.([0-9])$/, ".$10") + " \t\t$" + parseFloat((thisSale[key].quantity * thisSale[key].price).toFixed(2)).toLocaleString().replace(/\.([0-9])$/, ".$10")) ;

                      totalPrice += (thisSale[key].quantity * thisSale[key].price);
                    }

                    console.log(" \t-----------------------------------------------------------------------");
                    console.log("\tTotal                                                   $" + parseFloat((totalPrice).toFixed(2)).toLocaleString().replace(/\.([0-9])$/, ".$10"));
                    console.log("\n\nThank you for shopping at Al's Aircraft Barn!");
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



