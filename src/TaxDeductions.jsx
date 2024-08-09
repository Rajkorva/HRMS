import React, { useState } from 'react';
import './App.css';
import { useParams, useNavigate } from 'react-router-dom';

const TaxDetails = () => {
  const { index } = useParams(); // Get the index from the URL parameters
  const [localDeductionDetails, setLocalDeductionDetails] = useState({
    taxId: '',
    taxRate: '',
    deductionType: '',
    deductionAmount: '',
    pf: { value: '', type: 'Value', amount: '' },
    esi: { value: '', type: 'Value', amount: '' },
    professionalTax: { value: '', type: 'Value', amount: '' },
    tdsIt: { value: '', type: 'Value', amount: '' },
    medicalInsurance: { value: '', type: 'Value', amount: '' },
    advance: { amount: '', type: 'Value', installments: '' },
    incentives: { value: '', type: 'Value', amount: '' },
    companyContributions: [
      {
        type: 'PF',
        value: '',
        amountType: 'Value',
        amount: ''
      }
    ],
    gstDeductions: [
      { name: '', amount: '', type: 'Value' }
    ]
  });
  const [deductionsList, setDeductionsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setDeductionsList(deductionsList.map((deduction, i) => (i === editIndex ? localDeductionDetails : deduction)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setDeductionsList([...deductionsList, localDeductionDetails]);
    }
    resetForm();
  };

  const resetForm = () => {
    setLocalDeductionDetails({
      taxId: '',
      taxRate: '',
      deductionType: '',
      deductionAmount: '',
      pf: { value: '', type: 'Value', amount: '' },
      esi: { value: '', type: 'Value', amount: '' },
      professionalTax: { value: '', type: 'Value', amount: '' },
      tdsIt: { value: '', type: 'Value', amount: '' },
      medicalInsurance: { value: '', type: 'Value', amount: '' },
      advance: { amount: '', type: 'Value', installments: '' },
      incentives: { value: '', type: 'Value', amount: '' },
      companyContributions: [
        {
          type: 'PF',
          value: '',
          amountType: 'Value',
          amount: ''
        }
      ],
      gstDeductions: [
        { name: '', amount: '', type: 'Value' }
      ]
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

  const handleCompanyContributionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContributions = localDeductionDetails.companyContributions.map((contribution, i) => {
      if (i === index) {
        return {
          ...contribution,
          [name]: value,
        };
      }
      return contribution;
    });
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      companyContributions: updatedContributions,
    }));
  };

  const handleGstDeductionsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGstDeductions = localDeductionDetails.gstDeductions.map((gst, i) => {
      if (i === index) {
        return {
          ...gst,
          [name]: value,
        };
      }
      return gst;
    });
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      gstDeductions: updatedGstDeductions,
    }));
  };

  const addCompanyContribution = () => {
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      companyContributions: [
        ...prevData.companyContributions,
        { type: 'PF', value: '', amountType: 'Value', amount: '' }
      ]
    }));
  };

  const addGstDeduction = () => {
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      gstDeductions: [
        ...prevData.gstDeductions,
        { name: '', amount: '', type: 'Value' }
      ]
    }));
  };

  const removeCompanyContribution = (index) => {
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      companyContributions: prevData.companyContributions.filter((_, i) => i !== index)
    }));
  };

  const removeGstDeduction = (index) => {
    setLocalDeductionDetails((prevData) => ({
      ...prevData,
      gstDeductions: prevData.gstDeductions.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setLocalDeductionDetails(deductionsList[index]);
  };

  const handleDelete = (index) => {
    setDeductionsList(deductionsList.filter((_, i) => i !== index));
  };

  const handlePay = () => {
    if (deductionsList.length === 0) {
      alert('Deductions list cannot be empty.');
      return;
    }
    navigate('/active-employees', { state: { employees: deductionsList } });
  };

  const [modalOpen, setModalOpen] = useState(false);
const [manualPayDetails, setManualPayDetails] = useState({
  name: '',
  amount: '',
  type: 'Value', // Default type
});

const handleModalOpen = () => {
  setModalOpen(true);
};

const handleModalClose = () => {
  setModalOpen(false);
};

const handleManualPayChange = (e) => {
  const { name, value } = e.target;
  setManualPayDetails((prevDetails) => ({
    ...prevDetails,
    [name]: value,
  }));
};
 
const handleAddAdditionalPay = () => {
  if (!manualPayDetails.name || !manualPayDetails.amount) {
    alert('Please fill in both name and amount.');
    return;
  }

  setAdditionalPayList([...additionalPayList, manualPayDetails]);
  setManualPayDetails({ name: '', amount: '', type: 'Value' }); // Reset manual pay details
  setModalOpen(false); // Close the modal
};

const [additionalPayList, setAdditionalPayList] = useState([]);
const getFieldLabel = (field) => {
  switch (field) {
    case 'pf':
      return 'PF ';
    case 'esi':
      return 'ESI ';
    case 'professionalTax':
      return 'Professional Tax ';
    case 'tdsIt':
      return 'TDS/IT ';
    case 'medicalInsurance':
      return 'Medical Insurance ';
    default:
      return '';
  }
};

const [showForm, setShowForm] = useState(false);
const toggleForm = () => {
  setShowForm(!showForm); // Toggle the state to show or hide the form
};

const [payList, setPayList] = useState([]);


  return (
    <div className="TaxDetails" style={{ width: '800px', marginLeft: '15px', borderTop:'2px solid black' }}>
     <h4 style={{ marginBottom: '-2px', marginLeft:'100px'}}>Click on the below button to enter the details of Tax and Deductions</h4>
      <button type="button" onClick={toggleForm} style={{ width: '30%', marginLeft:'250px',backgroundColor:'#f44336', marginTop:'10px' }}>
        {showForm ? 'Close' : 'Add Deduction Details'}
      </button>
      {showForm && (
    <div style={{borderTop:'2px solid black'}}>
       <h5>Tax Details {index}</h5>
       <button type="button" onClick={handleModalOpen} style={{ width: '25%' }}>Add New Deduction</button>
      <form onSubmit={handleSubmit}>
      
      


      {['pf', 'esi', 'professionalTax', 'tdsIt', 'medicalInsurance'].map((field) => (
  <div className="input-group" key={field}>
    <label>{getFieldLabel(field)}:</label>
    <input
      type="text"
      name={`${field}.value`}
      value={localDeductionDetails[field].value}
      onChange={handleChange}
    />
    <input
      type="text"
      name={`${field}.amount`}
      value={localDeductionDetails[field].amount}
      onChange={handleChange}
      placeholder="Amount"
    />
    <label>
      <input
        type="radio"
        name={`${field}.type`}
        value="Value"
        checked={localDeductionDetails[field].type === 'Value'}
        onChange={handleChange}
      />
      Value
    </label>
    <label>
      <input
        type="radio"
        name={`${field}.type`}
        value="%"
        checked={localDeductionDetails[field].type === '%'}
        onChange={handleChange}
      />
      %
    </label>
  </div>
))}

        <div className="input-group" style={{marginLeft:'10px'}}>
          <label>Advance Amount:</label>
          
           <select
            name="advance.installments"
            value={localDeductionDetails.advance.installments}
            onChange={handleChange}
          >
            <option value="">Select Installments</option>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
          <input
            type="text"
            name="advance.amount"
            value={localDeductionDetails.advance.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
          <label>
            <input
              type="radio"
              name="advance.type"
              value="Value"
              checked={localDeductionDetails.advance.type === 'Value'}
              onChange={handleChange}
            />
            Value
          </label>
          <label>
            <input
              type="radio"
              name="advance.type"
              value="%"
              checked={localDeductionDetails.advance.type === '%'}
              onChange={handleChange}
            />
            %
          </label>
        </div>
       {/*} <div className="input-group">
          <label>Advance Installments:</label>
         
        </div>*/}
       
       {/*{localDeductionDetails.companyContributions.map((contribution, index) => (
          <div className="input-deduction" key={index}>
            <label>Company Contribution:</label>
            <select
              name="type"
              value={contribution.type}
              onChange={(e) => handleCompanyContributionChange(index, e)}
            >
              <option value="PF">PF</option>
              <option value="ESI">ESI</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="value"
              value={contribution.value}
              onChange={(e) => handleCompanyContributionChange(index, e)}
              placeholder="Value"
            />
            <label>
              <input
                type="radio"
                name="amountType"
                value="Value"
                checked={contribution.amountType === 'Value'}
                onChange={(e) => handleCompanyContributionChange(index, e)}
              />
              Value
            </label>
            <label>
              <input
                type="radio"
                name="amountType"
                value="%"
                checked={contribution.amountType === '%'}
                onChange={(e) => handleCompanyContributionChange(index, e)}
              />
              %
            </label>
            <input
              type="text"
              name="amount"
              value={contribution.amount}
              onChange={(e) => handleCompanyContributionChange(index, e)}
              placeholder="Amount"
            />
            <button type="button" onClick={() => removeCompanyContribution(index)}>Remove</button>
          </div>
        ))}
       <button type="button" onClick={addCompanyContribution}>Add Company Contribution</button>
       */}
           <div className="input-group" style={{marginRight:'300px'}}>
        {localDeductionDetails.gstDeductions.map((gst, index) => (
          <div className="input-group" key={index} >
            <label>GST Deduction Name:</label>
            <input
              type="text"
              name="name"
              value={gst.name}
              onChange={(e) => handleGstDeductionsChange(index, e)}
              placeholder="Name"
            />
            <input
              type="text"
              name="amount"
              value={gst.amount}
              onChange={(e) => handleGstDeductionsChange(index, e)}
              placeholder="Amount"
            />
            <label>
              <input
                type="radio"
                name="type"
                value="Value"
                checked={gst.type === 'Value'}
                onChange={(e) => handleGstDeductionsChange(index, e)}
              />
              Value
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="%"
                checked={gst.type === '%'}
                onChange={(e) => handleGstDeductionsChange(index, e)}
              />
              %
            </label>
            <button type="button" onClick={() => removeGstDeduction(index)} style={{width:'10%'}}>X</button>
            <button type="button" onClick={addGstDeduction} style={{width:'100%'}} >Add Another GST Deduction</button>
          </div>
        ))}
        </div>
       
       <button type="submit" style={{width:'30%', marginLeft:'275px', backgroundColor:'#f44336'}} >{isEditing ? 'Update' : 'Submit'}</button>
        {additionalPayList.length > 0 && (
  <div>
    <h4>Additional Input</h4>
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
       {payList.length > 0 && (

      <div style={{width:'1000px'}}>
        <h4>Deductions List</h4>
        <table>
          <thead>
            <tr>
              <th>PF</th>
              <th>ESI</th>
              <th>PT</th>
              <th>TDS/IT</th>
              <th>Medical Insurance</th>
              <th>Advance</th>
              <th>Incentives</th>
              <th>GST Deduction</th>
              <th>Additional Input</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deductionsList.map((deduction, index) => (
              <tr key={index}>
                <td>{`${deduction.pf.value} (${deduction.pf.type}), Amount: ${deduction.pf.amount}`}</td>
                <td>{`${deduction.esi.value} (${deduction.esi.type}), Amount: ${deduction.esi.amount}`}</td>
                <td>{`${deduction.professionalTax.value} (${deduction.professionalTax.type}), Amount: ${deduction.professionalTax.amount}`}</td>
                <td>{`${deduction.tdsIt.value} (${deduction.tdsIt.type}), Amount: ${deduction.tdsIt.amount}`}</td>
                <td>{`${deduction.medicalInsurance.value} (${deduction.medicalInsurance.type}), Amount: ${deduction.medicalInsurance.amount}`}</td>
                <td>{`Amount: ${deduction.advance.amount}, Type: ${deduction.advance.type}, Installments: ${deduction.advance.installments}`}</td>
                <td>{`${deduction.incentives.value} (${deduction.incentives.type}), Amount: ${deduction.incentives.amount}`}</td>
               
                {/*<td>
                  {deduction.companyContributions.map((contribution, i) => (
                    <div key={i}>
                      {`${contribution.value} (${contribution.amountType}) - ${contribution.type}, Amount: ${contribution.amount}`}
                    </div>
                  ))}
                  </td>*/}
                <td>
                  {deduction.gstDeductions.map((gst, i) => (
                    <div key={i}>
                      {`Name: ${gst.name}, Amount: ${gst.amount} (${gst.type})`}
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
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       )}
      {/*<button onClick={handlePay}>Pay</button>*/}
    </div>
  );
};

export default TaxDetails;
