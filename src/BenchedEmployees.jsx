import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BenchedEmployees = ({ benchedEmployees, handleEdit, handleDelete }) => {
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    skillSet: '',
    communicationAddress: {
      houseNumber: '',
      pincode: '',
      area: '',
      village: '',
      district: '',
      state: '',
      country: '',
    },
    highestEducation: '',
    ssnPan: '',
    dateOfBirth: new Date(),
    passportAadharNumber: '',
    passportExpireDate: new Date(),
    salaryType: '',
    payPerHour: '',
    fixedPay: '',
    hireDate: new Date(),
    totalExperience: '',
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Define selectedEmployee state
  const navigate = useNavigate();

  const handleEmployeeClick = (index) => {
    setSelectedEmployeeIndex(index === selectedEmployeeIndex ? null : index);
    setSelectedEmployee(benchedEmployees[index]); // Update selectedEmployee when clicking on an employee
    setIsEditing(false);
  };

  const handleEditClick = (index) => {
    if (isEditing) {
      const updatedEmployees = [...benchedEmployees];
      updatedEmployees[index] = employee;
      handleEdit(updatedEmployees);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEmployee(benchedEmployees[index]);
    }
  };
  const handleDeleteClick = (index) => {
    const updatedEmployees = [...benchedEmployees];
    updatedEmployees.splice(index, 1);
    handleDelete(updatedEmployees); // Call handleDelete function with updated employees array
    setSelectedEmployeeIndex(null);
    setIsEditing(false);
  };
  
  
  const handleAssignProjectClick = (index) => {
    navigate(`/project-details/${index}`);
  };

  return (
    <div className="BenchedEmployees-container">
      <h4>Benched Employees</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {benchedEmployees.map((emp, index) => (
            <React.Fragment key={`employee-${index}`}>
              <tr>
                <td onClick={() => handleEmployeeClick(index)}>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>
                  <button onClick={() => handleEditClick(index)}>
                    {isEditing && selectedEmployeeIndex === index ? 'Save' : 'Edit'}
                  </button>
                  <button onClick={() => handleDeleteClick(index)}>Delete</button>
                  <button onClick={() => handleAssignProjectClick(index)}>Assign Project</button>
                </td>
              </tr>
              {selectedEmployeeIndex === index && (
                <tr>
                  <td colSpan="2">
                    <div>
                      <h4>Selected Employee Details</h4>
                      <table>
                        <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.firstName}
                                  onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.firstName
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Last Name:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.lastName}
                                  onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.lastName
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Phone:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.phone}
                                  onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.phone
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.email}
                                  onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.email
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Role/Designation:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.role}
                                  onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.role
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Skill Set:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <textarea
                                  value={employee.skillSet}
                                  onChange={(e) => setEmployee({ ...employee, skillSet: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.skillSet
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Communication Address:</td>
                            <td colSpan="7">
                              {isEditing && selectedEmployeeIndex === index ? (
                                <>
                                  <input
                                    type="text"
                                    placeholder="House Number"
                                    value={employee.communicationAddress.houseNumber}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, houseNumber: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={employee.communicationAddress.pincode}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, pincode: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="Area/Street"
                                    value={employee.communicationAddress.area}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, area: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="Village"
                                    value={employee.communicationAddress.village}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, village: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="District"
                                    value={employee.communicationAddress.district}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, district: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="State"
                                    value={employee.communicationAddress.state}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, state: e.target.value },
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    placeholder="Country"
                                    value={employee.communicationAddress.country}
                                    onChange={(e) =>
                                      setEmployee({
                                        ...employee,
                                        communicationAddress: { ...employee.communicationAddress, country: e.target.value },
                                      })
                                    }
                                  />
                                </>
                              ) : (
                                `${selectedEmployee.communicationAddress.houseNumber}, ${selectedEmployee.communicationAddress.pincode}, ${selectedEmployee.communicationAddress.area}, ${selectedEmployee.communicationAddress.village}, ${selectedEmployee.communicationAddress.district}, ${selectedEmployee.communicationAddress.state}, ${selectedEmployee.communicationAddress.country}`
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Highest Education:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.highestEducation}
                                  onChange={(e) => setEmployee({ ...employee, highestEducation: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.highestEducation
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>SSN/PAN:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.ssnPan}
                                  onChange={(e) => setEmployee({ ...employee, ssnPan: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.ssnPan
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Date Of Birth:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <DatePicker
                                  selected={employee.dateOfBirth}
                                  onChange={(date) => setEmployee({ ...employee, dateOfBirth: date })}
                                />
                              ) : (
                                selectedEmployee.dateOfBirth.toDateString()
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Passport/Aadhar Number:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <input
                                  type="text"
                                  value={employee.passportAadharNumber}
                                  onChange={(e) => setEmployee({ ...employee, passportAadharNumber: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.passportAadharNumber
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Passport Expire Date:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <DatePicker
                                  selected={employee.passportExpireDate}
                                  onChange={(date) => setEmployee({ ...employee, passportExpireDate: date })}
                                />
                              ) : (
                                selectedEmployee.passportExpireDate.toDateString()
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Salary Type:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <select
                                  value={employee.salaryType}
                                  onChange={(e) => setEmployee({ ...employee, salaryType: e.target.value })}
                                >
                                  <option value="">Select</option>
                                  <option value="payPerHour">Pay per Hour</option>
                                  <option value="fixedPay">Fixed Pay</option>
                                </select>
                              ) : (
                                selectedEmployee.salaryType
                              )}
                            </td>
                          </tr>
                          {employee.salaryType === 'payPerHour' && (
                            <tr>
                              <td>Amount per Hour:</td>
                              <td>
                                {isEditing && selectedEmployeeIndex === index ? (
                                  <input
                                    type="text"
                                    value={employee.payPerHour}
                                    onChange={(e) => setEmployee({ ...employee, payPerHour: e.target.value })}
                                  />
                                ) : (
                                  selectedEmployee.payPerHour
                                )}
                              </td>
                            </tr>
                          )}
                          {employee.salaryType === 'fixedPay' && (
                            <tr>
                              <td>Amount:</td>
                              <td>
                                {isEditing && selectedEmployeeIndex === index ? (
                                  <input
                                    type="text"
                                    value={employee.fixedPay}
                                    onChange={(e) => setEmployee({ ...employee, fixedPay: e.target.value })}
                                  />
                                ) : (
                                  selectedEmployee.fixedPay
                                )}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td>Hire Date:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <DatePicker
                                  selected={employee.hireDate}
                                  onChange={(date) => setEmployee({ ...employee, hireDate: date })}
                                />
                              ) : (
                                selectedEmployee.hireDate.toDateString()
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Total Experience:</td>
                            <td>
                              {isEditing && selectedEmployeeIndex === index ? (
                                <textarea
                                  value={employee.totalExperience}
                                  onChange={(e) => setEmployee({ ...employee, totalExperience: e.target.value })}
                                />
                              ) : (
                                selectedEmployee.totalExperience
                              )}
                            </td>
                          </tr>
                          {/* Rendering employee details here */}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          
        </tbody>
      </table>
      
    </div>
  );
  
};

export default BenchedEmployees;
