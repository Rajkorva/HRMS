import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeePay from './EmployeePay';
import TaxDeductions from './TaxDeductions';
import EmployeeProjects from './EmployeeProjects';
import InvoicesandBills from './InvoicesandBills';
import BankDetails from './BankDetails';
import './App.css';

const EmployeeData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState(location.state.view || 'basic');
  const [selectedEmployee, setSelectedEmployee] = useState(location.state.selectedEmployee || {});
  const [showEmployeeSubMenu, setShowEmployeeSubMenu] = useState(false);

  useEffect(() => {
    if (location.state && location.state.selectedEmployee) {
      setSelectedEmployee(location.state.selectedEmployee);
    }
    if (location.state && location.state.view) {
      setView(location.state.view);
    }
  }, [location.state]);

  const handleViewChange = (newView) => {
    setView(newView);
    setShowEmployeeSubMenu(true); // Close the submenu when changing the view
  };
  const handleViewsChange = (newView) => {
    setView(newView);
    setShowEmployeeSubMenu(false); // Close the submenu when changing the view
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="EmployeeData-container" style={{ display: 'flex' }}>
      <div>
        {/* <button onClick={() => handleBack()} style={{ marginRight: '-600px' }}>Back</button> */}
        <div className="menu">
          <button style={{ marginTop: '20px', backgroundColor: 'white', color: 'black', fontSize:'15px', font:'caption' }}>Menu</button>
          <div
            className="dropdown-btn"
            onClick={() => setShowEmployeeSubMenu(!showEmployeeSubMenu)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            Employee Data
          </div>

          {showEmployeeSubMenu && (
            <div className="dropdown-btn" style={{ marginLeft: '20px' }}>
              <div className="submenu-items" onClick={() => handleViewChange('basic')}
               style={{color:'#fff', cursor: 'pointer', marginBottom: '10px', backgroundColor: '#9h9999', padding: '8px', width: '98%' }}>
                Basic
              </div>
              <div className="submenu-items" onClick={() => handleViewChange('education')}
               style={{ color:'#fff',cursor: 'pointer', marginBottom: '10px', backgroundColor: '#9h9999', padding: '8px', width: '98%' }}>
                Education
              </div>
              <div className="submenu-items" onClick={() => handleViewChange('experience')}
               style={{color:'#fff', cursor: 'pointer', marginBottom: '10px', backgroundColor: '#9h9999', padding: '8px', width: '98%' }}>
                Experience
              </div>
              <div className="submenu-items" onClick={() => handleViewChange('attachments')}
               style={{ color:'#fff',cursor: 'pointer', marginBottom: '10px', backgroundColor: '#9h9999', padding: '8px', width: '98%' }}>
                Attachments
              </div>
              <div className="submenu-items" onClick={() => handleViewChange('other')} 
              style={{color:'#fff', cursor: 'pointer', marginBottom: '10px', backgroundColor: '#9h9999', padding: '8px', width: '98%' }}>
                Other Details
              </div>
            </div>
          )}
        </div>
        <div className="dropdown-btn" onClick={() => handleViewsChange('employee-pay')}
         style={{ cursor: 'pointer', marginBottom: '10px' }}>
          Pay
        </div>
        <div className="dropdown-btn" onClick={() => handleViewsChange('tax-deductions')} 
        style={{ cursor: 'pointer', marginBottom: '10px' }}>
          Tax and Deductions
        </div>
        <div className="dropdown-btn" onClick={() => handleViewsChange('employee-projects')}
         style={{ cursor: 'pointer', marginBottom: '10px' }}>
          Projects
        </div>
        <div className="dropdown-btn" onClick={() => handleViewsChange('invoices-and-bills')}
         style={{ cursor: 'pointer', marginBottom: '10px' }}>
          Invoices and Bills
        </div>
        <div className="dropdown-btn" onClick={() => handleViewsChange('bank-details')}
         style={{ cursor: 'pointer', marginBottom: '10px' }}>
          Bank Details
        </div>
      </div>

      <div className="view-container" style={{ width: '80%', marginLeft: '100px' }}>
        <h2>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h2>

        {view === 'basic' && (
          <div style={{ marginLeft: '30px', width: '80%' }}>
            <h4>Basic Details of {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h4>
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
                  <td>Date Of Birth:</td>
                  <td>{new Date(selectedEmployee.dateOfBirth).toDateString()}</td>
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
              </tbody>
            </table>
          </div>
        )}
        {view === 'education' && (
          <div style={{ marginLeft: '30px', width: '80%' }}>
            <h4>Education Details</h4>
            <table>
              <tbody>
                <tr>
                  <td>Highest Education:</td>
                  <td>{selectedEmployee.highestEducation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {view === 'experience' && (
          <div style={{ marginLeft: '30px', width: '80%' }}>
            <h4>Experience Details</h4>
            <table>
              <tbody>
               
                <tr>
                  <td>Total Experience:</td>
                  <td>{selectedEmployee.totalExperience}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {view === 'attachments' && (
          <div style={{ marginLeft: '30px', width: '80%' }}>
            <h4>Attachments</h4>
            <table>
              <tbody>
                
                <tr>
                <td>Resume:</td>
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
                  
                  <td>Passport/Aadhar Document</td>
                  
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
                    <td>Experience Letter</td>
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
                    <td>E-Verify Document</td>
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
                    <td>I-94 document</td>
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
                    <td>I-9 Document</td>
                    
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
                      <td>W4 Document</td><td>
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
                      <td>EAD Copy</td><td>
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
        {view === 'other' && (
          <div style={{ marginLeft: '30px', width: '80%' }}>
            <h4>Other Details</h4>
            <table>
              <tbody>
              <tr>
                  <td>Passport/Aadhar Number:</td>
                  <td>{selectedEmployee.passportAadharNumber}</td>
                </tr>
                <tr>
                  <td>Password Expire Date:</td>
                  <td>{new Date(selectedEmployee.passportExpireDate).toDateString()}</td>
                </tr>
                <tr>
                  <td>SSN/PAN:</td>
                  <td>{selectedEmployee.ssnPan}</td>
                </tr>
                <tr>
                  <td>Employment Type:</td>
                  <td>{selectedEmployee.employmentType}</td>
                </tr>
                <tr>
                  <td>Tentative Start Date:</td>
                  <td>{new Date(selectedEmployee.hireDate).toDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {view === 'employee-pay' && <EmployeePay />}
        {view === 'tax-deductions' && <TaxDeductions />}
        {view === 'employee-projects' && <EmployeeProjects />}
        {view === 'invoices-and-bills' && <InvoicesandBills />}
        {view === 'bank-details' && <BankDetails />}
      </div>
    </div>
  );
};

export default EmployeeData;
