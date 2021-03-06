//used activities from hw 12 for references and help with code: 
// greatBay and iceCreamCRUD. I did google some things but I 
// can't remember if I used any of it in my code, will try to 
//be bettter about referencing it in the future.

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
  connection.query("SELECT * FROM role", function (err, res) {
    if(err) throw err;
    console.log("\n");
    console.table(res);
    addRole();
  });
};

function viewEmployees() {
  connection.query("SELECT * FROM employees", function(err, res) {
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
      message: "would you like to add a new department?",
    },
    {
      name: "department",
      type: "input",
      message: "what is the name of your new department?"
    },
    {
      name: "id",
      type: "input",
      message: "what is your new department's ID number?"
    }
      ]).then(function(answer) {
        var query = connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department,
            id: answer.departmentNumber
          },
          function(err, res) {
            if (err) throw err;
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
    var query = connection.query (
      "INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id
      },
      function(err, res) {
        if (err) throw err;
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
      message: "what is your employee's role ID number?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "what is your employee's manager's ID number"
    }
  ]).then(function(answer) {
    var query = connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id
      },
      function(err, res) {
        if (err) throw err;
      console.log("new employee added");
      updateEmployee();
    });
  });
}

function updateEmployee() {
  inquirer.prompt([
  {
    name: "first_name",
    type: "input",
    message: "what is your employee's first name?"
  },
  {
    name: "last_name",
    type: "input",
    message: "what is your employee's last name"
  },
  {
    name: "role_id",
    type: "input",
    message: "what is your employee's role ID number?"
  },
  {
    name: "manager_id",
    type: "input",
    message: "what is your employee's manager's ID number"
  }
]).then(function(answer) {
  var query = connection.query(
    "UPDATE employees SET ? WHERE ?",
    {
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: answer.role_id,
      manager_id: answer.manager_id
    },
    function(err, res) {
      if (err) throw err;
    console.log("new employee added");
    start();
  });
});
}

