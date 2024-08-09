import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import ActiveProjects from './ActiveProjects';
import InvoiceList from './InvoiceList';
import InActiveProjects from './InActiveProjects';

const ActiveClients = () => {
  const location = useLocation();
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [view, setView] = useState('basic'); // New state to manage the view
  const [subView, setSubView] = useState(''); // New state to manage sub-views
  const [projectView, setProjectView] = useState('');

  useEffect(() => {
    if (location.state && location.state.clients) {
      setClients(location.state.clients);
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    companyName: '',
    GSTTAX: '',
    address: '',
    billTo: '',
    contactNumber: '',
    contactEmail: '',
    billingPeriod: '',
    paymentTerms: '',
    customPaymentTerms: '',
    website: '',
    agreement: '',
    workOrder: '',
    communicationAddress: {
      houseNumber: '',
      pincode: '',
      area: '',
      village: '',
      state: '',
      country: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClients(clients.map((client, index) => (index === editIndex ? formData : client)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setClients([...clients, formData]);
    }
    setFormData({
      companyName: '',
      GSTTAX: '',
      address: '',
      billTo: '',
      contactNumber: '',
      contactEmail: '',
      billingPeriod: '',
      paymentTerms: '',
      customPaymentTerms: '',
      website: '',
      agreement: '',
      workOrder: '',
      communicationAddress: {
        houseNumber: '',
        pincode: '',
        area: '',
        village: '',
        state: '',
        country: ''
      }
    });
  };

  const handleClientClick = (client) => {
    setSelectedClient((prevClient) => (prevClient === client ? null : client));
  };

  const handleAddToInActive = () => {
    navigate('/inactive-clients', { state: { client: formData, clients: [...clients, formData] } });
  };
  

  return (
    <div className="ActiveClients-container" style={{width:'80%', marginLeft:'150px', marginTop:'30px'}}>
      {view === 'basic' && (
        <div>
          
          <h4 style={{color:'black'}}>Active Clients List</h4>
          <table>
            
            <thead>
            
            <div className="navigation">
              
        <button onClick={() => setView('basic')}>Basic</button>
        <button onClick={() => setView('others')}>Other Details</button>
      </div>
              <tr>
                <th>Company Name</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} onClick={() => handleClientClick(client)}>
                  <td>{client.companyName}</td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); console.log("Edit clicked") }} style={{width:'30px'}}><i className="fa fa-pencil-square-o" ></i></button>
                    <button onClick={(e) => { e.stopPropagation(); console.log("Delete clicked") }} style={{width:'30px'}}><i className="fa fa-trash" ></i></button>
                    <button className="inactives-button" style={{width:'152.65px'}} onClick={handleAddToInActive}>Add to Inactive List</button>
                  </td>
                  <td><label class="switch">
  <input type="checkbox" />
  <span class="slider round"></span>
  <span class="switch-text active-text" style={{top:'16px'}}>Active</span>
  <span class="switch-text inactive-text" style={{top:'16px'}}>InActive</span>
</label>
</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          {selectedClient && (
            <div>
              <h4>Client Details</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Company Name:</td>
                    <td>{selectedClient.companyName}</td>
                  </tr>
                  <tr>
                    <td>EIN - GST:</td>
                    <td>{selectedClient.GSTTAX}</td>
                  </tr>
                  <tr>
                    <td>Communication Address:</td>
                    <td>
                      {`${selectedClient.communicationAddress.houseNumber || ''}, ${selectedClient.communicationAddress.pincode || ''}, ${selectedClient.communicationAddress.area || ''}, ${selectedClient.communicationAddress.village || ''}, ${selectedClient.communicationAddress.state || ''}, ${selectedClient.communicationAddress.country || ''}`}
                    </td>
                  </tr>
                  <tr>
                    <td>Billing Email:</td>
                    <td>{selectedClient.billTo}</td>
                  </tr>
                  <tr>
                    <td>A-P Contact Number:</td>
                    <td>{selectedClient.contactNumber}</td>
                  </tr>
                  <tr>
                    <td>A-P Contact Email:</td>
                    <td>{selectedClient.contactEmail}</td>
                  </tr>
                  <tr>
                    <td>Billing Period:</td>
                    <td>{selectedClient.billingPeriod}</td>
                  </tr>
                  {selectedClient.paymentTerms === "custom" ? (
                    <tr>
                      <td>Payment Terms:</td>
                      <td>{selectedClient.customPaymentTerms}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>Payment Terms:</td>
                      <td>{selectedClient.paymentTerms}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Website:</td>
                    <td>{selectedClient.website}</td>
                  </tr>
                  <tr>
                    <td>Agreement:</td>
                    <td>{selectedClient.agreement}</td>
                  </tr>
                  <tr>
                    <td>Work Order:</td>
                    <td>{selectedClient.workOrder}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {/*<button className="inactives-button" onClick={handleAddToInActive}>Add to Inactive List</button>*/}
        </div>
      )}
      
      {view === 'others' && (
  <div>
    <div className="sub-navigation">
      <button className="sub-nav-button" onClick={() => setSubView('subOption1')}>Contacts</button>
      <button className="sub-nav-button" onClick={() => setSubView('subOption2')}>Projects</button>
      <button className="sub-nav-button" onClick={() => setSubView('subOption3')}>Invoices</button>
      <button className="sub-nav-button" onClick={() => setSubView('subOption4')}>Payments</button>
    </div>
    {subView === 'subOption1' && <div>Contact Details</div>}
    {subView === 'subOption2' && (
      <div>
        <div className="project-navigation">
          <button className="project-nav-button" onClick={() => setProjectView('active')}style={{backgroundColor:'#4caf50' }}>Active Projects</button>
          <button className="project-nav-button" onClick={() => setProjectView('inactive')}style={{backgroundColor:'#4caf50' }}>InActive Projects</button>
        </div>
        {projectView === 'active' && <ActiveProjects />}
        {projectView === 'inactive' && <InActiveProjects />}
      </div>
    )}
    {subView !== 'subOption2' && (
      <div className="additional-options">
        {/* Place additional options here */}
      </div>
    )}
    {subView === 'subOption3' && <InvoiceList />}
    {subView === 'subOption4' && <p>Payment</p>}
  </div>
)}

    </div>
  );
};

export default ActiveClients;
