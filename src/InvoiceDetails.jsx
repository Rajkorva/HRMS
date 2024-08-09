import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './App.css'; // Import the CSS file for styling

const InvoiceDetails = ({ selectedCurrency }) => {
  const location = useLocation();
  const componentRef = useRef();
  const navigate = useNavigate();
  const { selectedClient, selectedProject, ...formData } = location.state || {
    
    selectedClient: null,
    companyName: '',
    companyAddress: '',
    email: '',
    companyname: '',
    billingAddress: '',
    emailAddress: '',
    company: '',
    shippingAddress: '',
    projectName:'',
    emailId: '',
    invoiceNumber: '',
    invoiceDate: new Date(),
    dueDate: new Date(),
    paymentTerms: '',
    startDate: new Date(),
    endDate: new Date(),
    billingPeriod: '',
    description: '',
    service: '',
    productMaterials: '',
    quantity: 0,
    billingRate: 0,
    selectedCurrency: '',
    accountNumber: '',
    bankDetails: '',
    note: '',
  };
  
  const [deleted, setDeleted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [discount, setDiscount] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  

  const [selectedEmployee, setSelectedEmployee] = useState({}); // Define selectedEmployee state

  // Rest of your component code...

  useEffect(() => {
    // Calculate the amount based on quantity/hour and price
    const calculatedAmount = formData.quantity * selectedEmployee.price;
    setAmount(calculatedAmount);
    

    // Calculate subtotal, tax, discount, total, and balance due
    const calculatedSubtotal = calculatedAmount;
    const calculatedTax = calculatedSubtotal * (formData.tax / 100);
    const calculatedTotal = calculatedSubtotal + calculatedTax;
    const calculatedDiscount = calculatedTotal * (formData.discount / 100);
    const calculatedBalanceDue = calculatedTotal - calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
    setBalanceDue(calculatedBalanceDue);
  }, [formData.quantity, selectedEmployee.price, formData.tax, formData.discount]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setDeleted(true);
  };

  const handleSend = () => {
    alert('Form sent to bill-to details!');
  };
  const handleSave = (e) => {
      e.preventDefault();
      navigate('/invoice-list', { state: formData });
  };
  const handleBack = (e) => {
    
    navigate('/invoice-list');
};


  const handleDescriptionClick = () => {
    setIsEditing(true);
    setDescriptionValue(formData.description);
  };

  const handleSaveDescription = () => {
    setIsEditing(false);
    // Update description in formData
    formData.description = descriptionValue;
  };

  const handleDownload = () => {
    if (componentRef.current) {
      const input = componentRef.current;

      const options = {
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(input).set(options).save();
    } else {
      console.error('Error: componentRef is null or invalid');
    }
  };

  if (deleted) {
    return <div>Form has been deleted.</div>;
  }
  
  

  return (
    <div className="invoice-details" ref={componentRef}>
      
        <div>
          <div className="header">
            <h4>Invoice</h4>
            <img src="https://www.elintpros.com/assets/img/elintpro_logo.png" alt="Company Logo" className="logo" 
             style={{
              backgroundColor: 'white', /* Set background color */
              width: '150px', /* Set width */
              height: '200vh',
              border:'4px solid white' ,
              borderRight:'10px solid white',
              borderLeft:'10px solid white',
              borderBottom:'10px solid white',
              borderTop:'10px solid white',
              marginBottom:'20px'}}/>
              
          </div>
          <div className="company-info">
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <p id="companyName">{formData.companyName}</p>
              <p id="address">{formData.companyAddress}</p>
              <p id="Email">{formData.email}</p>
            </div>

            <div>
  <label htmlFor="billTo">Bill To:</label>
  {selectedClient && selectedClient.communicationAddress && (
    <p id="billingAddress">{`${selectedClient.communicationAddress.houseNumber}, ${selectedClient.communicationAddress.pincode}, ${selectedClient.communicationAddress.area}, ${selectedClient.communicationAddress.village}, ${selectedClient.communicationAddress.state}, ${selectedClient.communicationAddress.country}`}</p>
  )}
</div>
<div>
  <label htmlFor="shipTo">Ship To:</label>
  {selectedClient && selectedClient.shippingAddress && (
    <p id="shippingaddress">{`${selectedClient.shippingAddress.houseNumber}, ${selectedClient.shippingAddress.pincode}, ${selectedClient.shippingAddress.area}, ${selectedClient.shippingAddress.village}, ${selectedClient.shippingAddress.state}, ${selectedClient.shippingAddress.country}`}</p>
  )}
</div>

          </div>

          <div className="right-column"  style={{color:'black'}}>
            <div>
              <label htmlFor="invoiceNumber">Invoice Number:</label>
              <p id="invoiceNumber">{formData.invoiceNumber}</p>
            </div>
            <div>
              <label htmlFor="invoiceDate">Invoice Date:</label>
              <p id="invoiceDate">{formData.invoiceDate.toLocaleDateString()}</p>
            </div>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <p id="dueDate">{formData.dueDate.toLocaleDateString()}</p>
            </div>
            <div>
              <label htmlFor="paymentTerms">Payment Terms:</label>
              <p id="paymentTerms">{formData.paymentTerms}</p>
            </div>
          </div>
          <div className="totalr"  style={{color:'black'}}>
          <div className="totalr-period">
          <p>Billing Period:</p>
          </div>
          <div className="totalr-period">
          <p>{formData.billingPeriod}</p>
          </div>
            <div className="totalr-bottom">
            <p>Start Date:</p>
            </div>
            <div className="totalr-bottom">
            <p>{formData.startDate.toLocaleDateString()}</p> 
            </div>
            <div className="totalz-bottom">
            <p>End Date:</p>     
            </div>
             <div className="totalz-bottom">    
              <p>{formData.endDate.toLocaleDateString()}</p>
              </div>
               </div>
          
         
               <table className="details">
  <thead>
    <tr>
      <th>Product/Materials</th>
      <th>Description</th>
      {/*<th>Project</th>*/}
      <th>Quantity</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{formData.productMaterials}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        ) : (
          <span onClick={handleDescriptionClick}>{formData.description}</span>
        )}
      </td>
      <td>{formData.quantity}</td>
      <td>{selectedEmployee.price}</td>
     
{/*
<InvoiceDetails selectedEmployee={selectedEmployee} />*/}

      <td>
        {isEditing ? (
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        ) : (
          <span onClick={handleDescriptionClick}>{formData.amount}</span>
        )}
      </td>
    </tr>
    {/* Additional rows if needed */}
  </tbody>
</table>

          <div className="Thanks"  style={{color:'black'}}>
            <p>Thanks for the Support!</p>
          </div>
          <div className="totals"  style={{color:'black'}}>
            <div>
              <p>Subtotal:</p>
              <p>Tax  :</p>
              <p>Discount:</p>
              <p>Total:</p>
              <p>Balance Due:</p>
            </div>
            <div>

              <p>{subtotal}</p>
              <p>{tax}</p>
              <p>{discount}</p>
              <p>{total}</p>
              <p>{balanceDue}</p>
            </div>
          </div>
          <div className="total"  style={{color:'black'}}>
            <p>Thank You!</p>
           {/*} <div className="total-bottom">
              <p>AccountNumber:</p>
              <p>BankDetails:</p>
            </div>
            <div className="total-bottom">
              <p>{formData.accountNumber}</p>
              <p>{formData.bankDetails}</p>  
      </div>*/}
          </div>

          <div className="notes">
            <p>Message:</p>
            <p>{formData.note}</p>
          </div>
          </div>
         
          <div className="buttons">
        {document.location.pathname !== '/invoice-list' && (
          <>
            <button onClick={handleEdit}>Edit</button>
            {/*<button onClick={handleDelete}>Delete</button>*/}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleSend}>Send</button>
            <button onClick={handleBack}>Back</button>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <button onClick={handleDownload} className="btn" style={{ width: '100%' }} ><i className="fa fa-download"></i> Download</button>
          </>
        )}
      </div>
      
    </div>
  );
};

export default InvoiceDetails;


