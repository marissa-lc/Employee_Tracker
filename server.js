var mysql = require("mysql");
var inquirer = require("inquirer");

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
  start();
});

function start() {
  inquirer
.prompt([
    {
      type: "list",
      name: "options",
      message: "what would you like to do?",
      choices: [
          "view all departments",
          "view all roles",
          "view all employees",
      ]
    }
]).then(function(answer) {
  if(answer.options === "view all departments") {
    viewDepartment();
  }
  else if(answer.options === "view all roles") {
    viewRoles();
    } 
  else if(answer.options === "view all employees") {
    viewEmployees();
  } else{
    connection.end();
    }
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    addDepartment();
  });
};

function viewRoles() {
  var query = "SELECT * FROM employee_DB.role;";
  connection.query(query, function (err, res) {
    if(err) throw err;
    console.log("\n");
    console.table(res);
    addRole();
  });
};

function viewEmployees() {
  var query = "SELECT * FROM employee_DB.employees;";
  connection.query(query, function(err, res) {
      if(err) return err;
      console.log("\n");
      console.table(res);
      addEmployee();
  });
};

function addDepartment() {
  inquirer.prompt([
    {
      name: "newDepartment",
      type: "input",
      message: "would you like to add a new departmnet?",
    },
    {
      name: "department",
      type: "input",
      message: "what is the name of your new department?"
    },
    {
      name: "departmentNumber",
      type: "input",
      message: "what is your new department's ID number?"
    }
      ]).then(function(answer) {
        const query = "INSERT INTO department SET (department,departmentID) VALUES";
        connection.query(query, [answer.department, answer.departmentNumber], 
          function(err, res) {
          console.log("new department added");
          start();
          });
      });
  }      


function addRole() {
  inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "would you like to add a new role?"
    },
    {
      name: "title",
      type: "input",
      message: "what is the name of your new role?"
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
        start();
      });
  });
}


function addEmployee() {
  inquirer.prompt([
    {
      name: "newEmployee",
      type: "input",
      message: "would you like to add a new employee?"
    },
    {
      name: "first_name",
      type: "input",
      message: "what is your new employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "what is your new employee's last name"
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
    connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
    function (err, res) {
      console.log("new employee added");
      start();
    });
  });
}
    
function quit() {
  connection.end();
}