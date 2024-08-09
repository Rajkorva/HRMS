import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const InActiveClients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [client, setClient] = useState(location.state && location.state.client ? location.state.client : {
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
  const [clients, setClients] = useState(location.state && location.state.clients ? location.state.clients : []);

  useEffect(() => {
    if (location.state && location.state.client) {
      setClient(location.state.client);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClients(clients.map((cli, index) => (index === editIndex ? client : cli)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setClients([...clients, client]);
    }
    setClient({
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

  const handleInputChange = (e, field, subfield = null) => {
    const value = e.target ? e.target.value : e;
    if (subfield) {
      setClient({
        ...client,
        [field]: {
          ...client[field],
          [subfield]: value
        }
      });
    } else {
      setClient({
        ...client,
        [field]: value
      });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setSelectedClient(clients[index]);
  };

  const handleDelete = (index) => {
    setClients(clients.filter((_, i) => i !== index));
    if (selectedClient && index === clients.indexOf(selectedClient)) {
      setSelectedClient(null);
    }
  };

  const handleClientClick = (index) => {
    setSelectedClient(selectedClient === clients[index] ? null : clients[index]);
  };
  const handleAddToActive = () => {
    navigate('/active-clients', { state: { client: formData, clients: [...clients, formData] } });
  };

 

  return (
    <div className="InActiveClients-container">
        <h4 style={{color:'black'}}>In-Active Clients List</h4>
      <div>
        
      <label className="switch">
  
  <input type="checkbox"/>
  <span className="slider round"></span>
  <span className="active-text">Active</span>
  <span className="inactive-text">Inactive</span>
</label>

        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((cli, index) => (
              <tr key={index}>
                <td onClick={() => handleClientClick(index)}>{cli.companyName}</td>
                <td>
                  {!isEditing && (
                    <>
                    
                      <button onClick={() => handleEdit(index)}><i className="fa fa-pencil-square-o"></i></button>
                      <button onClick={() => handleDelete(index)}><i className="fa fa-trash"></i></button>
                      
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      {selectedClient && (
         
        <div>
            
          <h4>Selected Client Details</h4>
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
                  {`${selectedClient.communicationAddress.houseNumber}, ${selectedClient.communicationAddress.pincode}, ${selectedClient.communicationAddress.area}, ${selectedClient.communicationAddress.village}, ${selectedClient.communicationAddress.state}, ${selectedClient.communicationAddress.country}`}
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
              {/* Add other fields as needed */}
            </tbody>
          </table>
        </div>
      )}
       <button class="actives-button" onClick={handleAddToActive}>Add to Active List</button>
    </div>
  );
};

export default InActiveClients;
