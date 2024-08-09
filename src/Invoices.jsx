import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import './App.css';
import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';
import InvoiceList from './InvoiceList';

const Invoices = ({ handleMenuClick }) => {
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  
  const navigate = useNavigate();

  const handleInvoiceClick = () => {
    setShowInvoiceDetails(false); // Close invoice details
    setShowInvoice(prevState => !prevState); // Toggle invoice form
    navigate('/invoice');
  };

  const handleInvoiceDetailsClick = () => {
    setShowInvoice(!showInvoice); // Close invoice form
    setShowInvoiceDetails(prevState => !prevState); // Toggle invoice details
    navigate('/invoice-list');
  };

  return (
    <div className="ClientContainer">
      <div>
        <div className="menu-items" onClick={handleInvoiceClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-user-plus" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Create Invoice
        </div>
        {showInvoice && <InvoiceList />}
        <div className="menu-items" onClick={handleInvoiceDetailsClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-users" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Invoice List
        </div>
        {showInvoiceDetails && <InvoiceDetails />}
      </div>
    </div>
  );
};

export default Invoices;
