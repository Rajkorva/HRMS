import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add import statement
import Invoice from './Invoice';
import ClientDetails from './ClientDetails';
import './App.css';
import ActiveClients from './ActiveClients';
import InActiveClients from './InActiveClients';

const Client = ({ handleMenuClick }) => {
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showActiveClients, setShowActiveClients] = useState(false);
  const [showInActiveClients, setShowInActiveClients] = useState(false);
  const [showClientList, setShowClientList] = useState(false); // Add state for showClientList
  const navigate = useNavigate();

  const handleClientClick = () => {
    setShowClientDetails(prevState => !prevState); // Toggle the state
    setShowInvoice(false);
  };
  const handleClientListClick = () => {
    setShowClientList(!showClientList);
    setShowClientDetails(false); // Close client details
  };
  
  

  const handleInvoiceClick = () => {
    setShowClientDetails(false);
    setShowInvoice(true);
  };

  const handleActiveClientsClick = () => {
    navigate('/active-clients');
  };

  const handleInActiveClientsClick = () => {
    navigate('/inactive-clients');
  };

  

  return (
    <div className="ClientContainer" >
      <div>
        <div className="menu-items" onClick={handleClientClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-user-plus" style={{marginLeft:'140px', marginBottom:'-17.5px'}}></i> Add Client
        </div>
        {showClientDetails && <ClientDetails />}
        <div className="menu-items" onClick={handleClientListClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-users" style={{marginLeft:'140px', marginBottom:'-17.5px'}}></i> Client List
        </div>
        {showClientList && (
          <>
            <div className="submenu-items" onClick={handleActiveClientsClick} style={{width:'60%', alignItems:'start'}}>
              <i className="fas fa-toggle-on" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Active Clients
            </div>
            <div className="submenu-items" onClick={handleInActiveClientsClick} style={{width:'60%', alignItems:'start'}}>
              <i className="fas fa-toggle-off" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> InActive Clients
            </div>
          </>
        )}
        {showActiveClients && (
          <div>
            <h3>Active Clients Form</h3>
            {/* Your Active List Form */}
          </div>
        )}
        {showInActiveClients && (
          <div>
            <h3>InActive Clients Form</h3>
            {/* Your Bench List Form */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
