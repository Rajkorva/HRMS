import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './App.css'; // Import the CSS file for styling
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceList = () => {
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
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [client, setClient] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [filterStatus, setFilterStatus] = useState('showAll');
  

  useEffect(() => {
    // Calculate the amount based on quantity/hour and price
    const calculatedAmount = formData.quantity * formData.price;
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
  }, [formData.quantity, formData.price, formData.tax, formData.discount]);

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
      navigate('/invoice-details', { state: formData });
  };
 const handleBack = (e) => {
    e.preventDefault();
    // Use history.goBack() to navigate to the previous page
    navigate(-1);
  };
  
  const handleDescriptionClick = () => {
    setIsEditing(true);
    setDescriptionValue(formData.productMaterials);
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
  const handleSearchEmployee = (e) => {
    const { value } = e.target;
    setEmployeeName(value);
  };

  const handleSearchClient = (e) => {
    const { value } = e.target;
    setClient(value);
  };

  const handleSearchMonth = (e) => {
    const { value } = e.target;
    setMonth(value);
  };

  const handleSearchYear = (e) => {
    const { value } = e.target;
    setYear(value);
  };
  const handlePreview=()=>{
    navigate('/payment-preview');
  };
  const handleAddPayment =()=>{
    navigate('/payment');
  };
  const getStatus = () => {
    if (formData.dueAmount === 0) {
      return "Fully Paid";
    } else if (formData.dueAmount === formData.amount) {
      return "Unpaid";
    } else {
      return "Partially Paid";
    }
  };
  const buttonStyle = {
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '4px 2px',
    color: 'white'
  };
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredInvoices = formData.invoiceNumber ? [formData].filter((invoice) => {
    if (filterStatus === 'unpaid') {
      return invoice.dueAmount === invoice.amount;
    } else if (filterStatus === 'fullyPaid') {
      return invoice.dueAmount === 0;
    } else if (filterStatus === 'partiallyPaid') {
      return invoice.dueAmount > 0 && invoice.dueAmount < invoice.amount;
    } else {
      return true;
    }
  }) : [];

  

  
  

  

  return (
    <div>
    <div className="invoiceList-details">
      {!isEditing && (
        <>
          <h4>Invoice List</h4>
          <div className='Searchtags'>
        <div>
        <label>Search Employee: </label>
        <input type="text" value={employeeName} onChange={handleSearchEmployee} />
      </div>
      <div>
        <label>Search Client: </label>
        <input type="text" value={client} onChange={handleSearchClient} />
      </div>
      
      <div>
        <label>Search Period: </label>
        <div className="period-input">
          <select value={month} onChange={handleSearchMonth}>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          
          <input className="period-inputs" type="text" placeholder="Year" value={year} onChange={handleSearchYear} />
        </div>
        <div className="filter-checkboxes" style={{display:'flex', flexDirection:'row',marginLeft:'-700px', width:'100%',gap:'5px'}}>
              <label>
                <input type="radio" name="status" value="unpaid" checked={filterStatus === 'unpaid'} onChange={() => handleFilterChange('unpaid')} />
                Unpaid
              </label>
              <label>
                <input type="radio" name="status" value="fullyPaid" checked={filterStatus === 'fullyPaid'} onChange={() => handleFilterChange('fullyPaid')} />
                Fully Paid
              </label>
              <label>
                <input type="radio" name="status" value="partiallyPaid" checked={filterStatus === 'partiallyPaid'} onChange={() => handleFilterChange('partiallyPaid')} />
                Partially Paid
              </label>
              <label>
                <input type="radio" name="status" value="showAll" checked={filterStatus === 'showAll'} onChange={() => handleFilterChange('showAll')} />
                Show All
              </label>
            </div>
        </div>
      </div>
          <table>
            <thead>
              <tr>
                
                <th>Inv Num</th>
                <th>Project</th>
                <th>Inv Date</th>
                <th>Due Date</th>
                <th>Inv Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Payments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               
                <td><p id="invoiceNumber">{formData.invoiceNumber}</p></td>
                <td><p id="project">{formData.project}</p></td>
                <td><p id="invoiceDate">{formData.invoiceDate.toLocaleDateString()}</p></td>
                <td><p id="dueDate">{formData.dueDate.toLocaleDateString()}</p></td>
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
      
      <td><p>{balanceDue}</p></td>
      <td><p> {getStatus()}</p></td>
      <td>
      <div className="icon-container">
      <button onClick={handleDescriptionClick} style={{
      backgroundColor: '#4CAF50', /* Green background */
      border: 'none', /* Remove borders */
      color: 'white', /* White text */
      padding: '10px 24px', /* Some padding */
      textAlign: 'center', /* Centered text */
      textDecoration: 'none', /* Remove underline */
      display: 'inline-block', /* Make the buttons appear side by side */
      fontSize: '12px', /* Increase font size */
      margin: '4px 2px', /* Add some margin */
      cursor: 'pointer', /* Pointer/hand icon */
      borderRadius: '16px' /* Rounded corners */
    }}>
              
  <i class="far fa-file-alt"></i>
  <span className="tooltip-text">Preview</span>
</button>
</div> 
<div className="icon-container">
     <button onClick={handleEdit} style={{
      backgroundColor: '#008CBA', /* Green background */
      border: 'none', /* Remove borders */
      color: 'white', /* White text */
      padding: '10px 24px', /* Some padding */
      textAlign: 'center', /* Centered text */
      textDecoration: 'none', /* Remove underline */
      display: 'inline-block', /* Make the buttons appear side by side */
      fontSize: '12px', /* Increase font size */
      margin: '4px 2px', /* Add some margin */
      cursor: 'pointer', /* Pointer/hand icon */
      borderRadius: '16px' /* Rounded corners */
    
    }}> <i class='far fa-edit'></i>
    <span className="tooltip-text">Edit</span>
    </button></div>

    <div className="icon-container">
      <button onClick={handleDelete}style={{
      backgroundColor: '#008CBA', /* Blue background */
      border: 'none', /* Remove borders */
      color: 'white', /* White text */
      padding: '10px 12px', /* Some padding */
      textAlign: 'center', /* Centered text */
      textDecoration: 'none', /* Remove underline */
      display: 'inline-block', /* Make the buttons appear side by side */
      fontSize: '12px', /* Increase font size */
      margin: '4px 2px', /* Add some margin */
      cursor: 'pointer', /* Pointer/hand icon */
      borderRadius: '16px', /* Rounded corners */
      marginRight:'25px'
    }}> <i class='fas fa-trash-alt'></i>
    <span className="tooltip-text">Delete</span>
    </button>
    </div>
    </td>
    
 <td className="Payment-Button" style={{ fontSize: '10px' }}>
 <div className="icon-container">
  <button
    onClick={handlePreview}
    style={{
      backgroundColor: '#4CAF50', /* Green background */
      border: 'none', /* Remove borders */
      color: 'white', /* White text */
      padding: '10px 24px', /* Some padding */
      textAlign: 'center', /* Centered text */
      textDecoration: 'none', /* Remove underline */
      display: 'inline-block', /* Make the buttons appear side by side */
      fontSize: '12px', /* Increase font size */
      margin: '4px 2px', /* Add some margin */
      cursor: 'pointer', /* Pointer/hand icon */
      borderRadius: '16px' /* Rounded corners */
    
    }}
  >
    <i className='far fa-file-alt'></i>
    <span className="tooltip-text">Preview</span>
  </button>
  </div>
  
  <div className="icon-container">
  <button
    onClick={handleAddPayment}
    style={{
      backgroundColor: '#008CBA', /* Blue background */
      border: 'none', /* Remove borders */
      color: 'white', /* White text */
      padding: '10px 12px', /* Some padding */
      textAlign: 'center', /* Centered text */
      textDecoration: 'none', /* Remove underline */
      display: 'inline-block', /* Make the buttons appear side by side */
      fontSize: '12px', /* Increase font size */
      margin: '4px 2px', /* Add some margin */
      cursor: 'pointer', /* Pointer/hand icon */
      borderRadius: '16px', /* Rounded corners */
      marginRight:'25px'
    }}
  >
    <i className="fa fa-plus"></i>
    <span className="tooltip-text">Add</span>
  </button>
  </div>
             </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      
      
      <div className="invoice-details" ref={componentRef}>
      
      {isEditing && (
        <div>
          <div className="header" style={{color:'black'}}>
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
          <div className="company-info"  style={{color:'black'}}>
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

          <div className="right-column" style={{top:'180px', color:'black'}}>
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
          <div className="totalr-period"  style={{color:'black'}}>
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
          
         
               <table className="details"  >
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

          <div className="notes"  style={{color:'black'}}>
            <p>Message:</p>
            <p>{formData.note}</p>
          </div>
          <div className="buttons">
          <button
        onClick={handleEdit}
        style={{ ...buttonStyle, backgroundColor: '#008CBA' }} // Orange background
      >
        Edit
      </button>
      {/*<button onClick={handleDelete}>Delete</button>*/}
      <button
        onClick={handleSave}
        style={{ ...buttonStyle, backgroundColor: '#008CBA' }} // Green background
      >
        Save
      </button>
      <button
        onClick={handleSend}
        style={{ ...buttonStyle, backgroundColor: '#008CBA' }} // Blue background
      >
        Send
      </button>
      <button
        onClick={handleBack}
        style={{ ...buttonStyle, backgroundColor: '#008CBA' }} // Red background
      >
        Back
      </button>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <button
        onClick={handleDownload}
        className="btn"
        style={{
          ...buttonStyle,
          backgroundColor: '#008CBA', // Light blue background
          width: '100%'
        }}
      >
        <i className="fa fa-download"></i> Download
      </button>
          </div>  
        </div>
      )}
      </div>
      </div>
      </div> 
  );
};
export default InvoiceList;


