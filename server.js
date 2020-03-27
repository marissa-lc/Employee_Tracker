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
          "update a employee",
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
    console.log("view our departments...\n");
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

// function updateEmployee() {
//   inquirer.prompt([
//     {
//         name: "first_name",
//         type: "input",
//         message: "what is your employee's first name"
//       },
//       {
//         name: "last_name",
//         type: "input",
//         message: "add your employee's last name"
//       },
//       {
//         name: "role_id",
//         type: "input",
//         message: "what is your employee's new role?"
//       },
//       {
//         name: "manager_id",
//         type: "input",
//         message: "what is your employee's new id number"
//       }
//     ]).then(function(answer) {
//       var query = "UPDATE emplyee SET "
//     })

    
function quit() {
  connection.end();
}






// function addDepts() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "department",
//                 message: "What department do you want to add?"
//             }
//         ]).then(answers => {
//             // Use user feedback for... whatever!!
//             const sqlQuery = `INSERT INTO DEPARTMENT (NAME) VALUES ('${answers.department}')`;
//             connection.query(sqlQuery, function (err, result, fields) {
//                 if (err) throw err;
//                 console.log(`Department ${answers.department} added`);
//                 goToQuestions();
//             });
//         });
// };

// function viewRoles() {
//     console.log("The roles are: ");
//     connection.query("SELECT ID, TITLE FROM ROLES", function (err, result) {
//         if (err) throw err;
//         console.table(result);
//         goToQuestions();
//     });
// };

// function addRoles() {
//     inquirer
//     .prompt([
//         {
//             type: "input",
//             name: "role",
//             message: "What role do you want to add?"
//         },
//         {
//             type: "input",
//             name: "salary",
//             message: "What is the salary for this role?"
//         },
//         {
//             type: "input",
//             name: "dept",
//             message: "What is the department ID for this role?"
//         }
//     ]).then(answers => {
//         // Use user feedback for... whatever!!
//         const sqlQuery = `INSERT INTO Roles (TITLE, SALARY, DEPT_ID) VALUES ('${answers.role}', '${answers.salary}', '${answers.dept}')`;
//         connection.query(sqlQuery, function (err, result, fields) {
//             if (err) throw err;
//             console.log(`Role ${answers.role} added`);
//             console.log (`Salary of ${answers.salary} added`);
//             console.log(`Role in department ID: ${answers.dept}`);
//             goToQuestions();
//         });
//     });
// };

// // mAYBE USE MULTIPLE VARIABLES FOR THE QUERIES
// // const query1 = "SELECT .... FROM EMPLOYEES"
// // const query2 = "SELECT .... FROM DEPARTMENTS"
// // connection.query (query1, query2) & then somehow joing them?
// function viewEmployees() {
//     console.log("The employees are: ");
//     connection.query("SELECT * FROM EMPLOYEES", function (err, result) {
//         if (err) throw err;
//         console.table(result);
//         goToQuestions();
//     });
// };

// function addEmployee() {
//     inquirer
//     .prompt([
//         {
//             type: "input",
//             name: "firstName",
//             message: "What is the employee's first name?"
//         },
//         {
//             type: "input",
//             name: "lastName",
//             message: "What is the employee's last name?"
//         },
//         {
//             type: "input",
//             name: "roleID",
//             message: "What is the role ID for this employee?"
//         },
//         {
//             type: "input",
//             name: "managerID",
//             message: "What is the manager ID for this employee?"
//         }
//     ]).then(answers => {
//         // Use user feedback for... whatever!!
//         const sqlQuery = `INSERT INTO EMPLOYEES (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.roleID}', '${answers.managerID}')`;
//         connection.query(sqlQuery, function (err, result, fields) {
//             if (err) throw err;
//             console.log(`Employee ${answers.firstName} ${answers.lastName} added`);
//             console.log (`Role ID of ${answers.roleID} added`);
//             console.log(`Manager ID of ${answers.managerID} added`);
//             goToQuestions();
//         });
//     });
// };

// // IS THERE A WAY TO CREATE A LIST OF OPTIONS IN THE DB?
// // SO LIKE LISTING OFF THE CURRENT EMPLOYEES FOR THE USER?
// function updateRole() {
//     console.log("Choose employee to update role");
//     inquirer
//     .prompt([
//         {
//             type: "input",
//             name: "employeeID",
//             message: "What is the employee's ID?"
//         },
//         {
//             type: "input",
//             name: "roleID",
//             message: "What is the employee's new role ID?"
//         }
//     ]).then(answers => {
//         const sqlQuery = `UPDATE EMPLOYEES SET ROLE_ID = ${answers.roleID} WHERE ID = ${answers.employeeID}`;
//         connection.query(sqlQuery, function (err, result, fields) {
//             if (err) throw err;
//             console.log(`Employee # ${answers.employeeID} updated`);
//             console.log (`Role ID now ${answers.roleID}`);
//             goToQuestions();
//         });
//     });
    
// };

// function quit() {
//     console.log("quitting");
//     connection.end();
//     process.exit();
// }

// function goToQuestions() {
//     inquirer
//         .prompt([
//             {
//                 type: "list",
//                 name: "choices",
//                 message: "Return to menu or quit?",
//                 choices: [
//                     "Return to menu",
//                     "Quit"
//                 ]
//             }
//         ]).then(function (answers) {
//                 switch (answers.choices) {
//                     case "Return to menu":
//                         askQuestions();
//                         break;
//                     case "Quit":
//                         quit();
//                         break;
//                     default:
//                         console.log("Not a valid option")
//                 }
//             });

        
// }