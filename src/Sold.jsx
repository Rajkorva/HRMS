import React, { useState, useEffect } from 'react';
import './App.css'; 
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';

const Sold = () => {
  const { index } = useParams(); 
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
    referredBy: '',
    productCategory: '',
    subCategory: '',
    budgetRange: '',
    visitDate: '',
    followUpDate: '',
    conversation: '',
    additionalFollowUpDates: [{ followUpDate: '', conversation: '' }],
    comments: '',
    productType: '',
    productName: '',
    basePrice: '',
    salePrice: '',
    saleInitiatedDate: '',
    duration: '',
    payFrequency: '',
    effectiveDate: '',
    expectedSaleDate: '',
    advanceTokenAmount: '',
    date: '',
    nextPaymentDate: '',
    notifyToCustomer: '',
    notifyToAdmin: '',
    totalSaleAmount: '',
    totalAmountReceived: '',
    registrationAmount: '',
    amount: '',
    gst: '',
    stampDuty: '',
    expectedRegistrationDate: ''
  });
  const [registrationAmount, setRegistrationAmount] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [solds, setSolds] = useState([]);
  const [selectedSold, setSelectedSold] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();
  const [inProcesses, setInProcesses] = useState([]);
  const [selectedInProcess, setSelectedInProcess] = useState(null);

  const handleSoldClick = (index) => {
    setSelectedSold(selectedSold === solds[index] ? null : solds[index]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedSolds = solds.map((item, idx) =>
        idx === editIndex ? formData : item
      );
      setSolds(updatedSolds);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setSolds([...solds, formData]);
    }
    setSelectedItem(formData);
    resetForm();
  };

  const handleProceedToRegistration = (e) => {
    e.preventDefault(); // Prevent form submission
    handleSubmit(e); // Save the form data
    navigate('/sold-sheet', { state: { formData } }); // Navigate to SoldSheet with form data
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: {
        houseNumber: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      },
      projectName: '',
      referredBy: '',
      productCategory: '',
      subCategory: '',
      budgetRange: '',
      visitDate: '',
      followUpDate: '',
      conversation: '',
      additionalFollowUpDates: [{ followUpDate: '', conversation: '' }],
      comments: '',
      productType: '',
      productName: '',
      basePrice: '',
      salePrice: '',
      saleInitiatedDate: '',
      duration: '',
      payFrequency: '',
      effectiveDate: '',
      expectedSaleDate: '',
      advanceTokenAmount: '',
      date: '',
      nextPaymentDate: '',
      notifyToCustomer: '',
      notifyToAdmin: '',
      totalSaleAmount: '',
      totalAmountReceived: '',
      registrationAmount: '',
      amount: '',
      gst: '',
      stampDuty: '',
      expectedRegistrationDate: '',
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(inProcesses[index]);
  };

  const handleDelete = (index) => {
    setSolds(solds.filter((_, i) => i !== index));
    if (selectedSold && index === solds.indexOf(selectedSold)) {
      setSelectedSold(null);
    } 
    setInProcesses(inProcesses.filter((_, i) => i !== index));
    if (selectedInProcess && index === inProcesses.indexOf(selectedInProcess)) {
      setSelectedInProcess(null);
    
  };
};

  
 
  
  
  useEffect(() => {
    if (location.state && location.state.inProcesses) {

  setInProcesses(location.state.inProcesses);
}
}, [location.state]);

 // Define prospects state
 const handleInProcessClick = (index) => {
  setSelectedInProcess(selectedInProcess === inProcesses[index] ? null : inProcesses[index]);
};
const handleAdditionalFollowUpDateChange = (e, index) => {
  const { name, value } = e.target;
  const newDates = [...formData.additionalFollowUpDates];
  newDates[index] = { ...newDates[index], [name]: value };
  setFormData({
    ...formData,
    additionalFollowUpDates: newDates,
  });
};

const addAdditionalFollowUpDateInput = () => {
  setFormData({
    ...formData,
    additionalFollowUpDates: [
      ...formData.additionalFollowUpDates,
      { followUpDate: '', conversation: '' }
    ],
  });
};

const removeAdditionalFollowUpDate = (index) => {
  const newDates = [...formData.additionalFollowUpDates];
  newDates.splice(index, 1);
  setFormData({
    ...formData,
    additionalFollowUpDates: newDates,
  });
};
const handleCategoryChange = (selectedCategory) => {
  if (selectedCategory.value === 'addNew') {
    const newCategory = prompt('Enter new category:');
    if (newCategory) {
      setProductCategories([
        ...productCategories,
        { value: newCategory.toLowerCase(), label: newCategory }
      ]);
      setFormData((prevData) => ({
        ...prevData,
        productCategory: newCategory.toLowerCase(),
      }));
      setSubCategories((prevSubCategories) => ({
        ...prevSubCategories,
        [newCategory.toLowerCase()]: [{ value: '', label: 'Select Sub Category' }]
      }));
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      productCategory: selectedCategory.value,
    }));
  }
};

const handleSubCategoryChange = (selectedSubCategory) => {
  if (selectedSubCategory.value === 'addNew') {
    const newSubCategory = prompt('Enter new subcategory:');
    if (newSubCategory) {
      setSubCategories((prevSubCategories) => ({
        ...prevSubCategories,
        [formData.productCategory]: [
          ...prevSubCategories[formData.productCategory],
          { value: newSubCategory.toLowerCase(), label: newSubCategory }
        ],
      }));
      setFormData((prevData) => ({
        ...prevData,
        subCategory: newSubCategory.toLowerCase(),
      }));
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      subCategory: selectedSubCategory.value,
    }));
  }
};
const [productCategories, setProductCategories] = useState([
  { value: '', label: 'Select Category' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Food' },
]);
const [subCategories, setSubCategories] = useState({
  electronics: [
    { value: '', label: 'Select Sub Category' },
    { value: 'phones', label: 'Phones' },
    { value: 'computers', label: 'Computers' },
    { value: 'accessories', label: 'Accessories' },
  ],
  clothing: [
    { value: '', label: 'Select Sub Category' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
  ],
  food: [
    { value: '', label: 'Select Sub Category' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'snacks', label: 'Snacks' },
  ],
});
const payFrequency = ['Select', 'PerHour', 'PerDay', 'PerWeek', 'PerMonth'];





  

  return (
    <div className="Sold" style={{width:'90%'}}>
       <div>
                        <h4 style={{color:'black'}}>Sold List</h4>
                        <table>
                          <thead>
                            <tr>
                              <th>Customer Name</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inProcesses.map((inprocess, index) => (
                              <tr key={index}>
                                <td onClick={() => handleInProcessClick(index)}>{inprocess.customerName}</td>
                                <td>
                                  <button onClick={() => handleEdit(index)}>
                                    <i className="fa fa-pencil-square-o"></i>
                                  </button>
                                  <button onClick={() => handleDelete(index)}>
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {selectedInProcess && (
                        <div>
                          <h4>Selected Project Details</h4>
                          <table>
                            <tbody>
                              <tr>
                                <td>Customer Name:</td>
                                <td>{selectedInProcess.customerName}</td>
                              </tr>
                              <tr>
                    <td>Mobile Number:</td>
                    <td>{selectedInProcess.customerPhone}</td>
                  </tr>
                  <tr>
                    <td>Email ID:</td>
                    <td>{selectedInProcess.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{`${selectedInProcess.customerAddress.area}, ${selectedInProcess.customerAddress.city}, ${selectedInProcess.customerAddress.state}`}</td>
                  </tr>
                  <tr>
                    <td>Project Name:</td>
                    <td>{selectedInProcess.projectName}</td>
                  </tr>
                  <tr>
                    <td>Referred By:</td>
                    <td>{selectedInProcess.referredBy}</td>
                  </tr>
                  <tr>
                    <td>Interested In:</td>
                    <td>{`${selectedInProcess.productCategory} - ${selectedInProcess.subCategory}`}</td>
                  </tr>
                  <tr>
                    <td>Budget Range:</td>
                    <td>{selectedInProcess.budgetRange}</td>
                  </tr>
                  <tr>
                    <td>Visit Date:</td>
                    <td>{selectedInProcess.visitDate}</td>
                  </tr>
                  <tr>
                    <td>Follow Up Date:</td>
                    <td>{`${selectedInProcess.followUpDate},${selectedInProcess.conversation}`}</td>
                  </tr>
                  {selectedInProcess.additionalFollowUpDates && selectedInProcess.additionalFollowUpDates.map((item, index) => (
                    <tr key={index}>
                      <td>Additional Follow Up Date {index + 1}:</td>
                      <td>{`${item.followUpDate}, ${item.conversation}`}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Comments:</td>
                    <td>{selectedInProcess.comments}</td>
                  </tr>
                              <tr>
                                <td>Product Type:</td>
                                <td>{selectedInProcess.productType}</td>
                              </tr>
                              <tr>
                                <td>Product Name:</td>
                                <td>{selectedInProcess.productName}</td>
                              </tr>
                              <tr>
                                <td>Base Price:</td>
                                <td>{selectedInProcess.basePrice}</td>
                              </tr>
                              <tr>
                                <td>Sale Price:</td>
                                <td>{selectedInProcess.salePrice}</td>
                              </tr>
                              <tr>
                                <td>Sale Initiated Date:</td>
                                <td>{selectedInProcess.saleInitiatedDate}</td>
                              </tr>
                              <tr>
                                <td>Duration:</td>
                                <td>{selectedInProcess.duration}</td>
                              </tr>
                              <tr>
                                <td>Pay Frequency:</td>
                                <td>{selectedInProcess.payFrequency}</td>
                              </tr>
                              <tr>
                                <td>Effective Date:</td>
                                <td>{selectedInProcess.effectiveDate}</td>
                              </tr>
                              <tr>
                                <td>Expected Sale Date:</td>
                                <td>{selectedInProcess.expectedSaleDate}</td>
                              </tr>
                              <tr>
                                <td>Advance/Token Amount:</td>
                                <td>{selectedInProcess.advanceTokenAmount}</td>
                              </tr>
                              <tr>
                                <td>Date:</td>
                                <td>{selectedInProcess.date}</td>
                              </tr>
                              <tr>
                                <td>Next Payment Date:</td>
                                <td>{selectedInProcess.nextPaymentDate}</td>
                              </tr>
                              <tr>
                                <td>Notify To Customer:</td>
                                <td>{selectedInProcess.notifyToCustomer}</td>
                              </tr>
                              <tr>
                                <td>Notify To Admin:</td>
                                <td>{selectedInProcess.notifyToAdmin}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
      <h5 style={{color:'black'}}>Fill The Sold Details Form {index}</h5> 
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
          <tr>
                  <td>Customer Name:</td>
                  <td>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td>Mobile Number:</td>
                  <td>
                    <input
                      type="text"
                      name="customerPhone"
                      placeholder="Mobile Number"
                      value={formData.customerPhone}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email ID:</td>
                  <td>
                    <input
                      type="text"
                      name="customerEmail"
                      placeholder="Email ID"
                      value={formData.customerEmail}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    <input
                      type="text"
                      placeholder="House Number/Flat Number"
                      value={formData.customerAddress.houseNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            houseNumber: e.target.value
                          }
                        })
                      }
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Area/Street"
                      value={formData.customerAddress.area}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            area: e.target.value
                          }
                        })
                      }
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.customerAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            city: e.target.value
                          }
                        })
                      }
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.customerAddress.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            state: e.target.value
                          }
                        })
                      }
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="ZipCode"
                      value={formData.customerAddress.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            pincode: e.target.value
                          }
                        })
                      }
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.customerAddress.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            country: e.target.value
                          }
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Project Name:</td>
                  <td>
                    <input
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      value={formData.projectName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Referred By:</td>
                  <td>
                    <input
                      type="text"
                      name="referredBy"
                      placeholder="Name"
                      value={formData.referredBy}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Interested In:</td>
                  <td>
                    <td>Category</td>
                    <Select
                      options={[...productCategories, { value: 'addNew', label: 'Add New' }]}
                      value={productCategories.find(cat => cat.value === formData.productCategory)}
                      onChange={handleCategoryChange}
                    />
                    <td>Sub Category</td>
                    <Select
                      options={
                        formData.productCategory
                          ? [
                              ...subCategories[formData.productCategory] || [],
                              { value: 'addNew', label: 'Add New' }
                            ]
                          : [{ value: '', label: 'Select Category First' }]
                      }
                      value={
                        formData.productCategory
                          ? subCategories[formData.productCategory]?.find(
                              subCat => subCat.value === formData.subCategory
                            )
                          : null
                      }
                      onChange={handleSubCategoryChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Budget Range:</td>
                  <td>
                    <input
                      type="value"
                      name="budgetRange"
                      placeholder="Budget Range"
                      value={formData.budgetRange}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Visit Date:</td>
                  <td>
                    <input
                      type="date"
                      name="visitDate"
                      placeholder="Visit Date"
                      value={formData.visitDate}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
  <td>Follow Up Date:</td>
  <td>
    <div className="follow-up-container">
      <div className="follow-up-input">
        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="conversation"
          placeholder="Conversation"
          value={formData.conversation}
          onChange={handleChange}
        />
      </div>
      {formData.additionalFollowUpDates.map((item, index) => (
        <div key={index} className="additional-input">
          <input
            type="date"
            name="followUpDate"
            value={item.followUpDate}
            onChange={(e) => handleAdditionalFollowUpDateChange(e, index)}
          />
          <input
            type="text"
            name="conversation"
            placeholder="Conversation"
            value={item.conversation}
            onChange={(e) => handleAdditionalFollowUpDateChange(e, index)}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => removeAdditionalFollowUpDate(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
    <button
      type="button"
      className="add-new-button"
      onClick={addAdditionalFollowUpDateInput}
    >
      Add New
    </button>
  </td>
</tr>

                <tr>
                  <td>Comments:</td>
                  <td>
                    <input
                      type="text"
                      name="comments"
                      placeholder="Description"
                      value={formData.comments}
                     
                      onChange={handleChange}
                    />
                  </td>
                </tr>
            <tr>
              <td>Product Type:</td>
              <td>
                <input
                  type="text"
                  name="productType"
                  placeholder="Product Type"
                  value={formData.productType}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Base Price:</td>
              <td>
                <input
                  type="text"
                  name="basePrice"
                  placeholder="Base Price"
                  value={formData.basePrice}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Sale Price:</td>
              <td>
                <input
                  type="text"
                  name="salePrice"
                  placeholder="Sale Price"
                  value={formData.salePrice}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Sale Initiated Date:</td>
              <td>
                <input
                  type="date"
                  name="saleInitiatedDate"
                  placeholder="Sale Initiated Date"
                  value={formData.saleInitiatedDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Pay Frequency:</td>
              <td>
                <select
                  name="payFrequency"
                  value={formData.payFrequency}
                  onChange={handleChange}
                >
                  {payFrequency.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
              
            
              <td>Effective Date:</td>
              
                <input
                  type="date"
                  name="effectiveDate"
                  placeholder="Effective Date"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                />
              
            </td>
            </tr>
            <tr>
              <td>Expected Sale Date:</td>
              <td>
                <input
                  type="date"
                  name="expectedSaleDate"
                  placeholder="Expected Sale Date"
                  value={formData.expectedSaleDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Advance Token Amount:</td>
              <td>
                <input
                  type="text"
                  name="advanceTokenAmount"
                  placeholder="Advance Token Amount"
                  value={formData.advanceTokenAmount}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Next Payment Date:</td>
              <td>
                <input
                  type="date"
                  name="nextPaymentDate"
                  placeholder="Next Payment Date"
                  value={formData.nextPaymentDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
  <td>Notify to Customer:</td>
  <td>
    <select
      name="notifyToCustomer"
      value={formData.notifyToCustomer}
      onChange={handleChange}
    >
      <option value="">Select Notification</option>
      <option value="5_days_before">5 days before</option>
      <option value="10_days_before">10 days before</option>
      <option value="15_days_before">15 days before</option>
    </select>
  </td>
</tr>
<tr>
  <td>Notify to Admin:</td>
  <td>
    <select
      name="notifyToAdmin"
      value={formData.notifyToAdmin}
      onChange={handleChange}
    >
      <option value="">Select Notification</option>
      <option value="5_days_before">5 days before</option>
      <option value="10_days_before">10 days before</option>
      <option value="15_days_before">15 days before</option>
    </select>
  </td>
</tr>

            <tr>
              <td>Total Sale Amount:</td>
              <td>
                <input
                  type="text"
                  name="totalSaleAmount"
                  value={formData.totalSaleAmount}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Total Amount Received:</td>
              <td>
                <input
                  type="text"
                  name="totalAmountReceived"
                  value={formData.totalAmountReceived}
                  onChange={handleChange}
                />
              </td>
            </tr>
           
            <tr>
                <td>Registration Amount</td>
                <td>
              <td>Amount:</td>
              
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              
              <td>GST %:</td>
              
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                />
              
              <td>Stamp Duty %:</td>
              
                <input
                  type="text"
                  name="stampDuty"
                  value={formData.stampDuty}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Expected Registration Date:</td>
              <td>
                <input
                  type="date"
                  name="expectedRegistrationDate"
                  value={formData.expectedRegistrationDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" style={{width:'40%', marginLeft:'60px'}}>{'Save'}</button>
        <button type="submit" onClick={handleProceedToRegistration} style={{width:'40%', marginRight:'20px'}}>Proceed To Registration</button>
      </form>
      <div>
        <h4>Sold List</h4>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {solds.map((sold, index) => (
              <tr key={index}>
                <td onClick={() => handleSoldClick(index)}>{sold.customerName}</td>
                <td>
                  {!isEditing && (
                    <>
                      <button onClick={() => handleEdit(index)}>
                        <i className="fa fa-pencil-square-o"></i>
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <i className="fa fa-trash"></i>
                      </button>
                      
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Sold Item Details */}
      {selectedSold && (
        <div>
          <h4>Selected Sold Item Details</h4>
          <table>
            <tbody>
            <tr>
                <td>Customer Name:</td>
                <td>{selectedSold.customerName}</td>
              </tr>
              <tr>
                    <td>Mobile Number:</td>
                    <td>{selectedSold.customerPhone}</td>
                  </tr>
                  <tr>
                    <td>Email ID:</td>
                    <td>{selectedSold.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{`${selectedSold.customerAddress.area}, ${selectedSold.customerAddress.city}, ${selectedSold.customerAddress.state}`}</td>
                  </tr>
                  <tr>
                    <td>Project Name:</td>
                    <td>{selectedSold.projectName}</td>
                  </tr>
                  <tr>
                    <td>Referred By:</td>
                    <td>{selectedSold.referredBy}</td>
                  </tr>
                  <tr>
                    <td>Interested In:</td>
                    <td>{`${selectedSold.productCategory} - ${selectedSold.subCategory}`}</td>
                  </tr>
                  <tr>
                    <td>Budget Range:</td>
                    <td>{selectedSold.budgetRange}</td>
                  </tr>
                  <tr>
                    <td>Visit Date:</td>
                    <td>{selectedSold.visitDate}</td>
                  </tr>
                  <tr>
                    <td>Follow Up Date:</td>
                    <td>{`${selectedSold.followUpDate},${selectedSold.conversation}`}</td>
                  </tr>
                  {selectedSold.additionalFollowUpDates && selectedSold.additionalFollowUpDates.map((item, index) => (
                    <tr key={index}>
                      <td>Additional Follow Up Date {index + 1}:</td>
                      <td>{`${item.followUpDate}, ${item.conversation}`}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Comments:</td>
                    <td>{selectedSold.comments}</td>
                  </tr>
                              <tr>
                                <td>Product Type:</td>
                                <td>{selectedSold.productType}</td>
                              </tr>
                              <tr>
                                <td>Product Name:</td>
                                <td>{selectedSold.productName}</td>
                              </tr>
                              <tr>
                                <td>Base Price:</td>
                                <td>{selectedSold.basePrice}</td>
                              </tr>
                              <tr>
                                <td>Sale Price:</td>
                                <td>{selectedSold.salePrice}</td>
                              </tr>
                              <tr>
                                <td>Sale Initiated Date:</td>
                                <td>{selectedSold.saleInitiatedDate}</td>
                              </tr>
                              <tr>
                                <td>Duration:</td>
                                <td>{selectedSold.duration}</td>
                              </tr>
                              <tr>
                                <td>Pay Frequency:</td>
                                <td>{selectedSold.payFrequency}</td>
                              </tr>
                              <tr>
                                <td>Effective Date:</td>
                                <td>{selectedSold.effectiveDate}</td>
                              </tr>
                              <tr>
                                <td>Expected Sale Date:</td>
                                <td>{selectedSold.expectedSaleDate}</td>
                              </tr>
                              <tr>
                                <td>Advance/Token Amount:</td>
                                <td>{selectedSold.advanceTokenAmount}</td>
                              </tr>
                              <tr>
                                <td>Date:</td>
                                <td>{selectedSold.date}</td>
                              </tr>
                              <tr>
                                <td>Next Payment Date:</td>
                                <td>{selectedSold.nextPaymentDate}</td>
                              </tr>
                              <tr>
                                <td>Notify To Customer:</td>
                                <td>{selectedSold.notifyToCustomer}</td>
                              </tr>
                              <tr>
                                <td>Notify To Admin:</td>
                                <td>{selectedSold.notifyToAdmin}</td>
                              </tr>
              <tr>
                <td>Total Sale Amount:</td>
                <td>{selectedSold.totalSaleAmount}</td>
              </tr>
              <tr>
                <td>Total Amount Received:</td>
                <td>{selectedSold.totalAmountReceived}</td>
              </tr>
              <tr>
                <td>Registration Amount:</td>
                <td>{selectedSold.registrationAmount}</td>
              </tr>
              <tr>
                <td>Registration Amount:</td>
                <td>{selectedSold.amount}</td>
              </tr>
              <tr>
                <td>GST %:</td>
                <td>{selectedSold.gst}</td>
              </tr>
              <tr>
                <td>Stamp Duty %:</td>
                <td>{selectedSold.stampDuty}</td>
              </tr>
              <tr>
                <td>Expected Registration Date:</td>
                <td>{selectedSold.expectedRegistrationDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Sold;
