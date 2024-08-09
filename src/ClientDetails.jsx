import React, { useState } from 'react';
import './App.css';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';



const ClientDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  

  // State and functions for client details
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
    },
    shippingAddress: {
      houseNumber: '',
      pincode: '',
      area: '',
      village: '',
      state: '',
      country: ''
    }

  });

  const [clients, setClients] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  

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
      },
      shippingAddress: {
        houseNumber: '',
        pincode: '',
        area: '',
        village: '',
        state: '',
        country: ''
      }
    });
  };         const PaymentTerms = () => {
    const [formData, setFormData] = useState({
      paymentTerms: '',
      customPaymentTerms: ''
    });
  };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleCustomTermAddition = () => {
      if (formData.customPaymentTerms) {
        setFormData({
          ...formData,
          paymentTerms: formData.customPaymentTerms
        });
      }
    };
  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(clients[index]);
  };

  const handleDelete = (index) => {
    setClients(clients.filter((_, i) => i !== index));
    if (selectedClient === clients[index]) {
      setSelectedClient(null);
    }
  };

  const handleProjectClick = (index) => {
    if (selectedClient && selectedClient === clients[index]) {
      setSelectedClient(null);
    } else {
      setSelectedClient(clients[index]);
    }
  };

  const handleAddToActive = () => {
    navigate('/active-clients', { state: { client: formData, clients: [...clients, formData] } });
  };

  const handleAddToInActive = () => {
    navigate('/inactive-clients', { state: { client: formData, clients: [...clients, formData] } });
  };
  

  return (
    <div className="ClientDetails">
      <h4>Client Details</h4>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Company Name:</td>
              <td>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>EIN/GST:</td>
              <td>
                <input
                  type="text"
                  name="GSTTAX"
                  value={formData.GSTTAX}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Billing Email:</td>
              <td>
                <input
                  type="text"
                  name="billTo"
                  value={formData.billTo}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>A/P Contact Number:</td>
              <td>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>A/P Contact Email:</td>
              <td>
                <input
                  type="text"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Communication Address:</td>
              <td>
                <input
                  type="text"
                  placeholder="House Number/Flat Number"
                  value={formData.communicationAddress.houseNumber}
                  onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, houseNumber: e.target.value } })}
                />
                <br />
                
                <input
                  type="text"
                  placeholder="Area/Street"
                  value={formData.communicationAddress.area}
                  onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, area: e.target.value } })}
                />
                <br />
                <input
                  type="text"
                  placeholder="City"
                  value={formData.communicationAddress.village}
                  onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, village: e.target.value } })}
                />
                <br />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.communicationAddress.state}
                  onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, state: e.target.value } })}
                />
                <br />
                <input
                type="text"
                placeholder="ZipCode"
                value={formData.communicationAddress.pincode}
                onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, pincode: e.target.value } })}
              />
              
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.communicationAddress.country}
                  onChange={(e) => setFormData({ ...formData, communicationAddress: { ...formData.communicationAddress, country: e.target.value } })}
                />
              </td>
            </tr>
            <tr>
              <td>Shipping Address:(If Applicable)</td>
              <td>
                <input
                  type="text"
                  placeholder="House Number/Flat Number"
                  value={formData.shippingAddress.houseNumber}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, houseNumber: e.target.value } })}
                />
                <br />
                
                <input
                  type="text"
                  placeholder="Area/Street"
                  value={formData.shippingAddress.area}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, area: e.target.value } })}
                />
                <br />
                <input
                  type="text"
                  placeholder="City"
                  value={formData.shippingAddress.village}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, village: e.target.value } })}
                />
                <br />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.shippingAddress.state}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, state: e.target.value } })}
                />
                <br />
                <input
                type="text"
                placeholder="ZipCode"
                value={formData.shippingAddress.pincode}
                onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, pincode: e.target.value } })}
              />
              
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.shippingAddress.country}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, country: e.target.value } })}
                />
              </td>
            </tr>
            <tr>
              <td>Billing Period:</td>
              <td>
                <select
                  name="billingPeriod"
                  value={formData.billingPeriod}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="weekly">Weekly</option>
                  <option value="biWeekly">BiWeekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="semiMonthly">SemiMonthly</option>
                </select>
              </td>
            </tr>
            <tr>
      <td>Payment Terms:</td>
      <td>
        <select
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleChange}
        >
          <option value="">Select payment term</option>
          <option value="net7">Net7</option>
          <option value="net15">Net15</option>
          <option value="net30">Net30</option>
          <option value="net45">Net45</option>
          <option value="net60">Net60</option>
          {formData.paymentTerms !== 'custom' && (
            <option value="custom">Custom</option>
          )}
          {formData.customPaymentTerms && (
            <option value={formData.customPaymentTerms}>
              {formData.customPaymentTerms}
            </option>
          )}
        </select>
        {formData.paymentTerms === 'custom' && (
          <>
            <input
              type="text"
              name="customPaymentTerms"
              value={formData.customPaymentTerms}
              onChange={handleChange}
              placeholder="Enter custom payment terms"
            />
            <button onClick={handleCustomTermAddition}>Add</button>
          </>
        )}
      </td>
    </tr>

            <tr>
              <td>Website:</td>
              <td>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Attach Agreement:</td>
              <td>
                <label htmlFor="upload">Upload File</label>
                <input
                  id="upload"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    e.target.previousElementSibling.textContent = file ? `File Uploaded: ${file.name}` : 'Upload File';
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Attach Work Order:</td>
              <td>
                <label htmlFor="upload">Upload File</label>
                <input
                  id="upload"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    e.target.previousElementSibling.textContent = file ? `File Uploaded: ${file.name}` : 'Upload File';
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>     
  <button onClick={handleAddToActive}>Add To Active List</button>
  {/*<button onClick={handleAddToInActive}>Add to Inactive List</button>*/}

      </form>
      <div>
        <h4></h4>
        <table>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td onClick={() => handleProjectClick(index)}>{client.companyName}</td>
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
                <td>Shipping Address:</td>
                <td>
                  {`${selectedClient.shippingAddress.houseNumber}, ${selectedClient.shippingAddress.pincode}, ${selectedClient.shippingAddress.area}, ${selectedClient.shippingAddress.village}, ${selectedClient.shippingAddress.state}, ${selectedClient.shippingAddress.country}`}
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
      {/* Add new project section */}
      <ProjectDetails index={index} />
      
    </div>
  );
};

export default ClientDetails;
