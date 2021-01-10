-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Tech");
INSERT INTO department (name)
VALUE ("Entertainment");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Tech Support", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Tech Manager", 180000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Expert Twitch Streamer", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lydia", "Armstrong", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Angelo", "Silva", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Elijah","Knight", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Stuart", "Robinson", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mercedes", "Pearson", 2, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Krystal", "Brock", 4, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kenneth", "White", 7, 6);