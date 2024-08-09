import React, { useState } from 'react';
import './App.css';

const EmployeePay = () => {
  const [payDetails, setPayDetails] = useState({
    grossSalary: '',
    basicSalary: '',
    basicSalaryAmountType: 'Value',
    hra: '',
    hraAmountType: 'Value',
    bonus: {
      type: '',
      amount: '',
      amountType: 'Value'
    },
    leaveEncashment: '',
    leaveEncashmentAmountType: 'Value',
    miscellaneous: '',
    miscellaneousAmountType: 'Value',
    medicalInsurance: '',
    medicalInsuranceAmountType: 'Value',
    allowances: {
      travel: '',
      travelAmountType: 'Value',
      da: '',
      daAmountType: 'Value',
      food: '',
      foodAmountType: 'Value',
      internet: '',
      internetAmountType: 'Value',
      city: '',
      cityAmountType: 'Value',
      special: '',
      specialAmountType: 'Value'
    },
    companyContributions: [{
      type: 'PF',
      value: '',
      amountType: 'Value',
      amount: ''
    }]
  });

  const [localDeductionDetails, setLocalDeductionDetails] = useState({
    incentives: { value: '', type: 'Value', amount: '' },
    companyContributions: [],  // Adjusted to store both company and employer contributions
    employerContributions: []
  });

  const [payList, setPayList] = useState([]);

  const handlePayChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPayDetails(prevDetails => ({
        ...prevDetails,
        [parent]: {
          ...prevDetails[parent],
          [child]: value
        }
      }));
    } else {
      setPayDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setPayDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleBonusRadioChange = (e) => {
    const { name, value } = e.target;
    setPayDetails(prevDetails => ({
      ...prevDetails,
      bonus: {
        ...prevDetails.bonus,
        [name]: value
      }
    }));
  };

  const handleCompanyContributionChange = (type, index, e) => {
    const { name, value } = e.target;
    const updatedContributions = type === 'company'
      ? [...localDeductionDetails.companyContributions]
      : [...localDeductionDetails.employerContributions];

    updatedContributions[index] = {
      ...updatedContributions[index],
      [name]: value
    };

    setLocalDeductionDetails(prevData => ({
      ...prevData,
      companyContributions: type === 'company' ? updatedContributions : prevData.companyContributions,
      employerContributions: type === 'employer' ? updatedContributions : prevData.employerContributions
    }));
  };

  const addCompanyContribution = (type) => {
    setLocalDeductionDetails(prevData => ({
      ...prevData,
      companyContributions: type === 'company'
        ? [...prevData.companyContributions, { type: 'PF', value: '', amountType: 'Value', amount: '' }]
        : prevData.companyContributions,
      employerContributions: type === 'employer'
        ? [...prevData.employerContributions, { type: 'PF', value: '', amountType: 'Value', amount: '' }]
        : prevData.employerContributions,
    }));
  };

  const removeCompanyContribution = (type, index) => {
    setLocalDeductionDetails(prevData => ({
      ...prevData,
      companyContributions: type === 'company'
        ? prevData.companyContributions.filter((_, i) => i !== index)
        : prevData.companyContributions,
      employerContributions: type === 'employer'
        ? prevData.employerContributions.filter((_, i) => i !== index)
        : prevData.employerContributions,
    }));
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setPayList([...payList, payDetails]);
    setPayDetails({
      grossSalary: '',
      basicSalary: '',
      basicSalaryAmountType: 'Value',
      hra: '',
      hraAmountType: 'Value',
      bonus: {
        type: '',
        amount: '',
        amountType: 'Value'
      },
      leaveEncashment: '',
      leaveEncashmentAmountType: 'Value',
      miscellaneous: '',
      miscellaneousAmountType: 'Value',
      medicalInsurance: '',
      medicalInsuranceAmountType: 'Value',
      allowances: {
        travel: '',
        travelAmountType: 'Value',
        da: '',
        daAmountType: 'Value',
        food: '',
        foodAmountType: 'Value',
        internet: '',
        internetAmountType: 'Value',
        city: '',
        cityAmountType: 'Value',
        special: '',
        specialAmountType: 'Value'
      },
      companyContributions: [{
        type: 'PF',
        value: '',
        amountType: 'Value',
        amount: ''
      }],
      manualPayDetails: [{
        name:'',
        amount:'',
        type:''
      }]
    });
  }; 
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');
    if (subField) {
      setLocalDeductionDetails((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subField]: value,
        },
      }));
    } else {
      setLocalDeductionDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const [additionalPayList, setAdditionalPayList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [manualPayDetails, setManualPayDetails] = useState({
    name: '',
    amount: '',
    type: 'Value'
  });
  const handleModalClose = () => {
    setModalOpen(false);
    // Clear manualPayDetails after modal closes
    setManualPayDetails({
      name: '',
      amount: '',
      type: 'Value'
    });
  };

  const handleManualPayChange = (e) => {
    const { name, value } = e.target;
    setManualPayDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddAdditionalPay = () => {
    // Validate inputs before adding to the list
    if (manualPayDetails.name && manualPayDetails.amount) {
      setAdditionalPayList([...additionalPayList, manualPayDetails]);
      handleModalClose(); // Close modal after adding
    } else {
      alert('Please enter name and amount.');
    }
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const [showForm, setShowForm] = useState(false);
const toggleForm = () => {
  setShowForm(!showForm); // Toggle the state to show or hide the form
};

  return (
    <div className="EmployeePay" style={{  marginTop:'20px', width: '800px', borderTop:'2px solid black' }}>
      <h4 style={{ marginBottom: '-150px', marginLeft:'150px'}}>Click on the below button to enter the pay details of an employee </h4>
      <button type="button" onClick={toggleForm} style={{ width: '30%', marginTop: '160px', marginLeft:'275px',backgroundColor:'#f44336' }}>
        {showForm ? 'Close' : 'Add Pay Details'}
      </button>
      {showForm && (
      <div style={{ borderTop:'2px solid black'}}>
        <h4>Employee Pay Details</h4>
      <button type="button" onClick={handleModalOpen} style={{width:'20%'}}>Add New Pay</button>
      <form onSubmit={handlePaySubmit}>
   

{/* Displaying the list of additional pay details */}

        <div className="input-group">
          <label>Gross Salary:</label>
          <input
            type="text"
            name="grossSalary"
            value={payDetails.grossSalary}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="grossSalaryAmountType"
              value="Value"
              checked={payDetails.grossSalaryAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="grossSalaryAmountType"
              value="%"
              checked={payDetails.grossSalaryAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Basic Salary:</label>
          <input
            type="text"
            name="basicSalary"
            value={payDetails.basicSalary}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="basicSalaryAmountType"
              value="Value"
              checked={payDetails.basicSalaryAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="basicSalaryAmountType"
              value="%"
              checked={payDetails.basicSalaryAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>HRA:</label>
          <input
            type="text"
            name="hra"
            value={payDetails.hra}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="hraAmountType"
              value="Value"
              checked={payDetails.hraAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="hraAmountType"
              value="%"
              checked={payDetails.hraAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Bonus Amount:</label>
          <input
            type="text"
            name="bonus.amount"
            value={payDetails.bonus.amount}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="bonus.amountType"
              value="Value"
              checked={payDetails.bonus.amountType === 'Value'}
              onChange={handleBonusRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="bonus.amountType"
              value="%"
              checked={payDetails.bonus.amountType === '%'}
              onChange={handleBonusRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Leave Encashment:</label>
          <input
            type="text"
            name="leaveEncashment"
            value={payDetails.leaveEncashment}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="leaveEncashmentAmountType"
              value="Value"
              checked={payDetails.leaveEncashmentAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="leaveEncashmentAmountType"
              value="%"
              checked={payDetails.leaveEncashmentAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Incentives:</label>
          {/*<input
            type="text"
            name="incentives.value"
            value={localDeductionDetails.incentives.value}
            onChange={handleChange}
            placeholder="Value"
/>*/}
          <input
            type="text"
            name="incentives.amount"
            value={localDeductionDetails.incentives.amount}
            onChange={handleChange}
            
          />
          <label>
            <input
              type="radio"
              name="incentives.type"
              value="Value"
              checked={localDeductionDetails.incentives.type === 'Value'}
              onChange={handleChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="incentives.type"
              value="%"
              checked={localDeductionDetails.incentives.type === '%'}
              onChange={handleChange}
            />
            %
          </label>
          
        </div>
        <div className="input-group">
          <label>Medical Insurance:</label>
          <input
            type="text"
            name="medicalInsurance"
            value={payDetails.medicalInsurance}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="medicalInsuranceAmountType"
              value="Value"
              checked={payDetails.medicalInsuranceAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="medicalInsuranceAmountType"
              value="%"
              checked={payDetails.medicalInsuranceAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Allowances:</label>
          <input
            type="text"
            name="allowances.travel"
            value={payDetails.allowances.travel}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="allowances.travelAmountType"
              value="Value"
              checked={payDetails.allowances.travelAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="allowances.travelAmountType"
              value="%"
              checked={payDetails.allowances.travelAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group">
          <label>Allowance - Special:</label>
          <input
            type="text"
            name="allowances.special"
            value={payDetails.allowances.special}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="allowances.specialAmountType"
              value="Value"
              checked={payDetails.allowances.specialAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="allowances.specialAmountType"
              value="%"
              checked={payDetails.allowances.specialAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
        <div className="input-group" >
          <label>Miscellaneous:</label>
          <input
            type="text"
            name="miscellaneous"
            value={payDetails.miscellaneous}
            onChange={handlePayChange}
          />
          <label>
            <input
              type="radio"
              name="miscellaneousAmountType"
              value="Value"
              checked={payDetails.miscellaneousAmountType === 'Value'}
              onChange={handleRadioChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="miscellaneousAmountType"
              value="%"
              checked={payDetails.miscellaneousAmountType === '%'}
              onChange={handleRadioChange}
            />
            %
          </label>
        </div>
      
        <div className="input-group"  >
          <h4>Company Contributions</h4>
          
          {localDeductionDetails.companyContributions.map((contribution, index) => (
            <div className="input-group" key={index}>
              <label>Company Contribution:</label>
              <select
                name="type"
                value={contribution.type}
                onChange={(e) => handleCompanyContributionChange('company', index, e)}
              >
                <option value="PF">PF</option>
                <option value="ESI">ESI</option>
                <option value="Other">Other</option>
              </select>
              {/*<input
                type="text"
                name="value"
                value={contribution.value}
                onChange={(e) => handleCompanyContributionChange('company', index, e)}
                placeholder="Value"
          />*/}
              <label>
                <input
                  type="radio"
                  name="amountType"
                  value="Value"
                  checked={contribution.amountType === 'Value'}
                  onChange={(e) => handleCompanyContributionChange('company', index, e)}
                />
                Value
              </label>
              <label>
                <input
                  type="radio"
                  name="amountType"
                  value="%"
                  checked={contribution.amountType === '%'}
                  onChange={(e) => handleCompanyContributionChange('company', index, e)}
                />
                %
              </label>
              <input
                type="text"
                name="amount"
                value={contribution.amount}
                onChange={(e) => handleCompanyContributionChange('company', index, e)}
                placeholder="Amount"
              />
              <button type="button" onClick={() => removeCompanyContribution('company', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addCompanyContribution('company')} style={{width:'210px'}}>Add Company Contribution</button>
        </div>

        {/* Employer Contributions */}
        <div className="input-group" >
          <h4>Employer Contributions</h4>
          {localDeductionDetails.employerContributions.map((contribution, index) => (
            <div className="input-group" key={index}>
              <label>Employer Contribution:</label>
              <select
                name="type"
                value={contribution.type}
                onChange={(e) => handleCompanyContributionChange('employer', index, e)}
              >
                <option value="PF">PF</option>
                <option value="ESI">ESI</option>
                <option value="Other">Other</option>
              </select>
              {/*<input
                type="text"
                name="value"
                value={contribution.value}
                onChange={(e) => handleCompanyContributionChange('employer', index, e)}
                placeholder="Value"
          />*/}
              <label>
                <input
                  type="radio"
                  name="amountType"
                  value="Value"
                  checked={contribution.amountType === 'Value'}
                  onChange={(e) => handleCompanyContributionChange('employer', index, e)}
                />
                Value
              </label>
              <label>
                <input
                  type="radio"
                  name="amountType"
                  value="%"
                  checked={contribution.amountType === '%'}
                  onChange={(e) => handleCompanyContributionChange('employer', index, e)}
                />
                %
              </label>
              <input
                type="text"
                name="amount"
                value={contribution.amount}
                onChange={(e) => handleCompanyContributionChange('employer', index, e)}
                placeholder="Amount"
              />
              <button type="button" onClick={() => removeCompanyContribution('employer', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addCompanyContribution('employer')} style={{width:'210px'}}>Add Employer Contribution</button>
        </div>
        
        {/* Company Contributions */}
       {/*} <h4>Company Contributions</h4>*/}
       
       <button type="submit" style={{width:'20%',marginRight:'200px', color:'white', backgroundColor:'#f44336'}}>Save</button>
       {additionalPayList.length > 0 && (
  <div>
    <h4>Additional Pay List</h4>
    <ul>
      {additionalPayList.map((pay, index) => (
        <li key={index}>
          Input: {pay.name}, Amount: {pay.amount}, Type: {pay.type}
        </li>
      ))}
    </ul>
  </div>
)}

{modalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleModalClose}>&times;</span>
      <h2>Add Additional Pay</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={manualPayDetails.name}
        onChange={handleManualPayChange}
      />
      <label>Amount:</label>
      <input
        type="text"
        name="amount"
        value={manualPayDetails.amount}
        onChange={handleManualPayChange}
      />
      <label>
        <input
          type="radio"
          name="type"
          value="Value"
          checked={manualPayDetails.type === 'Value'}
          onChange={handleManualPayChange}
        />
        Value
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="%"
          checked={manualPayDetails.type === '%'}
          onChange={handleManualPayChange}
        />
        %
      </label>
      <button type="button" onClick={handleAddAdditionalPay}>Add Pay</button>
    </div>
  </div>
)}
      </form>

      </div>
      )}
     
      
      {/* Displaying the table for the list of pay details */}
      {payList.length > 0 && (
  <div style={{width:'1500px', marginLeft:'-200px'}}>
    <h4>Employee Pay List</h4>
    <table>
      <thead>
        <tr>
          <th>Gross Salary</th>
          <th>Basic Salary</th>
          <th>HRA</th>
          <th>Bonus Type</th>
          <th>Bonus Amount</th>
          <th>Leave Encashment</th>
          <th>Medical Insurance</th>
          <th>Allowances</th>
          <th>Special Allowance</th>
          <th>Miscellaneous</th>
          <th>Company Contributions</th>
          <th>Additional Input</th>
        </tr>
      </thead>
      <tbody>
        {payList.map((pay, index) => (
          <tr key={index}>
            <td>{pay.grossSalary}</td>
            <td>{pay.basicSalary}</td>
            <td>{pay.hra}</td>
            <td>{pay.bonus.type}</td>
            <td>{pay.bonus.amount}</td>
            <td>{pay.leaveEncashment}</td>
            <td>{pay.medicalInsurance}</td>
            <td>{pay.allowances.travel}</td>
            <td>{pay.allowances.special}</td>
            <td>{pay.miscellaneous}</td>
            <td>
              {pay.companyContributions.map((contribution, idx) => (
                <div key={idx}>
                  {contribution.type}: {contribution.value} ({contribution.amount})
                </div>
              ))}
            </td>
            <td>
              {additionalPayList.map((additionalPay, idx) => (
                <div key={idx}>
                  {additionalPay.name}: {additionalPay.amount} ({additionalPay.type})
                </div>
              ))}
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeePay;
