import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import EmployeePay from './EmployeePay';
import TaxDeductions from './TaxDeductions';
import EmployeeProjects from './EmployeeProjects';
import InvoicesandBills from './InvoicesandBills';
import BankDetails from './BankDetails';
import EmployeeData from './EmployeeData';

const ActiveEmployees = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state && location.state.employees ? location.state.employees : [];
  const [employees, setEmployees] = useState(initialState);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [view, setView] = useState('basic'); // Default view

  useEffect(() => {
    if (location.state && location.state.employees) {
      setEmployees(location.state.employees);
    }
  }, [location.state]);

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

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleView = (employee, newView) => {
    navigate('/employee-data', { state: { selectedEmployee: employee, view: newView } });
  };

  return (
    <div className="ActiveEmployees-container">
      <div className="navigation" style={{ width: '1109px', marginLeft: '10px' }}>
        {/*<button onClick={() => handleViewChange('basic')} >Basic</button>
        <button onClick={() => handleViewChange('employee-pay')}>Pay</button>
        <button onClick={() => handleViewChange('tax-deductions')}>Tax and Deductions</button>
        <button onClick={() => handleViewChange('employee-projects')}>Projects</button>
        <button onClick={() => handleViewChange('invoices-and-bills')}>Invoices and Bills</button>
        <button onClick={() => handleViewChange('bank-details')}>Bank Details</button>
        <button onClick={() => handleViewChange('education')}>Education</button>
        <button onClick={() => handleViewChange('experience')}>Experience</button>
        <button onClick={() => handleViewChange('attachments')}>Attachments</button>
  <button onClick={() => handleViewChange('other')}>Other</button>*/}
      </div>

      {view === 'basic' && (
        <div>
          <h4 style={{ color: 'black' }}>Active Employees List</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td onClick={() => handleEmployeeClick(index)}>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>
                    {!isEditing && (
                      <>
                        <button onClick={() => handleEdit(index)}
                        style={{
                          backgroundColor: '#008CBA',
                          border: 'none',
                          color: 'white',
                          width:'20%',
                          padding: '5px 12px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '18px',
                          margin: '4px 2px',
                          cursor: 'pointer',
                          borderRadius: '16px'
                        }}
                        className="tooltip"><i className="fa fa-pencil-square-o"></i>
                        <span className="tooltip-text">Edit</span></button>
                        <button onClick={() => handleDelete(index)}
                        style={{
                          backgroundColor: '#008CBA',
                          border: 'none',
                          width:'20%',
                          color: 'white',
                          padding: '5px 12px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '18px',
                          margin: '4px 2px',
                          cursor: 'pointer',
                          borderRadius: '16px'
                        }}
                        className="tooltip"><i className="fa fa-trash"></i>
                        <span className="tooltip-text">Delete</span></button>
                        <button onClick={() => handleView(employee, view)}
                        style={{
                          backgroundColor: '#008CBA',
                          border: 'none',
                          color: 'white',
                          width:'20%',
                          padding: '5px 12px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '18px',
                          margin: '4px 2px',
                          cursor: 'pointer',
                          borderRadius: '16px'
                        }}
                        className="tooltip"><i className="far fa-file-alt"></i>
                        <span className="tooltip-text">View Details</span></button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
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
                  {`${selectedEmployee.communicationAddress.houseNumber}, ${selectedEmployee.communicationAddress.pincode}, ${selectedEmployee.communicationAddress.area}, ${selectedEmployee.communicationAddress.city}, ${selectedEmployee.communicationAddress.state}, ${selectedEmployee.communicationAddress.country}`}
                </td>
              </tr>
              <tr>
                <td>Highest Education:</td>
                <td>{selectedEmployee.highestEducation}</td>
              </tr>
              <tr>
                <td>Resume:</td>
                <td>{selectedEmployee.resume}</td>
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
                <td>Passport Expire Date:</td>
                <td>{selectedEmployee.passportExpireDate.toDateString()}</td>
              </tr>
              <tr>
                <td>Employment Type:</td>
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
              <tr>
                <td>Attachments:</td>
                <td>
                {selectedEmployee.attachments.attachResume && (
                    <div>
                      <a href={selectedEmployee.attachments.attachResume} target="_blank" rel="noopener noreferrer">
                        Resume
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                 <tr>
                  
                  <td>PassPort/Aadhar</td>
                  
                  <td>
                   {selectedEmployee.attachments.passportAadharNumber && (
                    <div>
                      <a href={selectedEmployee.attachments.passportAadharNumber} target="_blank" rel="noopener noreferrer">
                        Passport/Aadhar
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>Experience</td>
                  <td>
                  
                  {selectedEmployee.attachments.previousExperience && (
                    <div>
                      <a href={selectedEmployee.attachments.previousExperience} target="_blank" rel="noopener noreferrer">
                        Previous Experience
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>E-Verify</td>
                  <td>
                  {selectedEmployee.attachments.eVerifyDocument && (
                    <div>
                      <a href={selectedEmployee.attachments.eVerifyDocument} target="_blank" rel="noopener noreferrer">
                        E-Verify Document
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>I-94</td>
                    <td>
                  {selectedEmployee.attachments.i94Document && (
                    <div>
                      <a href={selectedEmployee.attachments.i94Document} target="_blank" rel="noopener noreferrer">
                        I94 Document
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  <tr>
                    <td>I-9</td>
                    
                      <td>
                  {selectedEmployee.attachments.i9Document && (
                    <div>
                      <a href={selectedEmployee.attachments.i9Document} target="_blank" rel="noopener noreferrer">
                        I9 Document
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  <tr>
                      <td>W4</td><td>
                  {selectedEmployee.attachments.w4Document && (
                    <div>
                      <a href={selectedEmployee.attachments.w4Document} target="_blank" rel="noopener noreferrer">
                        W4 Document
                      </a>
                    </div>
                  )}</td>
                   </tr>
                  <tr>
                      <td>Driving License</td>
                  <td>
                  {selectedEmployee.attachments.drivingLicense && (
                    <div>
                      <a href={selectedEmployee.attachments.drivingLicense} target="_blank" rel="noopener noreferrer">
                        Driving License
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  
                  <tr>
                      <td>Void Check</td><td>
                  {selectedEmployee.attachments.voidCheck && (
                    <div>
                      <a href={selectedEmployee.attachments.voidCheck} target="_blank" rel="noopener noreferrer">
                        Void Check
                      </a>
                    </div>
                  )}</td>
                   </tr>
                  <tr>
                      <td>EAD</td><td>
                  {selectedEmployee.attachments.eadCopy && (
                    <div>
                      <a href={selectedEmployee.attachments.eadCopy} target="_blank" rel="noopener noreferrer">
                        EAD Copy
                      </a>
                    </div>
                  )}
                </td>
              </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveEmployees;
