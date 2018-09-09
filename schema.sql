



USE bamazon;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  item_Id MEDIUMINT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(60),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INT,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (item_Id)
);


DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  department_Id MEDIUMINT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  over_head_costs DECIMAL(10,2),
  PRIMARY KEY (department_Id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Learjet 60", "turbine", 10200000, 2),
("Cessna 210", "piston", 850000, 6),
("Gulfstream V", "turbine", 25500000, 4),
("Kingair 300", "turboprop", 4500140, 8),
("Gulfstream III", "turbine", 11500000, 3),
("Learjet 35", "turbine", 8500000, 1),
("Bell 47", "helicopter", 250000, 5),
("Cessna 152", "piston", 25000, 12),
("Cessna 182", "piston", 92000, 3),
("Bell Jet Ranger", "helicopater", 1750000, 6);



-- 1
SELECT department_id, products.`department_name`,`over_head_costs`
FROM departments
INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id;

SELECT department_id, products.`department_name`,`over_head_costs`
FROM departments
INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id;





SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS dept_sales  
FROM departments 
INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id;


var query = "SELECT department_name FROM departments";  //query without variable
        connection.query(query, function(err, res) {

          for(var i = 0; i < res.length; i++){
            arrCurDept.push(res[i].department_name);
          }
          console.log(arrCurDept);
          
        }); 



