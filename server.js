var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
  userQuestions();
});

function userQuestions() {
  inquirer
.prompt([
    {
      type: "rawlist",
      name: "options",
      message: "what would you like to do?",
      choices: [
          "view all departments",
          "add a new department",
          "view all roles",
          "add a new role",
          "view all employees",
          "add a new employee",
          "update an employee",
          "quit"
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
      case "update an employee":
          updateEmployee();
      case "quit":
          quit();
    }
  });
}

function viewDepartment() {
  var query = "SELECT * FROM employee_DB.department;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    userQuestions();
  });
};


function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "add a new department"
    }
  ]).then(function(answer) {
    const sqlQuery = "INSERT INTO department SET (name) VALUES";
    connection.query(query, [answer.department], function(err, res) {
      console.log("new department added");
      userQuestions();
    });
  });
}


function viewRoles() {
  var query = "SELECT * FROM employee_DB";
  connection.query(query, function (err, res) {
    if(err) throw err;
    console.log("view roles...\n");
    console.table(res);
    userQuestions();
  });
};

function addRole() {
  inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "add new role"
    },
    {
      name: "salary",
      type: "input",
      message: "include a salary for your new role"
    },
    {
      name: "department_id",
      type: "input",
      message: "what is this role's department id?"
    } 
  ]).then(function(answer) {
    const query = "INSERT INTO role (title, salary, department_id) VALUES";
    connection.query(query, [answer.role, answer.salary, answer.department_id],
      function(err, res) {
        console.log("new role added");
        userQuestions();
      });
  });
}

function viewEmployees() {
  var query = "SELECT * FROM employees";
  connection.query(query, function(err, res) {
      if(err) return err;
      console.log("view employees...\n");
      console.table(res);
      userQuestions();
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "add your new employee's name"
    },
    {
      name: "last_name",
      type: "input",
      message: "add your employee's last name"
    },
    {
      name: "role_id",
      type: "input",
      message: "what is your new employee's role?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "what is the manager id of your new employee"
    }
  ]).then(function(answer) {
    const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES";
    connection.query(querry, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
    function (err, res) {
      console.log("new employee added");
      userQuestions();
    });
  });
}
    
function quit() {
  connection.end();
}