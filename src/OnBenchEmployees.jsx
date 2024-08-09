import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';

const OnBenchEmployees = () => {

  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();
  const [employee, setEmployee] = useState(location.state || {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    skillSet: '',
    communicationAddress: {
      houseNumber: '',
      pincode: '',
      area: '',
      village: '',
      district: '',
      state: '',
      country: ''
    },
    highestEducation: '',
    ssnPan: '',
    dateOfBirth: new Date(),
    passportAadharNumber: '',
    passportExpireDate: new Date(),
    salaryType: '',
    payPerHour: '',
    fixedPay: '',
    hireDate: new Date(),
    totalExperience: ''
  });
  const [employees, setEmployees] = useState(location.state ? location.state.employees : []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(employees.map((emp, index) => (index === editIndex ? employee : emp)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEmployees([...employees, employee]);
    }
    setEmployee({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
      skillSet: '',
      communicationAddress: {
        houseNumber: '',
        pincode: '',
        area: '',
        village: '',
        district: '',
        state: '',
        country: ''
      },
      highestEducation: '',
      ssnPan: '',
      dateOfBirth: new Date(),
      passportAadharNumber: '',
      passportExpireDate: new Date(),
      salaryType: '',
      payPerHour: '',
      fixedPay: '',
      hireDate: new Date(),
      totalExperience: ''
    });
  };

  const handleInputChange = (e, field, subfield = null) => {
    const value = e.target ? e.target.value : e;
    if (subfield) {
      setEmployee({
        ...employee,
        [field]: {
          ...employee[field],
          [subfield]: value
        }
      });
    } else {
      setEmployee({
        ...employee,
        [field]: value
      });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setSelectedEmployee(employees[index]);
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
    if (selectedEmployee && index === employees.indexOf(selectedEmployee)) {
      setSelectedEmployee(null); 
    }
  };

  const handleEmployeeClick = (index) => {
    setSelectedEmployee(selectedEmployee === employees[index] ? null : employees[index]);
  };
  

  const handleAssignProject = () => {
    // Navigate to ClientDetails.jsx file
    navigate('/client-details');
  };
  
  const {
    firstName,
    lastName,
    phone,
    email,
    role,
    skillSet,
    communicationAddress,
    highestEducation,
    ssnPan,
    dateOfBirth,
    passportAadharNumber,
    passportExpireDate,
    salaryType,
    payPerHour,
    fixedPay,
    hireDate,
    totalExperience
  } = employee;

  return (
    <div className="OnBenchEmployees-container">
      <h4 style={{color:'black'}}>On Bench Employee Details</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
            </tr>
            {/* Add more table headers as needed */}
          
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
                      <button onClick={() => handleEdit(index)}><i className="fa fa-pencil-square-o"></i></button>
                      <button onClick={() => handleDelete(index)}><i className="fa fa-trash"></i></button>
                      <button onClick={() => handleAssignProject(index)}>Assign Project</button>
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
              {/* Add more details */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OnBenchEmployees;
