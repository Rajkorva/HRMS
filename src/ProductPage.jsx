import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add import statement
import EmployeeManagement from './EmployeeManagement';
import './App.css'; // Ensure to import the CSS file

const ProductPage = ({ handleMenuClick }) => {
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
    <div className="SalesContainer" style={{height:'97.80vh'}}>
      <div className="menu">
        <h4 style={{color:'black'}}>Select this button to Enter the Details of</h4>
        <div className="menu-items" onClick={handleProspectsClick} style={{width:'35%'}}>
          <i className="fas fa-suitcase"></i> Products  /  Services
        </div>
      </div>
      <div className={`content ${showProspects ? '' : 'hidden'}`}>
        {showProspects && <EmployeeManagement />}
      </div>
      
    </div>
  );
};

export default ProductPage;
