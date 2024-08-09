import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './App.css'; // Import the CSS file for styling

const SoldSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: {
      houseNumber: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    },
    projectName: '',
    productName: '',
    totalSaleAmount: '',
    totalAmountReceived: '',
    registrationAmount: '',
    amount: '',
    gst: '',
    stampDuty: ''
  });

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleDownload = () => {
    const options = {
      filename: 'sold_sheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(document.getElementById('pdf-content')).set(options).save();
  };

  const handleSend = () => {
    alert('Form sent to bill-to details!');
  };

  const handleSave = (e) => {
    e.preventDefault();
    navigate('/sold');
  };

  const handleBack = () => {
    navigate('/sold');
  };

  if (deleted) {
    return <div>Form has been deleted.</div>;
  }

  return (
    <div>
      <div id="pdf-content" className="a4-sheet" style={{marginTop:'20px',height:'650px', color: 'black', border: '2px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <div className="header">
          <div style={{marginLeft:'135px'}}><img src="https://www.elintpros.com/assets/img/elintpro_logo.png" alt="Company Logo" className="logo" /></div>
          <h1 style={{ marginTop: '10px', marginRight:'140px' }}>Sold Sheet</h1>
        </div>
        <div className="content">
          <div className="section" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="column" style={{marginLeft:'250px',}}>
              <p><strong>Customer Name:</strong> {formData.customerName}</p>
              <p style={{marginRight:'5px'}}><strong>Mobile Number:</strong> {formData.customerPhone}</p>
            </div>
            <div className="column">
              <p style={{marginRight:'40px'}}><strong>Email ID:</strong> {formData.customerEmail}</p>
              <p><strong>Address:</strong> {`${formData.customerAddress.houseNumber}, ${formData.customerAddress.area}, ${formData.customerAddress.city}, ${formData.customerAddress.state}, ${formData.customerAddress.pincode}, ${formData.customerAddress.country}`}</p>
            </div>
          </div>
          <div className="section" style={{marginLeft:'375px',width:'50%', borderTop: '2px solid #ccc', paddingTop: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <p><strong>Project Name:</strong> {formData.projectName}</p>
            <p><strong>Product Name:</strong> {formData.productName}</p>
          </div>
          <div className="section" style={{marginLeft:'375px',width:'50%', borderTop: '2px solid #ccc', paddingTop: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <p><strong>Total Sale Amount:</strong> {formData.totalSaleAmount}</p>
            <p><strong>Total Amount Received:</strong> {formData.totalAmountReceived}</p>
          </div>
          <div className="section" style={{marginLeft:'325px',width:'60%', borderTop: '2px solid #ccc', paddingTop: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <p><strong>Registration Amount:</strong> {formData.amount}</p>
            <p><strong>GST %:</strong> {formData.gst}</p>
            <p><strong>Stamp Duty %:</strong> {formData.stampDuty}</p>
          </div>
        </div>
        <div className="footer" style={{ borderTop: '2px solid #ccc', paddingTop: '20px', marginTop: '20px' }}>
          <p>Thank You</p>
        </div>
      </div>
      <div className="buttons" style={{ marginTop: '20px',marginBottom:'20px', width:'75%', marginLeft:'140px' }}>
        <button style={{ marginRight: '10px' }} onClick={handleSave}>Save</button>
        <button style={{ marginRight: '10px' }} onClick={handleSend}>Send</button>
        <button style={{ marginRight: '10px' }} onClick={handleBack}>Back</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default SoldSheet;
