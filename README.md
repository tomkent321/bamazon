<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
</head>
<body>
    <h1>Bamazon Application</h1>
    <br>
    <h2>Contents</h2>
    <ul>
        <li><a href="#Description" title="Project Descriptions">What Bamazon Does</a></li>
        <li><a href="#Useful" title="Usefulness">Why Bramazon is useful</a></li>
        <li><a href="#Start" title="Get Started">Getting Started with Bamazon</a></li>
        <li><a href="#Help" title="Help">Help with Bamazon</a></li>
        <li><a href="#Maintain" title="Maintenance">Maintenance of Bamazon</a></li>
    </ul>
    <br>
    <br>
    <br>
    <hr>
<h2 id="Description">What Bamazon Does</h2>
    <p>Bamazon is a take off of the Amazon shopping site designed with a command line interface to simulate an aircraft sales store.</p>
    <p>The program is linked by each node to 2 mySql databases. </p>
    <p>The interface uses three different nodes to simulate different users of the site:</p>
    <br>
    <br>
    <br>

<h3>Customer Interface</h3>
    <p>The Customer interface allows the customer to see the entire inventory and then order the product he/she chooses.</p> 
    <img src="Customer.jpg" alt="Customer Interface">
    <p>The customer can then choose to buy another product</p>
    <img src="CustomerResponse1.jpg" alt="Customer Response 1" >
    <p>When he has ordered all the desired products, The interface shows a summary of all products purchased. </p>
<br>
<br>
<br>

<h3>Manager Interface</h3>
    <p>The Manager interface allows the Manager to perform various managment function.</p> 
    <img src="Mgr1.jpg" alt="Mgr Interface">
    <h4>View Products</h4>
    <p>This is an expanded view of the store inventory</p>
    <img src="Mgr2.jpg" alt="Mgr2" >
    <h4>View Low Inventory</h4>
    <p>Shows products with less than 5 in stock</p>
    <img src="Mgr3.jpg" alt="Mgr3" >
    <h4>Add to Inventory</h4>
    <p>Allows the Manager to add stock to an existing product</p>
    <img src="Mgr4.jpg" alt="Mgr4" >
    <h4>Add New Product</h4>
    <p>Allows the Manager to add a new product to the inventory</p>
    <img src="Mgr5.jpg" alt="Mgr5" >
        <br>
        <br>
        <br> 
        <h3>Supervisor Interface</h3>
    <p>The Supervisor interface allows the Supervisor to perform various high-level functions.</p> 
    <img src="Sup1.jpg" alt="Sup Interface">
    <h4>View Product Sales by Department</h4>
    <p>This display links the data of both mySql tables and generates a profit field on the fly.</p>
    <p>It features a more realistic overhead calculated by a percentage of sales.</p>
    <img src="Sup2.jpg" alt="Sup2" >
    <h4>Create a new department</h4>
    <p>Allows (only) a supervisor to create a new product department</p>
    <p>A manager adding to inventory must enter a valid department based on the supervisor's department database.</p>
    <img src="Sup3.jpg" alt="Sup3" >
    <h4>Value of All Inventory</h4>
    <p>This is a value-added display which shows the total value of each product's inventory.</p>
    <img src="Sup4.jpg" alt="Sup4" >
    <p>It then calculates and displays the total inventory for the entire store.</p>
    <img src="Sup5.jpg" alt="Sup5" > 
        <br>
        <br>
        <br>
<hr>
<h2 id="Useful">Why Bamazon is Useful</h2>
<p>Bamazon is very useful in illustrating the way a node server can connect with a database.</p>
<p>It also helps to illustrate the use of various NPM packages such as:</p>
    <ul>
        <li>"mysql"</li>
        <li>"inquirer"</li>
        <li>"cli-table3</li>
    </ul>
<p>Finally it is a great exercise in learning various mysql query structures.</p>
<img src="Use1.jpg" alt="Use1" >
<br>
<br>
<br>

<hr>
<h2 id="Start">How to Get Started with Bamazon</h2>
<p>Simply open the schema.sql file and generate the databases</p>
<p>Then install the required NPM packages by running NPM install</p>
<p>You should then be able to run your own aviation store!</p>

    
<img src="Start1.jpg" alt="Start" >
<br>
<br>
<br>

<hr>
<h2 id="Help">Help with Bamazon</h2>
<p>This is such a simple applicaton that it probably won't require much help.</p>
<p>Stackoverflow as always is a great help in diagnosing questions.</p>

<hr>
<h2 id="Maintain">Maintaining Bamazon</h2>
<p>As a one time class project this will not likely be revised or maintained.</p>
<p>Thanks for looking through it!</p>
        
            
        

</body>
</html>