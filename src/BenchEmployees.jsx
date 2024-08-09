// BenchEmployees.jsx
import React, { useState } from 'react';
import AdditionalDetails from './AdditionalDetails';

const BenchEmployees = ({ addToBenchList }) => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const handleAddEmployee = () => {
    setShowEmployeeForm(true);
  };

  return (
    <div>
      <h2>Bench Employees</h2>
      <button onClick={handleAddEmployee}>Add Employee</button>
      {showEmployeeForm && (
        <AdditionalDetails 
          showForm={showEmployeeForm} 
          addToBenchListProp={addToBenchList} 
        />
      )}
    </div>
  );
};

export default BenchEmployees;
