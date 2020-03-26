var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptQuestions();
});

function promptQuestions() {
  inquirer.prompt([
    {
      type: "rawlist",
      name: "options",
      message: "what would you like to do?",
      options: [
          "view all departments",
          "add a new department",
          "view all roles",
          "add a new role",
          "view all employees",
          "add a new employee"
      ]
    }
  ])
  .then(function (answer) {
    switch(answer.options) {
      case "view all departments":
        viewDepartment();
      case "add a new department":
        addDepartment();
      case "view all roles":
        viewRoles();
      case "add a new role":
          addRole();
      case "view all employees":
          viewEmolyees();
      case "add a new employee":
          addEmployee();

    }
  })
}


// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     });
//   }
  
//     startAuction();
    
  




// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       item_name: "new item",
//       category: "new category",
//       starting_bid: 00,
//       highest_bid: 00,
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all  highest bid...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         highest_bid: 0,
//       },
//       {
//         item_name: ""
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       readProducts();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

