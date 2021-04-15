// Sample attempt at how routes work

// Handle the functions that will be called when the user navigates through the system
const express = require('express');

const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// Call the function hello.hello when the user's at '/'
// router.post('/create', employeeController.create);
router.get('/employees', employeeController.list);
// router.put('/update', employeeController.update);
// router.delete('/delete', employeeController.delete);

module.exports = router;