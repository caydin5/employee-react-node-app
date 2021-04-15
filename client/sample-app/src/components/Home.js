import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './Home.css';
import { Button, Card, CardHeader, CardBody, CardTitle, CardText, Collapse, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export const Home = ()=> {
    // Set states
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState(0);  
    const [newsalary, setNewsalary] = useState(0); 
    const [employeeList, setEmployeeList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Post the employee info as json using Axios
    // THEN update the employee list instantly
    const addEmployee = (id) => {
        Axios.post("http://localhost:3001/create", {
            name: name,
            position: position,
            experience: experience,
            salary: salary,
        }).then((response) => {
            setEmployeeList(
                response.data.map((val) => {
                return val.id === id
                    ? {
                        id: val.id,
                        name: val.name,
                        position: val.position,
                        experience: val.experience,
                        salary: val.salary,
                    }
                    : val;
                })
            );
        })
        };
    
    // Get the employee list from the back-end
    const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
            setEmployeeList(response.data);
        });
        setIsOpen(!isOpen);
    };

    // Make a request to update salary
    const updateEmployeesalary = (id) => {
        Axios.put("http://localhost:3001/update", { salary: newsalary, id: id }).then(
            (response) => {
            setEmployeeList(
                employeeList.map((val) => {
                return val.id === id
                    ? {
                        id: val.id,
                        name: val.name,
                        position: val.position,
                        experience: val.experience,
                        salary: newsalary,
                    }
                    : val;
                })
            );
            }
        );
    };
    
    // Delete an employee by id
    const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setEmployeeList(
            employeeList.filter((val) => {
                return val.id !== id;
            })
            );
        });
    };

    return (
        <div className="App">
        <Card>
            <CardHeader>Add Employee</CardHeader>
            <CardBody>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input type="text" id="Name"
                        onChange={(event) => {
                        setName(event.target.value);
                        }}/>
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Position</InputGroupText>
                </InputGroupAddon>
                <Input type="text" id="Position"
                        onChange={(event) => {
                        setPosition(event.target.value);
                        }}/>
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Experience (years)</InputGroupText>
                </InputGroupAddon>
                <Input type="number" id="Experience"
                        onChange={(event) => {
                        setExperience(event.target.value);
                        }}/>
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Salary (per year)</InputGroupText>
                </InputGroupAddon>
                <Input type="number" id="Salary"
                        onChange={(event) => {
                        setSalary(event.target.value);
                        }}/>
            </InputGroup>
            <br />
            <div className="info">
                <Button onClick={addEmployee}>Add Employee</Button><br />
            
            <Button onClick={getEmployees}>Show / Hide Employees</Button>
            </div></CardBody> </Card>
            <div className="employees">
            
            <Collapse isOpen={isOpen}>
                <br />
                <Card>
                <CardHeader>Employee List</CardHeader>
                {employeeList.map((val, key) => {
                    return (
                        <div key={key}>
                            <Card>
                            <CardBody>
                                <CardTitle tag="h5">{val.name}</CardTitle>
                                <CardText><li>{val.position}</li>
                                <li>{val.experience} year(s) of experience</li>
                                <li>${val.salary} per year</li></CardText>
                            <div>
                                <InputGroup>
                                    <InputGroupAddon addonType="append"><Button onClick={() => {
                                updateEmployeesalary(val.id);
                                }}>Update Salary</Button></InputGroupAddon>
                                    <Input type="text" onChange={(event) => {
                                    setNewsalary(event.target.value);
                                    }}/>
                                </InputGroup> <br />
            
                            <Button outline color="danger"
                                onClick={() => {
                                deleteEmployee(val.id);
                                }}
                            >
                                Remove Employee
                            </Button>
                            </div>
                            </CardBody>
                            </Card>
                        </div>
                    );
                })}
                </Card>
            </Collapse>
            </div>
        </div>
    );
}

export default Home;