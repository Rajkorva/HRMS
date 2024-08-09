import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const EmployeeDetails = () => {
  const navigate = useNavigate();

  // Define state variables for employee details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleMoreDetailsClick = () => {
    navigate('/additional-details', {
      state: {
        firstName,
        lastName,
        phone,
        email
      }
    });
  };
  const handleSendToEmployee = () => {
    navigate()
  }

  return (
    <div className="EmployeeDetails-container" style={{marginRight:'100px'}}>
      <h4>Employee Details</h4>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{display:'flex', flexDirection:'row', gap:'50px'}}>
      <button onClick={handleMoreDetailsClick} style={{width:'200px'}}>More Details</button>
      <button onClick={handleSendToEmployee} style={{width:'200px'}}>Send To Employee</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
