const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  // Database you're working with   
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "question",
            message: "What would you like to do?",
            choices: [
                "Add Department", "Add Role", "Add Employee",
                "View All Employees by Department", 
                "View All Employees by Roles", "Update Employee",
                "View All Employees by Manager", "Delete Department", 
                "Delete Role", "Delete Employee", "View Total Budget",
                "Exit"
            ]
        }
    ]).then(userChoice => {
        console.log(userChoice.question);
        if(userChoice.question === "Add Department"){
            addDepartment();
        }else if(userChoice.question === "Add Role"){
            addRole()
        }else if(userChoice.question === "Add Employee"){
            addEmployee();
        }else if(userChoice.question === "View All Employee's by Roles?"){
            viewAllRoles();
        }else if(userChoice.question === "View All Employees by Department"){
            viewAllDepartments();
        }else if(userChoice.question === "View All Employees by Manager"){
            viewAllManagers();
        }else if(userChoice.question === "Delete Role"){
            deleteRole();
        }else if(userChoice.question === "Delete Department"){
            deleteDepartment();
        }else if(userChoice.question === "Delete Employee"){
            deleteEmployee();
        }else if(userChoice.question === "Update Employee"){
            updateEmployee();
        }else if(userChoice.question === "View Total Budget"){
            viewTotalBudget();
        }else if(userChoice.question === "Exit"){
            exit();
        }
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What is the department you'd like to add?"
        }
    ]).then( userChoice => {
        connection.query("INSERT INTO department SET ?", {name: userChoice.dept},  function(err, userChoice) {
            if (err) throw err;
            console.table(userChoice);
            start();
      })
    });
}

function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, userChoice) {
      inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "What is the role's Title?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is the Salary?"
  
          } 
      ]).then(function(userChoice) {
          connection.query("INSERT INTO role SET ?",
              {
                title: userChoice.title,
                salary: userChoice.salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(userChoice);
                  start();
              }
          )
      });
    });
}

function addEmployee() {
    inquirer.prompt([       
        {
            type: "input",
            name: "first_name",
            message: "What is their first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is their last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is their role?",
            choices: selectRole()
        },
        {
            type: "rawlist",
            name: "manager_id",
            message: "What is their manager's id?",
            choices: selectManager()
        }
    ]).then( userChoice => {
        connection.query("INSERT INTO employee SET ?", 
        {first_name: userChoice.first_name,
         last_name: userChoice.last_name,
         role_id: userChoice.role_id,
         manager_id: userChoice.manager_id
        },  function(err, userChoice) {
                if (err) throw err;
                console.log(userChoice);
                start();
        })
    });
}

var roleArr = [];

function selectRole(){
    connection.query("SELECT * FROM role", function (err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
}

var managersArr = [];

function selectManager(){
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", 
    function (err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
}

function viewAllRoles(){

}

function viewAllDepartments(){
    
}

function viewAllManagers(){

}

function viewTotalBudget(){

}

function deleteRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What department is the role in?" 
        },
        {
            type: "input",
            name: "role",
            message: "What is the role you'd like to delete?"
        }
    ]).then(userChoice => {
        connection.query("DELETE FROM role WHERE title=?", [userChoice.title], function(err, userChoice) {
            if(err) throw err;
            console.log(userChoice);
            start();
        })
    })
}

function deleteDepartment(){

}

function deleteEmployee(){

}

function updateEmployee(){

}

function exit() {
    connection.end();
}