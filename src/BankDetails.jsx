import React, { useState } from 'react';
import './App.css';

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    routingNumber: '',
    document: '',
    effectiveDate: '',
    accountType: 'Checking/Salary Account',
  });

  const [accountTypes, setAccountTypes] = useState([
    'Checking/Salary Account',
    'Savings Account',
    'Business Account'
  ]);

  const [bankDetailsList, setBankDetailsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      setShowErrorPopup(true);
      return;
    }
    setBankDetailsList([...bankDetailsList, bankDetails]);
    resetForm();
  };

  const resetForm = () => {
    setBankDetails({
      bankName: '',
      accountName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      routingNumber: '',
      document: '',
      effectiveDate: '',
      accountType: 'Checking/Salary Account',
    });
    setShowErrorPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value,
    });
    if (name === 'accountType' && value === 'Add New') {
      const newAccountType = prompt('Enter new account type:');
      if (newAccountType && !accountTypes.includes(newAccountType)) {
        setAccountTypes([...accountTypes, newAccountType]);
        setBankDetails({
          ...bankDetails,
          accountType: newAccountType,
        });
      }
    }
  };

  const handleConfirmAccountNumberChange = (e) => {
    const { value } = e.target;
    setBankDetails({
      ...bankDetails,
      confirmAccountNumber: value,
    });
    if (value !== bankDetails.accountNumber) {
      setShowErrorPopup(true);
    } else {
      setShowErrorPopup(false);
    }
  };

  const maskConfirmAccountNumber = (confirmAccountNumber) => {
    const visibleDigits = 4;
    const maskedDigits = confirmAccountNumber.length - visibleDigits;
    if (maskedDigits > 0) {
      return '*'.repeat(maskedDigits) + confirmAccountNumber.slice(-visibleDigits);
    }
    return confirmAccountNumber;
  };

  return (
    <div className="BankDetails" style={{ width: '600px', margin: '20px auto', borderTop:'2px solid black' }}>
      <h5>Bank Details</h5>
      
      {showErrorPopup && (
        <div className="popup" style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
          Account numbers do not match!
        </div>
      )}
      <button type="button" onClick={() => setShowForm(!showForm)} style={{ width: '25%', marginBottom: '10px', backgroundColor:'#f44336' }}>
        {showForm ? 'Close' : 'Add Bank details'} 
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{borderTop:'2px solid black', marginTop:'30px'}}>
          
          <div className="input-group" style={{ marginTop:'30px'}}>
            <label>Bank Name:</label>
            <input type="text" name="bankName" value={bankDetails.bankName} onChange={handleChange} required />
          </div>
          <div className="input-group" style={{ marginTop:'30px'}}>
            <label>Name On Bank Account:</label>
            <input type="text" name="accountName" value={bankDetails.accountName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Account Number:</label>
            <input type="text" name="accountNumber" value={bankDetails.accountNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Confirm Account Number:</label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={bankDetails.confirmAccountNumber}
              onChange={handleConfirmAccountNumberChange}
              required
            />
            <div style={{ marginTop: '5px' }}>
              <input
                type="text"
                readOnly
                value={maskConfirmAccountNumber(bankDetails.confirmAccountNumber)}
                style={{ border: 'none', backgroundColor: 'transparent', color: 'gray' }}
              />
            </div>
          </div>
          <div className="input-group">
            <label>Routing Number / IFSC Code:</label>
            <input type="text" name="routingNumber" value={bankDetails.routingNumber} onChange={handleChange} required />
          </div>
          <div className="input-group" style={{marginRight:'-40px'}}>
            <label>Attach BDD/ Void Check:</label>
            <input type="file" name="document" onChange={(e) => handleChange({ target: { name: 'document', value: e.target.files[0] } })} required />
          </div>
          <div className="input-group" style={{width:'300px', marginRight:'80px'}}>
            <label>Effective Date:</label>
            <input type="date" name="effectiveDate" value={bankDetails.effectiveDate} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Type of Account:</label>
            <select name="accountType" value={bankDetails.accountType} onChange={handleChange} required>
              {accountTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
              <option value="Add New">Add New</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor:'#f44336' }}>Save</button>
        </form>
      )}
      <div>
        <h4>Bank Details List</h4>
        <table>
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Confirm Account Number</th>
              <th>Routing Number</th>
              <th>Effective Date</th>
              <th>Account Type</th>
            </tr>
          </thead>
          <tbody>
            {bankDetailsList.map((details, index) => (
              <tr key={index}>
                <td>{details.bankName}</td>
                <td>{details.accountName}</td>
                <td>{details.accountNumber}</td>
                <td>{details.confirmAccountNumber}</td>
                <td>{details.routingNumber}</td>
                <td>{details.effectiveDate}</td>
                <td>{details.accountType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankDetails;
