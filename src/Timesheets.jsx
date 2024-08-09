import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add import statement

import './App.css';
import Timesheet from './Timesheet';
import TimesheetDetails from './TimesheetDetails';

const Timesheets = ({ handleMenuClick }) => {
  const [showTimesheetDetails, setShowTimesheetDetails] = useState(false);
  const [showTimesheet, setShowTimesheet] = useState(false);

 
 
   // Add state for showClientList
  const navigate = useNavigate();

  const handleTimesheetClick = () => {
    setShowTimesheetDetails(prevState => !prevState); // Toggle the state
    navigate('/timesheet');
    
  };
  const handleTimesheetDetailsClick = () => {
    setShowTimesheetDetails(!showTimesheetDetails);
    setShowTimesheet(false); // Close client details
  };
  
  

 

  const handleTimesheetsClick = () => {
    navigate('/timesheet-details');
  };

  

  

  return (
    <div className="ClientContainer">
      <div>
        <div className="menu-items" onClick={handleTimesheetClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-user-plus" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Add Timesheet
        </div>
        {showTimesheet && <Timesheet />}
        <div className="menu-items" onClick={handleTimesheetsClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-users" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Timesheet List
        </div>
        {showTimesheetDetails && <TimesheetDetails />}
        
      </div>
    </div>
  );
};

export default Timesheets;
