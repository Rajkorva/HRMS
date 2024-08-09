import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './App.css'; // Import the CSS file for styling
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Payment = () => {
  const location = useLocation();
  const componentRef = useRef();
  const navigate = useNavigate();
  const formData = location.state || {
    companyName: '',
    companyAddress: '',
    email: '',
    companyname: '',
    billingAddress: '',
    emailAddress: '',
    company: '',
    shippingAddress: '',
    emailId: '',
    invoiceNumber: '',
    invoiceDate: new Date(),
    dueDate: new Date(),
    paymentTerms: '',
    startDate: new Date(),
    endDate: new Date(),
    billingPeriod:'',
    description: '',
    service: '',
    productMaterials: '',
    quantity: 0,
    price: 0,
    accountNumber: '',
    bankDetails: '',
    note: '',
    transactionDate: new Date(),
    referenceNumber: '',
    tax: 0,
    
    discount: 0,
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
  const [formDataState, setFormDataState] = useState(formData);

  useEffect(() => {
    // Calculate the amount based on quantity/hour and price
    const calculatedAmount = formDataState.quantity * formDataState.price;
    setAmount(calculatedAmount);

    // Calculate subtotal, tax, discount, total, and balance due
    const calculatedSubtotal = calculatedAmount;
    const calculatedTax = calculatedSubtotal * (formDataState.tax / 100);
    const calculatedTotal = calculatedSubtotal + calculatedTax;
    const calculatedDiscount = calculatedTotal * (formDataState.discount / 100);
    const calculatedBalanceDue = calculatedTotal - calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
    setBalanceDue(calculatedBalanceDue);
  }, [formDataState.quantity, formDataState.price, formDataState.tax, formDataState.discount]);

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
    navigate('/invoice-details', { state: formDataState });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  
  const handleDescriptionClick = () => {
    setIsEditing(true);
    setDescriptionValue(formDataState.description);
  };

  const handleSaveDescription = () => {
    setIsEditing(false);
    // Update description in formData
    setFormDataState(prevState => ({
      ...prevState,
      description: descriptionValue,
    }));
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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAmountChange = (e) => {
    setFormDataState({ ...formDataState, amount: e.target.value });
  };
  return (
    <div className="payment-details" ref={componentRef}>
      {!isEditing && (
        <>
          <h4>Payments</h4>
          <div className='payment-inputs'>
            
          </div>
          <table>
            <thead>  
              <tr className={{width:'100%'}}>
                <th>Transaction Date</th>
                <th>Method</th>
                <th>Ref Number</th>
                <th>Amount Paid</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
               <td></td>
                <td></td>
                <td></td>
                <td>
                  <input
                    type="text"
                    name="amount"
                    value={formDataState.amount}
                    onChange={handleAmountChange}
                  />
                </td>
                
                


      </tr>
            </tbody>
          </table>
        </>
      )}
     {/*} {isEditing && (
        <div>
          <div className="header">
            <h4>Invoice</h4>
            <img src="https://thinkanalytix.com/wp-content/uploads/2019/11/logo.jpg" alt="Company Logo" className="logo" />
          </div>
          <div className="company-info">
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <p id="companyName">{formDataState.companyName}</p>
              <p id="address">{formDataState.companyAddress}</p>
              <p id="Email">{formDataState.email}</p>
            </div>
            <div>
              <label htmlFor="billTo">Bill To:</label>
              <p id="companyname">{formDataState.companyname}</p>
              <p id="billingAddress">{formDataState.billingAddress}</p>
              <p id="EmailAddress">{formDataState.emailAddress}</p>
            </div>
            <div>
              <label htmlFor="shipTo">Ship To:</label>
              <p id="companyName">{formDataState.company}</p>
              <p id="shippingaddress">{formDataState.shippingAddress}</p>
              <p id="EmailId">{formDataState.emailId}</p>
            </div>
          </div>
          <div className="right-column">
            <div>
              <label htmlFor="invoiceNumber">Invoice Number:</label>
              <p id="invoiceNumber">{formDataState.invoiceNumber}</p>
            </div>
            <div>
              <label htmlFor="invoiceDate">Invoice Date:</label>
              <p id="invoiceDate">{formDataState.invoiceDate.toLocaleDateString()}</p>
            </div>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <p id="dueDate">{formDataState.dueDate.toLocaleDateString()}</p>
            </div>
            <div>
              <label htmlFor="paymentTerms">Payment Terms:</label>
              <p id="paymentTerms">{formDataState.paymentTerms}</p>
            </div>
          </div>
          <div className="totalr">
            <p>Billing Period:</p>
            <div className="totalr-bottom">
              <p>{formDataState.billingPeriod}</p>
              <p>Start Date:</p>
            </div>
            <div className="totalr-bottom">
              <p>{formDataState.startDate.toLocaleDateString()}</p> 
            </div>
            <div className="totalz-bottom">
              <p>End Date:</p>
            </div>
            <div className="totalz-bottom">
              <p>{formDataState.endDate.toLocaleDateString()}</p>
            </div>
          </div>
          <table className="details">
            <thead>
              <tr>
                <th>Description</th>
                <th>Service</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} />
                </td>
                <td>{formDataState.service}</td>
                <td>{formDataState.productMaterials}</td>
                <td>{formDataState.quantity}</td>
                <td>{formDataState.price}</td>
                <td>
                  <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="Thanks">
            <p>Thanks for the Support!</p>
          </div>
          <div className="totals">
            <div>
              <p>Total:</p>
              <p>Tax:</p>
              <p>Discount:</p>
              <p>Subtotal:</p>
              <p>Balance Due:</p>
            </div>
            <div>
              <p>{total}</p>
              <p>{tax}</p>
              <p>{discount}</p>
              <p>{subtotal}</p>
              <p>{balanceDue}</p>
            </div>
          </div>
          <div className="total">
            <p>Please Send To This Account Details ASAP!</p>
          </div>
          <div className="notes">
            <p>Message:</p>
            <p>{formDataState.note}</p>
          </div>
          <div className="buttons">
            <button onClick={handleSaveDescription}>Save Description</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleSend}>Send</button>
            <button onClick={handleBack}>Back</button>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <button onClick={handleDownload} className="btn" style={{ width: '100%' }} ><i className="fa fa-download"></i> Download</button>
          </div>
        </div>
     )}*/}
     
            
    </div>
  );
};

export default Payment;
