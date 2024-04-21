const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('NASCO Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let employees = []; // This will act as our in-memory database
let currentId = 0;

app.post('/employees', (req, res) => {
    const { name, department, email } = req.body;
    const newEmployee = { id: ++currentId, name, department, email };
    employees.push(newEmployee);
    res.status(201).send(newEmployee);
});

app.get('/employees', (req, res) => {
    res.status(200).send(employees);
});

app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, department, email } = req.body;
    const employee = employees.find(emp => emp.id === parseInt(id));
    if (employee) {
        employee.name = name;
        employee.department = department;
        employee.email = email;
        res.send(employee);
    } else {
        res.status(404).send({ message: 'Employee not found' });
    }
});

app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        employees.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Employee not found' });
    }
});

app.get('/employees/count', (req, res) => {
    const count = employees.length;
    res.json({ count });
});