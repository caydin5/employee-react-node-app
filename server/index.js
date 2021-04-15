/*
Cors - Make requests to the front-end
Dotenv - Load environment variables
Nodemon - Monitor any file changes to restart the server: dev requirement
Joi - Input validation
*/

// TODO: Redirect db requests to routes


// Load modules
// Express framework to set and maintain routes
const Joi = require('joi');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Call the express function
const app = express();

// Include .env
require('dotenv').config();

// Enable cors to be able to make requests to the front-end
app.use(cors());

// Enable json to receive the body from the front-end
app.use(express.json());

// Set up database
const db = mysql.createConnection({
    user: process.env.USERDB,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

// Make a POST request to the client side to receive the values below
app.post("/create", (req, res) => {
    const name = req.body.name;
    const position = req.body.position;
    const experience = req.body.experience;
    const salary = req.body.salary;

    // JOI Validation test: See if the salary is a number and meets the minimum salary
    const { error } = validateInput(req.body);
    if (error) return console.log(error.details[0].message);

    // Query to add an employee
    db.query(
    "INSERT INTO employees (name, position, experience, salary) VALUES (?,?,?,?)",
    [name, position, experience, salary],
    (err, result) => {
        if (err) {
        console.log(err);
        } else {
            db.query("SELECT * FROM employees where name = ? AND position = ? AND experience = ?;", [name, position, experience], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // Send client the result to the client if there's no error
                    res.send(result);
                }
            });
        
        }
    }
    );
});

// Make a GET request to list all the employees
// No need to specify id as we want to get all the employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        // Send client the result to the client if there's no error
        res.send(result);
    }
});
});
// app.use('/employees', require('../routes/employees'));

// Make a PUT requiest to update an employee's salary
app.put("/update", (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    const schema = Joi.object({
        id: Joi.number(),
        salary: Joi.number()
    });

    // JOI Validation test: See if the salary is a number and meets the minimum salary
    const { error } = validateInput(req.body);
    if (error) return console.log(error.details[0].message);

    db.query(
        "UPDATE employees SET salary = ? WHERE id = ?",
        [salary, id],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // Send client the result to the client if there's no error
            res.send(result);
        }
        }
    );
});

// Make a DELETE request to remove an employee
// Getting only the id parameter of the employee should be enough to delete
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        // Send client the result to the client if there's no error
        res.send(result);
    }
    });
});

// Port which the app will listen on
// Access PORT from environment variables
const PORT = process.env.PORT || 3001;

// Listen to the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// JOI Function for validation
function validateInput(input){
    const schema = Joi.object({
        id: Joi.number(),
        name: Joi.string(),
        position: Joi.string(),
        experience: Joi.string(),
        salary: Joi.number().min(20000)
    });

    return schema.validate(input);
}