
import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Prospects = () => {
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
      comments: ''
    });
     // Assuming you have subcategories state
    const navigate = useNavigate();
    const [prospects, setProspects] = useState([]); // Define prospects state
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showInputDetails, setShowInputDetails] = useState(false);

  const handleAddNewClick = () => {
    setShowInputDetails(prevState => !prevState);
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
    setFormData(prospects[index]);
  };

  const handleDelete = (index) => {
    setProspects(prospects.filter((_, i) => i !== index));
    if (selectedProspect && index === prospects.indexOf(selectedProspect)) {
      setSelectedProspect(null);
    }
  };

  const handleProspectClick = (index) => {
    setSelectedProspect(selectedProspect === prospects[index] ? null : prospects[index]);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing prospect
      const updatedProspects = [...prospects];
      updatedProspects[editIndex] = formData;
      setProspects(updatedProspects);
      setIsEditing(false);
      setEditIndex(null);
      setSelectedProspect(formData); // Update selected prospect
    } else {
      // Add new prospect
      setProspects([...prospects, formData]);
      setSelectedProspect(formData); // Update selected prospect
      setShowInputDetails(false);
    }
    // Clear form fields after submission
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
      comments: ''
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
  
  const handleAddToInProcess = () => {
    // Save prospect details
    if (isEditing) {
        // Update existing prospect
        const updatedProspects = [...prospects];
        updatedProspects[editIndex] = formData;
        setProspects(updatedProspects);
        setIsEditing(false);
        setEditIndex(null);
        setSelectedProspect(formData); // Update selected prospect
    } else {
        // Add new prospect
        setProspects([...prospects, formData]);
        setSelectedProspect(formData); // Update selected prospect
        setShowInputDetails(false);
    }
    
  
    // Navigate to in-process page
    navigate('/in-process', { state: { prospects: [...prospects, formData] } });
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
  

  return (
    <div>
     
    <div style={{width:'95%'}}>
      <h4 style={{color:'black'}}>Prospects/Enquiry List</h4>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((prospect, index) => (
            <tr key={index}>
              <td onClick={() => handleProspectClick(index)}>{prospect.customerName}</td>
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
    {selectedProspect && (
      <div style={{width:'95%'}}>
        <h4>Selected Prospect Details</h4>
        <table>
          <tbody>
            <tr>
              <td>Customer Name:</td>
              <td>{selectedProspect.customerName}</td>
            </tr>
            <tr>
              <td>Mobile Number:</td>
              <td>{selectedProspect.customerPhone}</td>
            </tr>
            <tr>
              <td>Email ID:</td>
              <td>{selectedProspect.customerEmail}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{selectedProspect.customerAddress.area}, {selectedProspect.customerAddress.city}, {selectedProspect.customerAddress.state}</td>
            </tr>
            <tr>
              <td>Project Name:</td>
              <td>{selectedProspect.projectName}</td>
            </tr>
            <tr>
              <td>Referred By:</td>
              <td>{selectedProspect.referredBy}</td>
            </tr>
            <tr>
              <td>Interested In:</td>
              <td>{selectedProspect.productCategory} - {selectedProspect.subCategory}</td>
            </tr>
            <tr>
              <td>Budget Range:</td>
              <td>{selectedProspect.budgetRange}</td>
            </tr>
            <tr>
              <td>Visit Date:</td>
              <td>{selectedProspect.visitDate}</td>
            </tr>
            <tr>
              <td>Follow Up Date:</td>
              <td>{`${selectedProspect.followUpDate},${selectedProspect.conversation}`}</td>
            </tr>
            
              {selectedProspect.additionalFollowUpDates && selectedProspect.additionalFollowUpDates.map((item, index) => (
                <tr key={index}>
                  <td>Additional Follow Up Date {index + 1}:</td>
                  <td>{`${item.followUpDate}, ${item.conversation}`}</td>
                  
                </tr>
                
              ))}
            <tr>
              <td>Comments:</td>
              <td>{selectedProspect.comments}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
    
    <div className="forms-container" style={{width:'90%', marginLeft:'25px'}}>
        <div className="form-section">
      
          <h4> Fill The Prospect/Enquiry Details Form</h4>
          <button onClick={handleAddNewClick} style={{width:'30%'}}>Add New</button> {/* Button to toggle display of input details */}
          {showInputDetails && (
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
                        style={{ width: '40px', marginLeft: '10px' }}
                        onClick={() => removeAdditionalFollowUpDate(index)}
                      >
                        &#10006;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{ width: '80px', marginLeft: '10px' }}
                    onClick={addAdditionalFollowUpDateInput}
                  >
                    Add More
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
                
              </tbody>
            </table>
            <button type="submit" style={{width:'40%', marginLeft:'60px'}}>{isEditing ? 'Update' : 'Save'}</button>
            <button type="button" onClick={handleAddToInProcess} style={{width:'40%', marginRight:'20px'}}>Add To In-Process</button>
          </form>
        )}
        
      </div>
      </div>
    </div>
  );
};

export default Prospects;
