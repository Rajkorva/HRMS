import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const _1099 = () => {
  const location = useLocation();
  const initialState = location.state && location.state.employees ? location.state : { employees: [] };
  const { employees: initialEmployees, employementType } = initialState;
  const [employees, setEmployees] = useState(employementType === '1099' ? initialEmployees : []);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (initialState.employees && employementType === '1099') {
      setEmployees(initialState.employees);
    }
  }, [initialState, employementType]);

  const handleEmployeeClick = (index) => {
    setSelectedEmployee(selectedEmployee === employees[index] ? null : employees[index]);
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setSelectedEmployee(employees[index]);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
    if (selectedEmployee && index === employees.indexOf(selectedEmployee)) {
      setSelectedEmployee(null); 
    }
  };

  return (
    <div>
      <h4>Employees List</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {[...new Set(employees.map(emp => emp.firstName + emp.lastName))].map((name, index) => {
            const emp = employees.find(emp => emp.firstName + emp.lastName === name);
            return (
              <tr key={index}>
                <td onClick={() => handleEmployeeClick(index)}>{`${emp.firstName} ${emp.lastName}`}</td>
                
                {/* Add more details as needed */}
                <td>
                  {!isEditing && (
                    <>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
              
            );
          })}
        </tbody>
      </table>

      {selectedEmployee && (
        <div>
          <h4>Selected Employee Details</h4>
          <table>
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{selectedEmployee.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{selectedEmployee.lastName}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{selectedEmployee.phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{selectedEmployee.email}</td>
              </tr>
              <tr>
                <td>Role/Designation:</td>
                <td>{selectedEmployee.role}</td>
              </tr>
              <tr>
                <td>Skill Set:</td>
                <td>{selectedEmployee.skillSet}</td>
              </tr>
              <tr>
                <td>Communication Address:</td>
                <td>
                  {`${selectedEmployee.communicationAddress.houseNumber}, ${selectedEmployee.communicationAddress.area}, ${selectedEmployee.communicationAddress.city}, ${selectedEmployee.communicationAddress.state}, ${selectedEmployee.communicationAddress.country}`}
                </td>
              </tr>
              <tr>
                <td>Highest Education:</td>
                <td>{selectedEmployee.highestEducation}</td>
              </tr>
              <tr>
                <td>SSN/PAN:</td>
                <td>{selectedEmployee.ssnPan}</td>
              </tr>
              <tr>
                <td>Date Of Birth:</td>
                <td>{selectedEmployee.dateOfBirth.toDateString()}</td>
              </tr>
              <tr>
                <td>Passport/Aadhar Number:</td>
                <td>{selectedEmployee.passportAadharNumber}</td>
              </tr>
              <tr>
                <td>Password Expire Date:</td>
                <td>{selectedEmployee.passportExpireDate.toDateString()}</td>
              </tr>
              <tr>
                <td>Employement Type:</td>
                <td>{selectedEmployee.employementType}</td>
              </tr>
              <tr>
                <td>Tentative Start Date:</td>
                <td>{selectedEmployee.hireDate.toDateString()}</td>
              </tr>
              <tr>
                <td>Total Experience:</td>
                <td>{selectedEmployee.totalExperience}</td>
              </tr>
              {/* Add other details */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default _1099;
