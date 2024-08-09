import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AdditionalDetails = () => {
  const location = useLocation();
  const { state } = location;
  const { firstName, lastName, phone, email } = state;
  const payRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth'];

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    skillSet: '',
    communicationAddress: {
      houseNumber: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
    highestEducation: '',
    ssnPan: '',
    dateOfBirth: new Date(),
    attachResume:'',
    passportAadharNumber: '',
    passportExpireDate: new Date(),
    hireDate: new Date(),
    totalExperience: '',
    employementType: '',
    eVerifyDocument: '',
    i94Document: '',
    i9Document: '',
    w4Document: '',
    drivingLicense: '',
    voidCheck: '',
    eadCopy: '',
    previousExperience: '',
    billingRate: '',
    price: '',
    effectiveDate: new Date(),
    payRate: '',
    pricePay: '',
    effectiveDatePay: new Date(),
    attachments: {
      attacheResume: null,
      passportAadharNumber: null,
      previousExperience: null,
      eVerifyDocument: null,
      i94Document: null,
      i9Document: null,
      w4Document: null,
      drivingLicense: null,
      voidCheck: null,
      eadCopy: null,
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const employmentTypes = ['W2FullTime_Billable', 'W2FullTime_Non-Billable', 'W2PartTime_Billable', 'W2PartTime_Non-Billable', '1099', 'Contract'];
  const billingRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth'];

  const handleBack = () => {
    navigate('/employee-details');
  };


  useEffect(() => {
    if (state) {
      setEmployee(prevState => ({
        ...prevState,
        firstName: state.firstName || '',
        lastName: state.lastName || '',
        phone: state.phone || '',
        email: state.email || ''
      }));
    }
  }, [state]);

  const handleChange = (e, field, subField) => {
    const { value } = e.target;
    if (field === 'communicationAddress') {
      setEmployee(prevState => ({
        ...prevState,
        communicationAddress: {
          ...prevState.communicationAddress,
          [subField]: value
        }
      }));
    } else {
      setEmployee(prevState => ({
        ...prevState,
        [field]: value
      }));
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setEmployee((prevState) => ({
      ...prevState,
      attachments: {
        ...prevState.attachments,
        [key]: fileURL
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees((prevState) =>
        prevState.map((emp, index) =>
          index === selectedEmployee.index ? employee : emp
        )
      );
      setIsEditing(false);
    } else {
      setEmployees((prevState) => [...prevState, employee]);
    }
    setEmployee({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
      skillSet: '',
      communicationAddress: {
        houseNumber: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      },
      highestEducation: '',
      ssnPan: '',
      dateOfBirth: new Date(),
      passportAadharNumber: '',
      passportExpireDate: new Date(),
      hireDate: new Date(),
      totalExperience: '',
      employementType: '',
      attachResume:'',
      eVerifyDocument: '',
      i94Document: '',
      i9Document: '',
      w4Document: '',
      drivingLicense: '',
      voidCheck: '',
      eadCopy: '',
      previousExperience: '',
      billingRate: '',
      price: '',
      effectiveDate: new Date(),
      payRate: '',
      pricePay: '',
      effectiveDatePay: new Date(),
      attachments: {
        attacheResume: null,
        passportAadharNumber: null,
        previousExperience: null,
        eVerifyDocument: null,
        i94Document: null,
        i9Document: null,
        w4Document: null,
        drivingLicense: null,
        voidCheck: null,
        eadCopy: null,
      }
    });
  };

  const handleEdit = (index) => {
    setSelectedEmployee(employees[index]);
    setEmployee(employees[index]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setEmployees((prevState) => prevState.filter((_, idx) => idx !== index));
    setSelectedEmployee(null);
  };

  


  const handleAssignProject = () => {
    // Navigate to ClientDetails.jsx file
    navigate('/client-details');
  };

  const handleAddToBench = () => {
    navigate('/on-bench-employees', { state: { employees: [...employees] } });
  };

  const handleEmployeeClick = (index) => {
    setSelectedEmployee(selectedEmployee === employees[index] ? null : employees[index]);
  };

  const handleAddToActiveList = () => {
    navigate('/active-employees', { state: { employees: [...employees] } });
  };

  const handleAddToTerminateList = () => {
    navigate('/terminated-employees', { state: { ...employees, employees: [...employees, employee] } });
  };
  
  
  

  return (
    <div className="AdditionalDetails-container" style={{width:'70%'}}>
      <h4>Additional Employee Details</h4>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Role/Designation:</td>
              <td>
                <input
                  type="text"
                  value={employee.role}
                  onChange={(e) => handleChange(e, 'role')}
                />
              </td>
            </tr>
            <tr>
              <td>Skill Set:</td>
              <td>
                <textarea
                  value={employee.skillSet}
                  onChange={(e) => handleChange(e, 'skillSet')}
                />
              </td>
            </tr>
            <tr>
              <td>Communication Address:</td>
              <td>
                <input
                  type="text"
                  placeholder="House Number/Flat Number"
                  value={employee.communicationAddress.houseNumber}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'houseNumber')}
                />
                
                <br />
                <input
                  type="text"
                  placeholder="Area/Street"
                  value={employee.communicationAddress.area}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'area')}
                />
                <br />
                <input
                  type="text"
                  placeholder="City"
                  value={employee.communicationAddress.city}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'city')}
                />
                <br />
                <input
                  type="text"
                  placeholder="State"
                  value={employee.communicationAddress.state}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'state')}
                />
                <br />
                <input
                  type="text"
                  placeholder="ZipCode"
                  value={employee.communicationAddress.pincode}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'pincode')}
                />
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  value={employee.communicationAddress.country}
                  onChange={(e) => handleChange(e, 'communicationAddress', 'country')}
                />
              </td>
            </tr>
            <tr>
              <td>Highest Education:</td>
              <td>
                <input
                  type="text"
                  value={employee.highestEducation}
                  onChange={(e) => handleChange(e, 'highestEducation')}
                />
                <br />
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'highestEducation')}
                />
              </td>
            </tr>
            <tr>
              <td>SSN/PAN:</td>
              <td>
                <input
                  type="text"
                  value={employee.ssnPan}
                  onChange={(e) => handleChange(e, 'ssnPan')}
                />
              </td>
            </tr>
            <tr>
              <td>Date Of Birth:</td>
              <td>
                <DatePicker
                  selected={employee.dateOfBirth}
                  onChange={(date) => setEmployee({ ...employee, dateOfBirth: date })}
                />
              </td>
            </tr>
            <tr>
              <td>Passport/Aadhar Number:</td>
              <td>
                <input
                  type="text"
                  value={employee.passportAadharNumber}
                  onChange={(e) => handleChange(e, 'passportAadharNumber')}
                />
                 <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'passportAadharNumber')}
                />
              </td>
            </tr>
            <tr>
              <td>Passport Expire Date:</td>
              <td>
                <DatePicker
                  selected={employee.passportExpireDate}
                  onChange={(date) => setEmployee({ ...employee, passportExpireDate: date })}
                />
              </td>
            </tr>
            <tr>
              <td>Employment Type:</td>
              <td>
                <select
                  value={employee.employementType}
                  onChange={(e) => handleChange(e, 'employementType')}
                >
                  <option value="">Select</option>
                  {employmentTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Tentative Start Date:</td>
              <td>
                <DatePicker
                  selected={employee.hireDate}
                  onChange={(date) => setEmployee({ ...employee, hireDate: date })}
                />
              </td>
            </tr>
            <tr>
              <td>Total Experience:</td>
              <td>
                <input
                  type="text"
                  value={employee.totalExperience}
                  onChange={(e) => handleChange(e, 'totalExperience')}
                />
              </td>
            </tr>
            <tr>
              <td>Attach Resume:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'attachResume')}
                />
              </td>
            </tr>
            <tr>
              <td>Attach Experience:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'previousExperience')}
                />
              </td>
            </tr>
            <tr>
              <td>E-Verify Document:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'eVerifyDocument')}
                />
              </td>
            </tr>
            <tr>
              <td>I94 Document:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'i94Document')}
                />
              </td>
            </tr>
            <tr>
              <td>I9 Document:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'i9Document')}
                />
              </td>
            </tr>
            <tr>
              <td>W4 Document:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'w4Document')}
                />
              </td>
            </tr>
            <tr>
              <td>Driving License:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'drivingLicense')}
                />
              </td>
            </tr>
            <tr>
              <td>Void Check:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'voidCheck')}
                />
              </td>
            </tr>
            <tr>
              <td>EAD Copy:</td>
              <td>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFileChange(e, 'eadCopy')}
                />
              </td>
            </tr>
            {/*<tr>
  <td>Pay Type:</td>
  <td>
    <select
      id="payRate"
      name="payRate"
      value={employee.payRate}
      onChange={(e) => handleChange(e, 'payRate')}
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

{employee.payRate && (
  <>
    <tr>
      <td>Effective Date:</td>
      <td>
        <input
          type="date"
          id="effectiveDatePay"
          name="effectiveDatePay"
          value={employee.effectiveDatePay}
          onChange={(e) => handleChange(e, 'effectiveDatePay')}
          style={{ width: '200px', padding: '8px' }}
        />
      </td>
    </tr>
    <tr>
      <td>Pay Rate:</td>
      <td>
        <input
          type="number"
          id="pricePay"
          name="pricePay"
          value={employee.pricePay}
          onChange={(e) => handleChange(e, 'pricePay')}
        />
      </td>
    </tr>
  </>
)}*/}

            {/*<tr>
              <td>Billing Rate:</td>
              <td>
                <select
                  value={employee.billingRate}
                  onChange={(e) => handleChange(e, 'billingRate')}
                >
                  <option value="">Select</option>
                  {billingRates.map((rate, index) => (
                    <option key={index} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
                {employee.billingRate && (
                  <div>
                    <label htmlFor="effectiveDate">Effective Date:</label>
                    <input
                      type="date"
                      id="effectiveDate"
                      name="effectiveDate"
                      value={employee.effectiveDate}
                      onChange={(e) => setEmployee({ ...employee, effectiveDate: e.target.value })}
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={employee.price}
                      onChange={(e) => setEmployee({ ...employee, price: e.target.value })}
                    />
                  </div>
                )}
              </td>
                </tr>*/}
            
          </tbody>
        </table>
      
          <div style={{display:'flex', flexDirection:'row', gap:'50px'}}>
        <button type="submit" style={{width:'250px', marginLeft:'100px'}}>{isEditing ? 'Update' : 'Submit'}</button>
        <button onClick={() => handleBack()}style={{width:'250px'}} >Back</button>
        </div>
        
      </form>
      <div >
        <h4>Employees List</h4>
       
        <table>
          
          <thead>
          <p>Select the employee name to view the details</p>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) =>(
              <tr key={index}>
                <td onClick={() => handleEmployeeClick(index)}>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>
                  {!isEditing && (
                    <>
                      <button onClick={() => handleEdit(index)}
                      style={{
                        backgroundColor: '#008CBA',
                        border: 'none',
                        color: 'white',
                        padding: '7px 14px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '12px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '16px'
                      }}
                      className="tooltip"><i className="fa fa-pencil-square-o"></i>
                      <span className="tooltip-text">Edit</span>
                      </button>

                      <button onClick={() => handleDelete(index)}
                       style={{
                        backgroundColor: '#008CBA',
                        border: 'none',
                        color: 'white',
                        padding: '7px 14px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '12px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '16px'
                      }}
                      className="tooltip"
                      ><i className="fa fa-trash"></i>
                      <span className="tooltip-text">Delete</span>
                      </button> 

                      <button
  onClick={() => handleAssignProject(index)}
  style={{
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
    padding: '7px 14px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '16px'
  }}
  className="tooltip"
>
  <i className="fas fa-tasks" style={{ marginRight: '8px' }}></i>
  <span className="tooltip-text">Assign Project</span>
</button>

<button
  onClick={() => handleAddToBench()}
  style={{
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
    padding: '7px 14px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '16px'
  }}
  className="tooltip"
>
  <i className="fas fa-list" style={{ marginRight: '8px' }}></i>
  <span className="tooltip-text">Add To Bench</span>
</button>

<button
  onClick={handleAddToActiveList}
  style={{
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
    padding: '7px 14px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '16px'
  }}
  className="tooltip"
>
  <i className="fas fa-list" style={{ marginRight: '8px' }}></i>
  <span className="tooltip-text">Add to Active List</span>
</button>

<button
  onClick={handleAddToTerminateList}
  style={{
    backgroundColor: '#008CBA',
    border: 'none',
    color: 'white',
    padding: '7px 14px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '16px'
  }}
  className="tooltip"
>
  <i className="fas fa-list" style={{ marginRight: '8px' }}></i>
  <span className="tooltip-text">Add to Terminate List</span>
</button>

                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <div>
          <table>
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{selectedEmployee.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{selectedEmployee.lastName}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{selectedEmployee.phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{selectedEmployee.email}</td>
              </tr>
              <tr>
                <td>Role/Designation:</td>
                <td>{selectedEmployee.role}</td>
              </tr>
              <tr>
                <td>Skill Set:</td>
                <td>{selectedEmployee.skillSet}</td>
              </tr>
              <tr>
                <td>Communication Address:</td>
                <td>
                  {`${selectedEmployee.communicationAddress.houseNumber}, ${selectedEmployee.communicationAddress.pincode}, ${selectedEmployee.communicationAddress.area}, ${selectedEmployee.communicationAddress.city}, ${selectedEmployee.communicationAddress.state}, ${selectedEmployee.communicationAddress.country}`}
                </td>
              </tr>
              <tr>
                <td>Highest Education:</td>
                <td>{selectedEmployee.highestEducation}</td>
              </tr>
              <tr>
                <td>Resume:</td>
                <td>{selectedEmployee.resume}</td>
              </tr>
              <tr>
                <td>SSN/PAN:</td>
                <td>{selectedEmployee.ssnPan}</td>
              </tr>
              <tr>
                <td>Date Of Birth:</td>
                <td>{selectedEmployee.dateOfBirth.toDateString()}</td>
              </tr>
              <tr>
                <td>Passport/Aadhar Number:</td>
                <td>{selectedEmployee.passportAadharNumber}</td>
               
                
              </tr>
              <tr>
                <td>Passport Expire Date:</td>
                <td>{selectedEmployee.passportExpireDate.toDateString()}</td>
              </tr>
              <tr>
                <td>Employment Type:</td>
                <td>{selectedEmployee.employementType}</td>
              </tr>
              <tr>
                <td>Tentative Start Date:</td>
                <td>{selectedEmployee.hireDate.toDateString()}</td>
              </tr>
              <tr>
                <td>Total Experience:</td>
                <td>{selectedEmployee.totalExperience}</td>
              </tr>
              <tr>
                <td>Attachments:</td>
                <td>
                {selectedEmployee.attachments.attachResume && (
                    <div>
                      <a href={selectedEmployee.attachments.attachResume} target="_blank" rel="noopener noreferrer">
                        Resume
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                 <tr>
                  
                  <td>PassPort/Aadhar</td>
                  
                  <td>
                   {selectedEmployee.attachments.passportAadharNumber && (
                    <div>
                      <a href={selectedEmployee.attachments.passportAadharNumber} target="_blank" rel="noopener noreferrer">
                        Passport/Aadhar
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>Experience</td>
                  <td>
                  
                  {selectedEmployee.attachments.previousExperience && (
                    <div>
                      <a href={selectedEmployee.attachments.previousExperience} target="_blank" rel="noopener noreferrer">
                        Previous Experience
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>E-Verify</td>
                  <td>
                  {selectedEmployee.attachments.eVerifyDocument && (
                    <div>
                      <a href={selectedEmployee.attachments.eVerifyDocument} target="_blank" rel="noopener noreferrer">
                        E-Verify Document
                      </a>
                    </div>
                  )}
                  </td>
                  </tr>
                  <tr>
                    <td>I-94</td>
                    <td>
                  {selectedEmployee.attachments.i94Document && (
                    <div>
                      <a href={selectedEmployee.attachments.i94Document} target="_blank" rel="noopener noreferrer">
                        I94 Document
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  <tr>
                    <td>I-9</td>
                    
                      <td>
                  {selectedEmployee.attachments.i9Document && (
                    <div>
                      <a href={selectedEmployee.attachments.i9Document} target="_blank" rel="noopener noreferrer">
                        I9 Document
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  <tr>
                      <td>W4</td><td>
                  {selectedEmployee.attachments.w4Document && (
                    <div>
                      <a href={selectedEmployee.attachments.w4Document} target="_blank" rel="noopener noreferrer">
                        W4 Document
                      </a>
                    </div>
                  )}</td>
                   </tr>
                  <tr>
                      <td>Driving License</td>
                  <td>
                  {selectedEmployee.attachments.drivingLicense && (
                    <div>
                      <a href={selectedEmployee.attachments.drivingLicense} target="_blank" rel="noopener noreferrer">
                        Driving License
                      </a>
                    </div>
                  )}</td>
                  </tr>
                  
                  <tr>
                      <td>Void Check</td><td>
                  {selectedEmployee.attachments.voidCheck && (
                    <div>
                      <a href={selectedEmployee.attachments.voidCheck} target="_blank" rel="noopener noreferrer">
                        Void Check
                      </a>
                    </div>
                  )}</td>
                   </tr>
                  <tr>
                      <td>EAD</td><td>
                  {selectedEmployee.attachments.eadCopy && (
                    <div>
                      <a href={selectedEmployee.attachments.eadCopy} target="_blank" rel="noopener noreferrer">
                        EAD Copy
                      </a>
                    </div>
                  )}
                </td>
              </tr>

              {/*<tr>
                <td>Billing Rate:</td>
                <td>
                  {`${selectedEmployee.billingRate}, ${selectedEmployee.effectiveDate}, ${selectedEmployee.price}`}
                </td>
      </tr>*/}
              {/* Other fields */}
            </tbody>
          </table>
        </div>
      )}
       
      
    </div>
  );
};

export default AdditionalDetails;


