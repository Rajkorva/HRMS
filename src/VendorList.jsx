import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VendorList = () => {
  const location = useLocation();
  const initialState = location.state && location.state.employees ? location.state : { employees: [] };
  const [employees, setEmployees] = useState(initialState.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setEmployees(location.state.employees);
    }
  }, [location.state]);

  const handleEmployeeClick = (index) => {
    setSelectedEmployee(selectedEmployee === employees[index] ? null : employees[index]);
    setIsEditing(false);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setSelectedEmployee(employees[index]);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
    if (selectedEmployee && index === employees.indexOf(selectedEmployee)) {
      setSelectedEmployee(null);
    }
  };

  return (
    <div>
      <div className="vendor-list-container">
        <h3>Vendor List</h3>
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
      </div>
      {selectedEmployee && (
        <div className="selected-employee-details">
          <h4>Selected Employee Details</h4>
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
                <td>{selectedEmployee.payRate}</td>
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
              {/* Add other fields */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorList;
