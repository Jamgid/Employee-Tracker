const inquirer = require("inquirer");
const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  // Your port
  port: 3306,
  user: "root",
  // Your password
  password: "rootroot",
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
                "View All Employees by Role", 
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Department", 
                "Add Role", 
                "Add Employee", 
                "Delete Role", 
                "Delete Department", 
                "Delete Employee", 
                "Exit"
            ]
        }
    ]).then(userChoice => {
        console.log(userChoice.question);
        if(userChoice.question === "View All Employees by Role"){
            viewAllRoles();
        }else if(userChoice.question === "View All Employees by Department"){
            viewAllDepartments();
        }else if(userChoice.question === "View All Employees by Manager"){
            viewAllManagers();
        }else if(userChoice.question === "Add Department"){
            addDepartment();
        }else if(userChoice.question === "Add Role"){
            addRole()
        }else if(userChoice.question === "Add Employee"){
            addEmployee();
        }else if(userChoice.question === "Delete Role"){
            deleteRole();
        }else if(userChoice.question === "Delete Department"){
            deleteDepartment();
        }else if(userChoice.question === "Delete Employee"){
            deleteEmployee();
        }else if(userChoice.question === "Exit"){
            exit();
        }
    })
}
// == VIEW ============================================================================================
function viewAllRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title, role.salary AS Salary FROM employee LEFT JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    start()
  })
}

function viewAllDepartments(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    start()
  })
}

function viewAllManagers(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
  })
}
// == ADD ============================================================================================
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What is the department you'd like to add?"
        }
    ]).then( userChoice => {
        connection.query("INSERT INTO department SET ?",  {name: userChoice.dept},  
            function(err, userChoice) {
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
          },
          {
            type: "list",
            name: "dept",
            message: "What department is it in?",
            choices: selectDept()
          }
      ]).then(function(userChoice) {
            connection.query("INSERT INTO role SET ?",
              {
                title: userChoice.title,
                salary: userChoice.salary,
                department_id: userChoice.dept.id
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
          name: "first_name",
          type: "input",
          message: "What is their first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is their last name?"
        },
        {
          name: "role",
          type: "list",
          message: "What is their role?",
          choices: selectRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (userChoice) {
      var roleId = selectRole().indexOf(userChoice.role) + 1
      var managerId = selectManager().indexOf(userChoice.manager) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: userChoice.first_name,
          last_name: userChoice.last_name,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(userChoice)
          start()
      })

  })
}

var roleArr = [];
// == SELECT ============================================================================================
function selectRole(){
    connection.query("SELECT * FROM role", function (err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
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
    return managersArr;
}

var departmentArr = [];

function selectDept(){
    connection.query("SELECT * FROM department", function (err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArr.push(res[i]);
        }
    })
    return departmentArr;
}

var employeesArr = [];

function selectEmployee(){
    connection.query("SELECT first_name FROM employee", function (err, res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            employeesArr.push(res[i].first_name);
        }
    })
    return employeesArr;
}

// == DELETE ============================================================================================
function deleteRole(){
    inquirer.prompt([       
        {
            type: "input",
            name: "reason",
            message: "Why do you want to delete this role?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is their role?",
            choices: selectRole()
        }
    ]).then(userChoice => {
        connection.query("DELETE FROM role WHERE title=?", [userChoice.role_id], function(err, userChoice) {
            if(err) throw err;
            console.table(userChoice);
            start();
        })
    })
}

function deleteDepartment(){
    inquirer.prompt([       
        {
            type: "input",
            name: "reason",
            message: "Why do you want to delete this department?"
        },
        {
            type: "list",
            name: "department_name",
            message: "What is the Department?",
            choices: selectDept()
        }
    ]).then(userChoice => {
        connection.query("DELETE FROM department WHERE name=?", [userChoice.department_name], function(err, userChoice) {
            if(err) throw err;
            console.table(userChoice);
            start();
        })
    })
}

function deleteEmployee(){
    inquirer.prompt([       
        {
            type: "input",
            name: "reason",
            message: "Why do you want to delete this employee?"
        },
        {
            type: "list",
            name: "name",
            message: "What is the Employee's name?",
            choices: selectEmployee()
        }
    ]).then(userChoice => {
        connection.query("DELETE FROM employee WHERE first_name=?", [userChoice.name], function(err, userChoice) {
            if(err) throw err;
            console.table(userChoice);
            start();
        })
    })
}

// == EXIT ============================================================================================
function exit() {
    connection.end();
}