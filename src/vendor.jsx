import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Vendor = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    employeeName: '',
    projectName: '',
    payRate: '',
    effectiveDatePay: '',
    pricePay: '',
    companyName: '',
    address: {
      houseNumber: '',
      pincode: '',
      area: '',
      city: '',
      state: '',
      country: '',
    },
    einGst: '',
    pointOfContact: {
      name: '',
      email: '',
      phone: '',
    },
    AttachMSA: '',
    AttachSOW: '',
    AttachW9Form: '',
    AttachCOI: '',
    Attach: {
      AchForm: '',
      VoidCheck: '',
    },
    additionalAttachment: {
      AttachMSA_additional: [],
      AttachSOW_additional: [],
      AttachW9Form_additional: [],
      AttachCOI_additional: [],
      AttachAchForm_additional: [],
      AttachVoidCheck_additional: [],
    },
  });

  const [employees, setEmployees] = useState([]);
 
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const payRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth'];
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  const removeAdditionalAttachment = (index, fieldName) => {
    setFormData((prevData) => {
      const updatedAdditionalAttachments = prevData.additionalAttachment[fieldName].filter((_, i) => i !== index);
      return {
        ...prevData,
        additionalAttachment: {
          ...prevData.additionalAttachment,
          [fieldName]: updatedAdditionalAttachments,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setEmployees(
        employees.map((employee, index) =>
          index === editIndex ? formData : employee
        )
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      employeeName: '',
      projectName: '',
      payRate: '',
      effectiveDatePay: '',
      pricePay: '',
      companyName: '',
      address: {
        houseNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
        country: '',
      },
      einGst: '',
      pointOfContact: {
        name: '',
        email: '',
        phone: '',
      },
      AttachMSA: '',
      AttachSOW: '',
      AttachW9Form: '',
      AttachCOI: '',
      Attach: {
        AchForm: '',
        VoidCheck: '',
      },
      additionalAttachment: {
        AttachMSA_additional: [],
        AttachSOW_additional: [],
        AttachW9Form_additional: [],
        AttachCOI_additional: [],
        AttachAchForm_additional: [],
        AttachVoidCheck_additional: [],
      },
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
    setFormData(employees[index]);
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
    if (selectedEmployee === employees[index]) {
      setSelectedEmployee(null);
    }
  };

  const handleAdditionalAttachmentChange = (e) => {
    const { name, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      additionalAttachment: {
        ...prevData.additionalAttachment,
        [name]: [...prevData.additionalAttachment[name], ...files],
      },
    }));
  };

  const addAdditionalAttachmentInput = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      additionalAttachment: {
        ...prevData.additionalAttachment,
        [name]: [...prevData.additionalAttachment[name], ''],
      },
    }));
  };

  const handleEmployeeClick = (index) => {
    if (selectedEmployee && selectedEmployee === employees[index]) {
      setSelectedEmployee(null);
      setIsEditing(false);
      resetFormData();
    } else {
      setSelectedEmployee(employees[index]);
      setIsEditing(false);
      setFormData(employees[index]);
    }
  };
  const removeAttachment = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: '', // Reset the value of the main attachment field
      additionalAttachment: {
        ...prevData.additionalAttachment,
        [fieldName + '_additional']: [], // Reset the additional attachments array
      },
    }));
  };
 
  
  

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const duplicateEmployee = () => {
    setEmployees([...employees, formData]);
    resetFormData();
  };

  const handleAddToActiveVendor = () => {
    navigate('/active-vendors', { state: { employee: formData, employees:[...employees, formData]  } });
    
  };
  const handleAddToInActiveVendor = () => {
    navigate('/inactive-vendors', { state: { employee: formData, employees:[...employees, formData]  } });
    
  };
  const handleAddMore=()=> {
    navigate('/employee-details');
  }
  const handleEmployeeSelectChange = (e) => {
    if (e.target.value === 'add-new') {
      handleAddMore();
    }
  };
  const handleAddNew=()=>{
    navigate('/client-details');
  }
  const handleClientSelectChange = (e) => {
    if (e.target.value === 'add-new') {
      handleAddNew();
    }
  };
  const handleAddNewProject=()=>{
    navigate('/project-details');
  }
  const handleProjectSelectChange = (e) => {
    if (e.target.value === 'add-new') {
      handleAddNewProject();
    }
  };
  
  


 

  return (
    <div className="vendor-container">
      <h2 style={{ color: '#060f41' }}>Vendor Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <tr>
            <td>
            <label htmlFor="employeeSelect">Select Employee:</label>
          <select id="employeeSelect" name="employee" onChange={handleEmployeeSelectChange}>
            <option value="">Select</option>
            <option value="name">1</option>
    <option value="name">2</option>
    <option value="name">3</option>
    <option value="name">3</option>
            {employees.map((employee, index) => (
              <option key={index} value={index}>{employee.employeeName}</option>
            ))}
            <option value="add-new">Add New</option>
  </select>
 
</td>
</tr>
<tr>
  <td>
<label htmlFor="projectName">Select Client:</label>
  <form action="/action_page.php">

  <select id="name" name="name" placeholder="Select From this list" onChange={handleClientSelectChange}>
  <option value="name">Select</option>
    <option value="name">1</option>
    <option value="name">2</option>
    <option value="name">3</option>
    <option value="name">3</option>
    {employees.map((employee, index) => (
              <option key={index} value={index}>{employee.employeeName}</option>
            ))}
            <option value="add-new">Add New</option>
  </select>
  
</form>
</td>
</tr>
<tr>
  <td>
<label htmlFor="projectName">Select Project:</label>
  <form action="/action_page.php">

  <select id="name" name="name" placeholder="Select From this list" onChange={handleProjectSelectChange}>
    <option value="name">Select</option>
    <option value="name">1</option>
    <option value="name">2</option>
    <option value="name">3</option>
    {employees.map((employee, index) => (
              <option key={index} value={index}>{employee.employeeName}</option>
            ))}
            <option value="add-new">Add New</option>
  </select>
  
</form>
</td>
</tr>
       

        <div >
          <tr>
            <td>
          <label htmlFor="payRate">Pay Type:</label>
          <select
            id="payRate"
            name="payRate"
            value={formData.payRate}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {payRates.map((rate, index) => (
              <option key={index} value={rate}>
                {rate}
              </option>
            ))}
          </select>
          </td>
        </tr>
        </div>
       

        {formData.payRate && (
  <div className="form-row">
     <tr>
          <td>
    <label htmlFor="effectiveDatePay">Effective Date:</label>
    <input
      type="date"
      id="effectiveDatePay"
      name="effectiveDatePay"
      value={formData.effectiveDatePay}
      onChange={handleChange}
      style={{ width: '200px', padding: '8px' }} // Added inline styles
    />
    </td>
    </tr>
  </div>
)}

        {formData.payRate && (
          <div className="form-row">
             <tr>
          <td>
            <label htmlFor="pricePay">Pay Rate:</label>
            <input
              type="number"
              id="pricePay"
              name="pricePay"
              value={formData.pricePay}
              onChange={handleChange}
            />
            </td>
        </tr>
          </div>
          
        )}
        
        
        

        <tr>
          <td>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          
          </td>
          </tr>
        

        <tr>
          <td>
          <label>Address:</label>
          <div>
            <input
              type="text"
              id="houseNumber"
              name="address.houseNumber"
              placeholder="House Number/Flat Number"
              value={formData.address.houseNumber}
              onChange={handleChange}
            />
            
          </div>
          
          <div>
            <input
              type="text"
              id="pincode"
              name="address.pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="area"
              name="address.area"
              placeholder="Area/Street"
              value={formData.address.area}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="city"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="state"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="country"
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
            />
          </div>
          </td>
          </tr>
        

        <tr>
          <td>
          <label htmlFor="einGst">EIN/GST:</label>
          <input
            type="text"
            id="einGst"
            name="einGst"
            value={formData.einGst}
            onChange={handleChange}
          />
          </td>
          </tr>
        

        <tr>
          <td>
          <label htmlFor="pointOfContact">Point Of Contact:</label>
          <tr>
          <td>
          <input
            type="text"
            id="pocName"
            name="pointOfContact.name"
            placeholder="Name"
            value={formData.pointOfContact.name}
            onChange={handleChange}
          />
          </td>
          </tr>
          <tr>
            <td>
          <input
            type="email"
            id="pocEmail"
            name="pointOfContact.email"
            placeholder="Email"
            value={formData.pointOfContact.email}
            onChange={handleChange}
          />
          </td>
          </tr>
          <tr>
            <td>
          <input
            type="tel"
            id="pocPhone"
            name="pointOfContact.phone"
            placeholder="Phone"
            value={formData.pointOfContact.phone}
            onChange={handleChange}
          />
          </td>
          </tr>
          </td>
          </tr>
           
       

       <label htmlFor="AttachMSA">Attach MSA:</label>
       <div className="additional-input">
  <input
    type="file"
    id="AttachMSA"
    name="AttachMSA"
    value={formData.AttachMSA}
    onChange={handleChange}
  />
  {formData.AttachMSA && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachMSA')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
</div>
{/* Additional input for multiple attachments */}
{formData.additionalAttachment.AttachMSA_additional.map(
  (attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachMSA_additional_${index}`}
        name="AttachMSA_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      <h9
        type="button" 
        onClick={() => removeAdditionalAttachment(index, 'AttachMSA_additional')}
        className="rmz" style={{marginLeft:'190px', marginTop:'-40px'}} // Added class for styling
      >
        &#10006;
      </h9>
    </div>
  )
)}
<button
  type="button"
  onClick={() => addAdditionalAttachmentInput('AttachMSA_additional')}
  
>
  Add More
</button>



  
<div>
  <label htmlFor="AttachSOW">Attach SOW:</label>
  <input
    type="file"
    id="AttachSOW"
    name="AttachSOW"
    value={formData.AttachSOW}
    onChange={handleChange}
  />
  {formData.AttachSOW && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachSOW')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
  {/* Additional input for multiple attachments */}
  {formData.additionalAttachment.AttachSOW_additional.map((attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachSOW_additional_${index}`}
        name="AttachSOW_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      
      <h9
        type="button"
        onClick={() => removeAdditionalAttachment(index, 'AttachSOW_additional')}
        className="rmz" style={{marginLeft:'190px', marginTop:'-40px'}}// Added class for styling
      >
        &#10006;
      </h9>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addAdditionalAttachmentInput('AttachSOW_additional')}
  >
    Add More
  </button>
</div>

<div>
  <label htmlFor="AttachW9Form">Attach W9 Form:</label>
  <input
    type="file"
    id="AttachW9Form"
    name="AttachW9Form"
    value={formData.AttachW9Form}
    onChange={handleChange}
  />
  {formData.AttachW9Form && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachW9Form')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
  {/* Additional input for multiple attachments */}
  {formData.additionalAttachment.AttachW9Form_additional.map((attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachW9Form_additional_${index}`}
        name="AttachW9Form_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      <h9
        type="button"
        onClick={() => removeAdditionalAttachment(index, 'AttachW9Form_additional')}
        className="rmz" style={{marginLeft:'190px', marginTop:'-40px'}} // Added class for styling
      >
        &#10006;
      </h9>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addAdditionalAttachmentInput('AttachW9Form_additional')}
  >
    Add More
  </button>
</div>

<div>
  <label htmlFor="AttachCOI">Attach COI:</label>
  <input
    type="file"
    id="AttachCOI"
    name="AttachCOI"
    value={formData.AttachCOI}
    onChange={handleChange}
  />
  {formData.AttachCOI && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachCOI')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
  {/* Additional input for multiple attachments */}
  {formData.additionalAttachment.AttachCOI_additional.map((attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachCOI_additional_${index}`}
        name="AttachCOI_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      <h9
        type="button"
        onClick={() => removeAdditionalAttachment(index, 'AttachCOI_additional')}
        c className="rmz" style={{marginLeft:'190px', marginTop:'-40px'}} // Added class for styling
      >
        &#10006;
      </h9>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addAdditionalAttachmentInput('AttachCOI_additional')}
  >
    Add More
  </button>
</div>

<div>
  <label htmlFor="AttachAchForm">Attach ACH Form:</label>
  <input
    type="file"
    id="AttachAchForm"
    name="AttachAchForm"
    value={formData.AttachAchForm}
    onChange={handleChange}
  />
  {formData.AttachAchForm && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachAchForm')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
  {/* Additional input for multiple attachments */}
  {formData.additionalAttachment['AttachAchForm_additional'].map((attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachAchForm_additional_${index}`}
        name="AttachAchForm_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      <h9
        type="button"
        onClick={() => removeAdditionalAttachment(index, 'AttachAchForm_additional')}
        className="rmz" style={{marginLeft:'190px', marginTop:'-40px'}}// Added class for styling
      >
        &#10006;
      </h9>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addAdditionalAttachmentInput('AttachAchForm_additional')}
  >
    Add More
  </button>
</div>


<div>
  <label htmlFor="AttachVoidCheck">Attach Void Check:</label>
  <input
    type="file"
    id="AttachVoidCheck"
    name="AttachVoidCheck"
    value={formData.AttachVoidCheck}
    onChange={handleChange}
  />
  {formData.AttachVoidCheck && ( // Render remove button only if main attachment is present
    <h9
      type="button" 
      onClick={() => removeAttachment('AttachVoidCheck')} // Call removeAttachment function
      className="rmz" 
      style={{marginLeft:'190px', marginTop:'-40px'}} // Adjust the margin
    >
      &#10006;
    </h9>
  )}
  {/* Additional input for multiple attachments */}
  {formData.additionalAttachment['AttachVoidCheck_additional'] && formData.additionalAttachment['AttachVoidCheck_additional'].map((attachment, index) => (
    <div key={index} className="additional-input">
      <input
        type="file"
        id={`AttachVoidCheck_additional_${index}`}
        name="AttachVoidCheck_additional"
        onChange={handleAdditionalAttachmentChange}
      />
      <h9
        type="button"
        onClick={() => removeAdditionalAttachment(index, 'AttachVoidCheck_additional')}
        className="rmz"
        style={{ marginLeft: '190px', marginTop: '-40px' }} // Added class for styling
      >
        &#10006;
      </h9>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addAdditionalAttachmentInput('AttachVoidCheck_additional')}
  >
    Add More
  </button>
</div>


  

          </div>
        

        { /*<button type="submit">{isEditing ? 'Save' : 'Submit'}</button>*/}
        <button onClick={handleAddToActiveVendor}>Add To Active List</button>
        { /*<button onClick={handleAddToInActiveVendor}>Add to Inactive List</button>*/}
      
        
      </form>

      {selectedEmployee && showDetails && (
        <div className="employee-details">
          <h2>Selected Employee Details</h2>
          <ul>
            <li>Employee Name: {selectedEmployee.employeeName}</li>
            <li>Project Name: {selectedEmployee.projectName}</li>
            {/* Include other details here */}
          </ul>
        </div>
      )}
      {/*<div>
      
        <h3>Employees List</h3>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td onClick={() => handleEmployeeClick(index)}>
                  {employee.employeeName}
                </td>
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
                  </div>*/}
      {selectedEmployee && (
        <div>
          <h4>Selected Employee</h4>
          <form>
            <table>
              <tbody>
                <tr>
                  <td>Employee Name:</td>
                  <td>{selectedEmployee.employeeName}</td>
                </tr>
                <tr>
                  <td>Project Name:</td>
                  <td>{selectedEmployee.projectName}</td>
                </tr>
                <tr>
  <td>Pay Rate:</td>
  <td>
    {`${selectedEmployee.payRate}, ${selectedEmployee.effectiveDatePay}, ${selectedEmployee.pricePay}`}
  </td>
</tr>
<tr>
  <td>Address:</td>
  <td>
    {`${selectedEmployee.address.houseNumber}, ${selectedEmployee.address.area}, ${selectedEmployee.address.city}, ${selectedEmployee.address.state}, ${selectedEmployee.address.country}`}
  </td>
</tr>
<tr>
<td>EIN/GST:</td>
                  <td>{selectedEmployee.einGst}</td>
                </tr>
<tr>
  <td>Point of Contact:</td>
  <td>
    {`${selectedEmployee.pointOfContact.name}, ${selectedEmployee.pointOfContact.email}, ${selectedEmployee.pointOfContact.phone}`}
  </td>
</tr>
<tr>
  <td>Attach MSA:</td>
  <td>
    {selectedEmployee.AttachMSA}
  </td>
</tr>
<tr>
  <td>Attach COI:</td>
  <td>
    {selectedEmployee.AttachCOI}
  </td>
</tr>
<tr>
  <td>Attach SOW:</td>
  <td>
    {selectedEmployee.AttachSOW}
  </td>
</tr>
<tr>
  <td>Attach W9 Form:</td>
  <td>
    {selectedEmployee.AttachW9Form}
  </td>
</tr>
<tr>
  <td>Attach ACH Form:</td>
  <td>
    {selectedEmployee.AttachachForm}
  </td>

</tr>
<tr>
  <td>Attach Void Check:</td>
  <td>
    {selectedEmployee.AttachVoidCheck }
  </td>
  
</tr>

              </tbody>
            </table>
          </form>
          
        </div>
      )}
    </div>
  );
};

export default Vendor;
