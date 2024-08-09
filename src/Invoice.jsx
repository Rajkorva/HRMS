import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';
import { eachWeekOfInterval, addDays, format } from 'date-fns';


const Invoice = () => {
  const navigate = useNavigate();
  
  
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    billingPeriod: '',
    quantity: '',
    startDate: new Date(),
    endDate: new Date(),
    price: '',
    tax: '',
    amount: '',
    project:'',
    service: '',
    productMaterials: '',
    note: '',
    total: '',
    subtotal: '',
    discount: '',
    accountNumber: '',
    bankDetails: '',
    balanceDue: '',
    AttachTimesheet: '',
        additionalAttachment: { AttachTimesheet_additional: [] },
  });

  
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedProject, setSelectedProject] =useState({});
  const [selectedClient, setSelectedClient] = useState(null);

  
  const [projectOptions, setProjectOptions] = useState([
    { name: 'Project 1' },
    { name: 'Project 2' },
    // Add more projects as needed
  ]);
  
  
  const [clientOptions, setClientOptions] = useState([
    { 
      name: 'Client1', 
      communicationAddress: { houseNumber: '123', pincode: '111111', area: 'Area1', village: 'Village1', state: 'State1', country: 'Country1' },
      shippingAddress: { houseNumber: '321', pincode: '111112', area: 'Area1b', village: 'Village1b', state: 'State1b', country: 'Country1b' },
      paymentTerms: 'Net 30', 
      billingPeriod: 'Monthly' 
    },
    { 
      name: 'Client2', 
      communicationAddress: { houseNumber: '456', pincode: '222222', area: 'Area2', village: 'Village2', state: 'State2', country: 'Country2' },
      shippingAddress: { houseNumber: '654', pincode: '222223', area: 'Area2b', village: 'Village2b', state: 'State2b', country: 'Country2b' },
      paymentTerms: 'Net 45', 
      billingPeriod: 'Quarterly' 
    }
  ]);
  

  
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      generateWeeks(formData.startDate, formData.endDate);
    }
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    // For testing purposes, clear the local storage (use this line only once to reset)
    localStorage.removeItem('lastInvoiceNumber');

    // Get the last invoice number from local storage or start from 1 if it doesn't exist
    const lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber') || '0', 10);
    const newInvoiceNumber = lastInvoiceNumber + 1;
    setFormData(prevData => ({
      ...prevData,
      invoiceNumber: newInvoiceNumber.toString()
    }));
  }, []);
  const [selectedEmployee, setSelectedEmployee] = useState({ price: '' }); // Initialize selectedEmployee state with an empty price

// Function to handle unit price change
const handleUnitPriceChange = (value) => {
  setSelectedEmployee(prevEmployee => ({
    ...prevEmployee,
    price: value
  }));
};
  {/*const handleAddNew = () => {
    const newClient = { 
      name: 'NewClient', 
      communicationAddress: { houseNumber: '789', pincode: '333333', area: 'Area3', village: 'Village3', state: 'State3', country: 'Country3' }, 
      paymentTerms: 'Net 60', 
      billingPeriod: 'Annually' 
    };
    setClientOptions([...clientOptions, newClient]);
    setSelectedClient(newClient);
  };*/}
  const handleAddNew = () => {
    const newClient = { 
      name: 'NewClient', 
      communicationAddress: { houseNumber: '789', pincode: '333333', area: 'Area3', village: 'Village3', state: 'State3', country: 'Country3' }, 
      shippingAddress: { houseNumber: '789', pincode: '333333', area: 'Area3', village: 'Village3', state: 'State3', country: 'Country3' }, 
      paymentTerms: 'Net 60', 
      billingPeriod: 'Annually' 
    };
    setClientOptions([...clientOptions, newClient]);
    setSelectedClient(newClient); // Select the newly added client
    navigate('/client-details'); // Navigate to client details page
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name.includes('Date') ? new Date(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleInvoiceDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      invoiceDate: date,
      dueDate: new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    }));
  };

  const handleDueDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dueDate: date,
    }));
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/invoice-details', { state: { ...formData, selectedClient: selectedClient, billingPeriod: selectedClient ? selectedClient.billingPeriod : '', description: formData.description, price: formData.price,  } });
  };
  
 
  

  const handleCurrencyChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleClientSelectChange = (e) => {
    const selectedClientName = e.target.value;
    if (selectedClientName === 'add-new') {
      handleAddNew();
    } else {
      const selectedClient = clientOptions.find(client => client.name === selectedClientName);
      setSelectedClient(selectedClient);
    }
  };
  const [selectedProjectOption, setSelectedProjectOption] = useState(selectedProject);

  // Function to handle project selection change
  const handleProjectSelectChange = (e) => {
    const selectedProjectName = e.target.value;
    const selectedProject = projectOptions.find(project => project.name === selectedProjectName);
    setSelectedProjectOption(selectedProject);
  };
  const handleProductSelectChange = (event) => {
    const { name, value } = event.target;
    if (value === 'addNew') {
      navigate('/employee-management'); // Navigate to employee management page
    } else {
      handleChange(event);
    }
  };
  const handleAdditionalAttachmentChange = (e) => {
    const { name, files } = e.target;
    const newFormData = { ...formData };
    newFormData.additionalAttachment[name] = files[0];
    setFormData(newFormData);
  };

  const removeAdditionalAttachment = (index, key) => {
    const newFormData = { ...formData };
    newFormData.additionalAttachment[key].splice(index, 1);
    setFormData(newFormData);
  };

  const addAdditionalAttachmentInput = (key) => {
    const newFormData = { ...formData };
    newFormData.additionalAttachment[key] = [...(newFormData.additionalAttachment[key] || []), ''];
    setFormData(newFormData);
  };
  useEffect(() => {
    // Calculate the amount based on quantity/hour and price
    const calculatedAmount = formData.quantity * selectedEmployee.price;
    setAmount(calculatedAmount);
    

    // Calculate subtotal, tax, discount, total, and balance due
    const calculatedSubtotal = calculatedAmount;
  }, [formData.quantity, selectedEmployee.price]);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      generateWeeks(formData.startDate, formData.endDate);
    }
  }, [formData.startDate, formData.endDate]);

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  };

  const generateWeeks = (startDate, endDate) => {
    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    ).map((weekStart) => {
      const days = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStart, i);
        return day <= endDate ? format(day, 'yyyy-MM-dd') : '';
      });
      return { weekStart: format(weekStart, 'yyyy-MM-dd'), days };
    });
    setWeeks(weeks);
    setSelectedWeeks(weeks.map(() => false));
  };

  const toggleWeekSelection = (index) => {
    const updatedSelection = [...selectedWeeks];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedWeeks(updatedSelection);
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedWeeks(selectedWeeks.map(() => newSelectAll));
  };

  return (
    <div className="invoice-Detail">
      <form onSubmit={handleSubmit} className="invoice-forms">
      <label className="billTo">
  <span>Bill To:</span>
  <select name="billTo" onChange={handleClientSelectChange}>
    <option value="name">Select</option>
    {clientOptions.map((client, index) => (
      <option key={index} value={client.name}>{client.name}</option>
    ))}
    <option value="add-new">Add New</option>
  </select>
</label>


<label className="billToAddress">
  <span>Billing Address:</span>
  <span>
    {selectedClient && `${selectedClient.communicationAddress.houseNumber}, ${selectedClient.communicationAddress.pincode}, ${selectedClient.communicationAddress.area}, ${selectedClient.communicationAddress.village}, ${selectedClient.communicationAddress.state}, ${selectedClient.communicationAddress.country}`}
  </span>
</label>

<label className="shipTo">
  <span>Ship To :</span>
  <span>
    {selectedClient && `${selectedClient.shippingAddress.houseNumber}, ${selectedClient.shippingAddress.pincode}, ${selectedClient.shippingAddress.area}, ${selectedClient.shippingAddress.village}, ${selectedClient.shippingAddress.state}, ${selectedClient.shippingAddress.country}`}
  </span>
</label>
{/*<label className="billingPeriod">
  <span>Billing Period:</span>
  <span>
    {selectedClient && selectedClient.billingPeriod}
  </span>
    </label>*/}

{/*<label className="paymentTerms">
  <span>Payment Terms:</span>
  <span>
    {selectedClient && selectedClient.paymentTerms}
  </span>
    </label>*/}

<label className="project">
        <span>Project:</span>
        <select 
          name="project" 
          value={selectedProjectOption ? selectedProjectOption.name : 'select'} 
          onChange={handleProjectSelectChange}
        >
          <option value="select">Select</option>
          {projectOptions.map((project, index) => (
            <option key={index} value={project.name}>{project.name}</option>
          ))}
        </select>
      </label>
    {/*} <label className="projectName">
  <span>Project Name:</span>
  <span>
  {selectedProject && selectedProject.projectName}
</span>

          </label>*/}



        <label className="invoiceNumber">
          <span>Invoice Number:</span>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="Invoice #"
          />
        </label>
        <label className="invoiceDate">
          <span>Invoice Date:</span>
          <DatePicker
            name="invoiceDate"
            selected={formData.invoiceDate}
            onChange={handleInvoiceDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </label>
        <label className="dueDate">
          <span>Due Date:</span>
          <DatePicker
            name="dueDate"
            selected={formData.dueDate}
            onChange={handleDueDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </label>
        <label className="quantity">
          <span>Quantity:</span>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Hours"
          />
        </label>
        
        <label className="billingRate">
  <span>Unit Price:</span>
  <input
    type="text"
    name="billingRate"
    value={selectedEmployee.price || ''} // Use selectedEmployee.price as the value
    onChange={(e) => handleUnitPriceChange(e.target.value)}
    placeholder="Unit price"
  />
</label>

{/*}
{selectedEmployee.price && (
  <tr>
    <td>Price:</td>
    <td>{selectedEmployee.price}</td>
  </tr>
)}*/}
<label className="amount">
          <span>Amount:</span>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
        </label>

        <label className="description">
          <span>Description:</span>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </label>
        <div>
      <label className="service" style={{ marginLeft: '-160px', marginRight: '-160px' }}>
        <span>Service Date:</span>
        <div className="dateInputs">
          <label className="startDate">
            <span>Start Date:</span>
            <DatePicker
              name="startDate"
              selected={formData.startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <label className="endDate">
            <span>End Date:</span>
            <DatePicker
              name="endDate"
              selected={formData.endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </label>
        </div>
      </label>

      {formData.startDate && formData.endDate && weeks.length > 0 && (
        <div>
          {weeks.map((week, index) => (
            <div key={index} className="week" style={{ width: '150px' }}>
              <div>
                <span style={{ width: '100%' }}>
                  Week starting {format(new Date(week.weekStart), 'dd/MM/yyyy')}
                  <input
                    style={{ marginLeft: '100px' }}
                    type="checkbox"
                    checked={selectedWeeks[index]}
                    onChange={() => toggleWeekSelection(index)}
                  />
                </span>
              </div>
              <div className="calendar" style={{ width: '330px', display: 'flex', color: 'black', height: '90px' }}>
                {week.days.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`day${day ? '' : ' disabled'}`}
                    style={{
                      flex: '1',
                      border: '1px solid #ccc',
                      padding: '5px',
                      borderRadius: '5px',
                      margin: '1px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {day && (
                      <React.Fragment>
                        <div className={`day-name${dayIndex === 5 || dayIndex === 6 ? ' weekend' : ''}`}>
                          {format(new Date(day), 'EEE')} {/* Abbreviated day name */}
                        </div>
                        <div className={`date${dayIndex === 5 || dayIndex === 6 ? ' weekend' : ''}`}>
                          {format(new Date(day), 'd')} {/* Display only the day */}
                        </div>
                        <input type="text" placeholder="0" disabled={selectedWeeks[index]} />
                        {/* <div className="day-description">
                          <textarea
                            className="description-input"
                            placeholder="Work done"
                            rows="2"
                            cols="10"
                            disabled={selectedWeeks[index]}
                          />
                        </div> */}
                      </React.Fragment>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    

      <label className="productMaterials">
      <span>Product/Service:</span>
      <select
        name="productMaterials"
        value={formData.productMaterials}
        onChange={handleProductSelectChange}
      >
        <option value="">Select Products/Services</option>
        <option value="product1">Product 1</option>
        <option value="product2">Product 2</option>
        <option value="employee1">Employee 1</option>
        <option value="employee2">Employee 2</option>
        <option value="addNew">Add New</option>
      </select>
    </label>
        <label className="subTotal">
          <span>Sub Total:</span>
          <input
            type="text"
            name="subTotal"
            value={formData.subTotal}
            onChange={handleChange}
            placeholder="Sub Total"
          />
        </label>
        <label className="tax">
          <span>Tax:</span>
          <input
            type="text"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            placeholder="Tax"
          />
        </label>
        <label className="discount">
          <span>Discount:</span>
          <input
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount"
          />
        </label>
        <label className="totalAmount">
          <span>Total:</span>
          <input
            type="text"
            name="totalAmount"
            value={formData.total}
            onChange={handleChange}
            placeholder="Total Amount"
          />
        </label>
        {/*<label className="currency">
          <span>Currency:</span>
          <select 
            name="currency" 
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="$">USD</option>
            <option value="€">EUR</option>
            <option value="£">GBP</option>
            <option value="¥">JPY</option>
            <option value="₹">INR</option>
          </select>
</label>*/}
              <label className="attachments-invoice" style={{}}>
              <span>Attach Bills :</span>
              
                
                <input
                  type="file"
                  id="AttachTimesheet"
                  name="AttachTimesheet"
                  value={formData.AttachTimesheet}
                  onChange={handleChange}
                />
                {/* Additional input for multiple attachments */}
                {formData.additionalAttachment.AttachTimesheet_additional.map(
                  (attachment, index) => (
                    <div key={index} className="additional-input">
                      <input
                        type="file"
                        id={`AttachTimesheet_additional_${index}`}
                        name="AttachTimesheet_additional"
                        onChange={handleAdditionalAttachmentChange}
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalAttachment(index, 'AttachTimesheet_additional')}
                      >
                        &#10006;
                      </button>
                    </div>
                  )
                )}
                <button
                style={{width:'100%'}}
                  type="button"
                  onClick={() => addAdditionalAttachmentInput('AttachTimesheet_additional')}
                >
                  Add
                </button>
              
              </label>
        <label className="note">
          <span>Message:</span>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Write Something Here"
          />
        </label>
        <button type="submit" className="button" style={{width:'20%', marginLeft:'450px'}}>Preview</button>
      </form>
    </div>
  );
};

export default Invoice;

