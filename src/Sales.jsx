import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add import statement

import InProcess from './InProcess';
import Sold from './Sold';
import Prospects from './Prospects';
import './App.css'; // Ensure to import the CSS file

const Sales = ({ handleMenuClick }) => {
  const [showProspects, setShowProspects] = useState(false);
  const [showInProcesses, setShowInProcesses] = useState(false);
  const [showSolds, setShowSolds] = useState(false);

  const navigate = useNavigate();

  const handleProspectsClick = () => {
    setShowProspects(prevState => !prevState); // Toggle the state
    setShowInProcesses(false);
    setShowSolds(false);
  };

  const handleInProcessClick = () => {
    setShowInProcesses(!showInProcesses);
    setShowProspects(false); // Close client details
    setShowSolds(false);
  };

  const handleSoldClick = () => {
    setShowProspects(false);
    setShowSolds(!showSolds);
    setShowInProcesses(false);
  };

  return (
    <div>
    <h4>Select these buttons to fill the details</h4>
    <div className="SalesContainer" style={{marginTop:'0px', height:'87vh'}}>
      <div className="menu">
        
        <div className="menu-items" onClick={handleProspectsClick}>
          <i className="fas fa-user-plus"></i> Prospects
        </div>
        <div className="menu-items" onClick={handleInProcessClick}>
          <i className="fa fa-list-alt"></i> In-Process
        </div>
        <div className="menu-items" onClick={handleSoldClick}>
          <i className="fa fa-check-square-o"></i> Sold
        </div>
      </div>
      <div className={`content ${showProspects ? '' : 'hidden'}`}>
        {showProspects && <Prospects />}
      </div>
      <div className={`content ${showInProcesses ? '' : 'hidden'}`}>
        {showInProcesses && <InProcess />}
      </div>
      <div className={`content ${showSolds ? '' : 'hidden'}`}>
        {showSolds && <Sold />}
      </div>
    </div>
    </div>
  );
};

export default Sales;
