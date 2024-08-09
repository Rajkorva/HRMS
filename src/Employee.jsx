import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeDetails from './EmployeeDetails';
import './App.css'; 

const Employee = ({ handleMenuClick }) => {
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [showActiveList, setShowActiveList] = useState(false);
  const [showBenchList, setShowBenchList] = useState(false);
  const [showTerminatedList, setShowTerminatedList] = useState(false);
  const navigate = useNavigate();

  const handleEmployeeDetailsClick = () => {
    setShowEmployeeDetails(!showEmployeeDetails);
    setShowEmployeeList(false);
    setShowActiveList(false);
    setShowBenchList(false);
    setShowTerminatedList(false);
  };

  const handleEmployeeListClick = () => {
    setShowEmployeeList(!showEmployeeList);
    setShowEmployeeDetails(false);
    setShowActiveList(false);
    setShowBenchList(false);
    setShowTerminatedList(false);
  };

  const handleActiveListClick = () => {
    navigate('/active-employees');
  };

  const handleBenchListClick = () => {
    navigate('/on-bench-employees');
  };

  const handleTerminatedListClick = () => {
    navigate('/terminated-employees');
  };

  return (
    <div className="ClientContainer" style={{paddingBottom:'154.25px', width:'80%'}}>
      <div className="menu-items" onClick={handleEmployeeDetailsClick} style={{width:'25%',alignItems:'start'}}>
        <i className="fas fa-user-plus" style={{marginLeft:'160px', marginBottom:'-15.5px'}} ></i> Add Employee 
      </div>
      
      {showEmployeeDetails && <EmployeeDetails />}
      
      <div className="menu-items" onClick={handleEmployeeListClick}  style={{width:'25%',alignItems:'start'}}>
        <i className="fas fa-users" style={{marginLeft:'160px', marginBottom:'-15.5px'}}></i> Employees List
      </div>
      
      {showEmployeeList && (
        <>
          <div className="submenu-items" onClick={handleActiveListClick}  style={{width:'25%',alignItems:'start'}}>
            <i className="fas fa-toggle-on" style={{marginLeft:'160px', marginBottom:'-17.5px'}}></i> Active List
          </div>
          <div className="submenu-items" onClick={handleBenchListClick}  style={{width:'25%',alignItems:'start'}}>
            <i className="fas fa-chair" style={{marginLeft:'160px', marginBottom:'-17.5px'}}></i> Bench List
          </div>
          <div className="submenu-items" onClick={handleTerminatedListClick}  style={{width:'25%',alignItems:'start'}}>
            <i className="fas fa-user-times" style={{marginLeft:'160px', marginBottom:'-17.5px'}}></i> Terminated List
          </div>
        </>
      )}
      
      {showActiveList && (
        <div>
          <h3>Active List Form</h3>
          {/* Your Active List Form */}
        </div>
      )}
      
      {showBenchList && (
        <div>
          <h3>Bench List Form</h3>
          {/* Your Bench List Form */}
        </div>
      )}
      
      {showTerminatedList && (
        <div>
          <h3>Terminated List Form</h3>
          {/* Your Terminated List Form */}
        </div>
      )}
    </div>
  );
};

export default Employee;
