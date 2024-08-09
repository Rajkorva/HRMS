import React, { useState } from 'react';
import './App.css';
import {  useNavigate } from 'react-router-dom';



const Timesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [hours, setHours] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [tasksPending, setTasksPending] = useState('');
  const [technology, setTechnology] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [date, setDate] = useState('');
  const [nonBillableHours, setNonBillableHours] = useState('');
  const [weekday, setWeekday] = useState('');
  const [leave, setLeave] = useState('');
  const [officialHoliday, setOfficialHoliday] = useState('');
  const [billableHours, setBillableHours] = useState('Yes'); // Default value is 'Yes'
   // State to control visibility of employee details form
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [weeksInMonth, setWeeksInMonth] = useState([]);
  const [descriptionInputs, setDescriptionInputs] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
 
 

  
  const navigate = useNavigate();
 
  const [employee, setEmployee] = useState('Employee Name');
 
  const [formData, setFormData] = useState({
    employee: 'Employee Name', // Set default value for employee
    client: '', // Set default value for client
    project: '',
    month: '',
    year: '',
    paymentFrequency: '',
    AttachTimesheet: '',
    additionalAttachment: { AttachTimesheet_additional: [] }, // Set default value for project
    // Other fields...
  });
  
  
  
  const handleDescriptionInputChange = (e, index) => {
    const { value } = e.target;
    const newDescriptionInputs = [...descriptionInputs];
    newDescriptionInputs[index] = value;
    setDescriptionInputs(newDescriptionInputs);
  };
   const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month) - 1];
  };


  

  

  const addDescriptionInput = () => {
    setDescriptionInputs([...descriptionInputs, '']);
  };

  const calculateTotals = (entries) => {
    let totalCompleted = 0;
    let totalPending = 0;
    entries.forEach(entry => {
      totalCompleted += entry.tasksCompleted || 0;
      totalPending += entry.tasksPending || 0;
    });
    console.log("Total Tasks Completed:", totalCompleted);
    console.log("Total Tasks Pending:", totalPending);
  };
  
  
  
  
  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimesheets([...timesheets, {
        ...formData,
        hours,
        taskDescription
    }]);
    setFormData({
        employee: 'Employee Name', // Set default value for employee
        client: '', // Set default value for client
        project: '',
        month: '',
        year: '',
        paymentFrequency: '',
        AttachTimesheet: '',
        additionalAttachment: { AttachTimesheet_additional: [] },
    });
    // Reset hours and taskDescription state
    setHours([]);
    setTaskDescription([]);
};

const handleEmployeeClick = (index) => {
    setSelectedTimesheet(selectedTimesheet === timesheets[index] ? null : timesheets[index]);
    setShowEmployeeDetails(true);
};


  const handleDelete = (index) => {
    const newTimesheets = [...timesheets];
    newTimesheets.splice(index, 1);
    setTimesheets(newTimesheets);
  };
  const handleEdit = (index) => {
    const entry = timesheets[index];
    if (entry) {
      setEmployee(entry.employee)
      setClient(entry.client);
      setProject(entry.project);
      setMonth(entry.month);
      setYear(entry.year);
      setEmployeeName(entry.employeeName);
      setPaymentFrequency(entry.paymentFrequency); // Assuming paymentFrequency exists in your data
      setFormData({
        ...formData,
        additionalAttachment: { AttachTimesheet_additional: entry.AttachTimesheet_additional }
      });
      setEditIndex(index);
      setShowEmployeeDetails(true);
      
      // Reset the file input by resetting the form
      const form = document.getElementById("timesheetForm");
      if (form) {
        form.reset();
      }
    }
  };

  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
  

 
  
  const handleFrequencyChange = (e) => {
    const { value } = e.target;
    // Update the paymentFrequency state
    setFormData(prevState => ({
      ...prevState,
      paymentFrequency: value
    }));
  
    // Recalculate daysInMonth based on the selected month and year
    if (formData.month && formData.year) {
      const days = getDaysInMonth(formData.month, formData.year);
      setDaysInMonth(days);
    }
  };
  
  

  const handleAddToCreate = () => {
    navigate('/timesheet-details', { state: { timesheet: [...timesheets, formData] } });
  };
  

  const getWeeksInMonth = (month, year) => {
    const weeks = [];
    const firstDay = new Date(year, month - 1, 1).getDay(); // Get the first day of the month
    const daysInMonth = new Date(year, month, 0).getDate();
    let week = [];
    let currentDay = 1;
  
    // Add empty slots for days before the first Monday
    for (let i = 0; i < firstDay; i++) {
      week.push({ date: '', disabled: true });
    }
  
    // Populate the days of the month
    for (let i = firstDay; i < 7; i++) {
      week.push({ date: currentDay, disabled: false });
      currentDay++;
    }
    weeks.push(week);
  
    // Add remaining weeks
    while (currentDay <= daysInMonth) {
      week = [];
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        week.push({ date: currentDay, disabled: false });
        currentDay++;
      }
      weeks.push(week);
    }
  
    // Add empty slots for days after the last Sunday
    while (week.length < 7) {
      week.push({ date: '', disabled: true });
    }
  
    // If the first week doesn't start with Monday, shift the days to the next week
    if (firstDay !== 1) {
      const firstWeek = weeks.shift();
      const lastWeek = weeks[weeks.length - 1];
      lastWeek.splice(0, 7 - firstWeek.length, ...firstWeek);
      weeks.unshift(lastWeek);
    }
  
    return weeks;
  };
  const getDaysInMonth = (month, year) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Day of the week of the first day (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const lastDateOfMonth = new Date(year, month, 0).getDate(); // Last day of the month
    let currentDate = 1; // Start from the 1st day of the month

    // Calculate the starting index of the week, where 0 is Monday and 6 is Sunday
    let startingIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Fill the days before the first Monday with the day names
    for (let i = 0; i < startingIndex; i++) {
      const dayName = new Date(year, month - 1, i - startingIndex + 1).toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ day: dayName, date: '', isWeekend: false });
    }

    // Fill the days of the month
    while (currentDate <= lastDateOfMonth) {
      const dayName = new Date(year, month - 1, currentDate).toLocaleDateString('en-US', { weekday: 'short' });
      const isWeekend = dayName === 'Sat' || dayName === 'Sun';
      days.push({ day: dayName, date: currentDate, isWeekend });
      currentDate++;
    }

    // Fill the remaining days of the week if necessary
    while (days.length % 7 !== 0) {
      const dayName = new Date(year, month - 1, currentDate).toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ day: dayName, date: '', isWeekend: false });
      currentDate++;
    }

    return days;
};
const handleAddMore=()=> {
  navigate('/employee-details');
}


const handleAddNew=()=>{
  navigate('/client-details');
};


  // Your client select change handler

const handleAddNewProject=()=>{
  navigate('/project-details');
}
const handleEmployeeSelectChange = (e) => {
  const selectedEmployee = e.target.value;
  if (selectedEmployee === 'add-new') {
    handleAddMore();
  } else {
    setFormData(prevState => ({
      ...prevState,
      employee: selectedEmployee,
    }));
  }
};

const handleClientSelectChange = (e) => {
  const selectedClient = e.target.value;
  if (selectedClient === 'add-new') {
    handleAddNew();
  } else {
    setFormData(prevState => ({
      ...prevState,
      client: selectedClient,
    }));
  }
};

const handleProjectSelectChange = (e) => {
  const selectedProject = e.target.value;
  if (selectedProject === 'add-new') {
    handleAddNewProject();
  } else {
    setFormData(prevState => ({
      ...prevState,
      project: selectedProject,
    }));
  }
};


// Function to handle input change for hours
const handleHourChange = (e, index) => {
  const newHours = [...hours];
  newHours[index] = e.target.value;
  setHours(newHours);
};

// Function to handle input change for task description
const handleTaskDescriptionChange = (e, index) => {
  const newTaskDescription = [...taskDescription];
  newTaskDescription[index] = e.target.value;
  setTaskDescription(newTaskDescription);
};

// Function to render the form for entering hours and task description based on the paymentFrequency
const renderBillTypeForm = () => {
  if (formData.paymentFrequency === 'Hourly') {
    // Render form for hourly payment frequency
    return (
      <div>
        {daysInMonth.map((day, index) => (
          <div key={index}>
            <input
              type="text"
              value={hours[index] || ''}
              onChange={(e) => handleHourChange(e, index)}
              placeholder={`Worked hours for day ${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  } else if (formData.paymentFrequency === 'Day') {
    // Render form for daily payment frequency
    return (
      <div>
        {daysInMonth.map((day, index) => (
          <div key={index}>
            <textarea
              value={taskDescription[index] || ''}
              onChange={(e) => handleTaskDescriptionChange(e, index)}
              placeholder={`Work done for day ${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

const renderSelectedTimesheetForm = () => {
  if (selectedTimesheet) {
    return (
      <div>
        {/* Render other details */}
        <table>
          <tbody>
            {/* Other details */}
            {/* Render worked hours */}
            {selectedTimesheet.paymentFrequency === 'Hourly' && selectedTimesheet.hours && (
              <tr>
                <th>Worked Hours:</th>
                <td>
                  {selectedTimesheet.hours.map((hour, index) => (
                    <div key={index}>
                      <span>{`Day ${index + 1}: ${hour}`}</span>
                    </div>
                  ))}
                </td>
              </tr>
            )}
            {/* Render work done descriptions */}
            {selectedTimesheet.paymentFrequency === 'Day' && selectedTimesheet.taskDescription && (
              <tr>
                <th>Work Done:</th>
                <td>
                  {selectedTimesheet.taskDescription.map((description, index) => (
                    <div key={index}>
                      <span>{`Day ${index + 1}: ${description}`}</span>
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => setShowEmployeeDetails(false)}>Close</button>
      </div>
    );
  }
  return null;
};
const calculateTotalHours = (hours) => {
  let totalHours = 0;
  if (hours && hours.length > 0) {
    hours.forEach(hour => {
      totalHours += parseFloat(hour) || 0;
    });
  }
  return totalHours;
};
 

  return (
    <div className="Timesheetcontainer">
      
      <h4 style={{color:'black'}}>Timesheet</h4>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
          <tr>
              
                <td>Employee:</td>
                <td>
                <select id="employee" name="employee" onChange={handleEmployeeSelectChange} value={formData.employee}>
  <option value="">Select</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  {employeeOptions.map((employee, index) => (
    <option key={index} value={employee}>{employee}</option>
  ))}
  <option value="add-new">Add New</option>
</select>

                </td>
                </tr>
            <tr>
              <td>Client:</td>
              <td>
              <select id="client" name="client" placeholder="Select Client" onChange={handleClientSelectChange} value={formData.client}>
  <option value="">Select</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  
  {clientOptions.map((client, index) => (
    <option key={index} value={client}>{client}</option>
  ))}
  <option value="add-new">Add New</option>
</select>

              </td>
            </tr>
            <tr>
              <td>Project:</td>
              <td>
              <select id="project" name="project" placeholder="Select Project" onChange={handleProjectSelectChange} value={formData.project}>
  <option value="">Select</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  
  {projectOptions.map((project, index) => (
    <option key={index} value={project}>{project}</option>
  ))}
  <option value="add-new">Add New</option>
</select>

              </td>
            </tr>
            <tr>
              <td>Period:</td>
              <td>
                <div className="period-input">
                <select name="month" value={formData.month} onChange={(e) => handleInputChange(e, 'month')}>
  

                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <span className="separator"></span>
                  <input
  type="number"
  name="year"
  placeholder="Year"
  value={formData.year}
  onChange={(e) => handleInputChange(e, 'year')}
/>

                </div>
              
            {formData.month && formData.year && (
              <tr>
                <td>Bill Type:</td>
                <td>
                  <div className="frequency-input">
                  <select value={formData.paymentFrequency} onChange={handleFrequencyChange}>
  <option value="">Select</option>
  <option value="Hourly">Hourly</option>
  <option value="Day">Day</option>
</select>

                  </div>
                </td>
              </tr>
            )}
            </td>
            </tr>
            

  

          
            {formData.month && formData.year && formData.paymentFrequency === 'Hourly' && (
           
              <tr>
                <td colSpan="2" className="hourly-description">
                  <p>Worked hours for each day:</p>
                  <div className="calendar">
                    {daysInMonth.map((day, index) => (
                      <div key={index} className="day">
                        {day.date !== '' && (
                          <React.Fragment>
                            <div  className={`day-name${day.isWeekend ? ' weekend' : ''}`}>{day.day}</div>
                            <div className={`date${day.isWeekend ? ' weekend' : ''}`}>{day.date}</div>
                            <input type="text" placeholder="Hours" />
                            {/* Description input for each day */}
                            <div className="day-description">
                              <textarea
                                className="description-input"
                                placeholder="Work done"
                                rows="4"
                                cols="30"
                              />
                            </div>
                          </React.Fragment>
                        )}
                        {day.date === '' && (
                          <div className="day-name disabled">{day.day}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
            
            {formData.month && formData.year && formData.paymentFrequency === 'Day' && (
             
              <tr>
                <td colSpan="2" className="day-description">
                  <p>All dates and days in the month:</p>
                  <div className="calendar" >
                    {daysInMonth.map((day, index) => (
                      <div key={index} className="day"style={{backgroundColor:'white', width:'120px'}} >
                        {day.date !== '' && (
                          <React.Fragment>
                            <div className={`day-name${day.isWeekend ? ' weekend' : ''}`}>{day.day}</div>
                            <div className={`date${day.isWeekend ? ' weekend' : ''}`}>{day.date}</div>
                            <div className="input-container small" style={{ width: '163.5px', marginLeft: '-20px' }}>
                            <label>Clock In Time :</label>
                            <input type="time" className="small"  />
                            </div>

                            <div className="input-container small" style={{width:'163.5px', marginLeft:'-25px'}}  >
                              <label >Clock Out Time:</label>
                              <input type="time" className="small"  />
                            </div>
                            <div className="input-container small"  >
                              <label>Status:</label>
                              <select className="small" >
                                <option value="fullDay">Full Day</option>
                                <option value="halfDay">Half Day</option>
                                <option value="leave">Leave</option>
                                <option value="holiday">Holiday</option>
                              </select>
                            </div>
                            <div className="input-container small" >
                              <label >Work/Reason:</label>
                              <input type="text" className="small"  />
                            </div>
                          </React.Fragment>
                        )}
                        {day.date === '' && (
                          <div className="day-name disabled small">{day.day}</div>
                        )}
                        {/*{index > 0 && index % 7 === 0 && (
                          <div className="input-container small" >
                            <label >Description:</label>
                            <textarea 
                              className="description-input small"
                              placeholder="Work done"
                              rows="2"
                              cols="20"
                            />
                        </div>
                        )}*/}
    
                      </div>
                    ))}
                  </div>
                  <div className="month-description small">
                    <textarea
                      className="description-input"
                      placeholder="Overall work done for the month"
                      rows="3"
                      cols="20"
                    />
                  </div>
                  
                </td>
              </tr>
            )}
            


            <tr>
              <td>Attach Approved Timesheets:</td>
              <td>
                
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
                        style={{width:'40px', marginLeft:'10px'}}
                        onClick={() => removeAdditionalAttachment(index, 'AttachTimesheet_additional')}
                      >
                        &#10006;
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  style={{width:'80px', marginLeft:'10px'}}
                  onClick={() => addAdditionalAttachmentInput('AttachTimesheet_additional')}
                >
                  Add More
                </button>
              </td>
            </tr>
            {/* Other form inputs */}
          </tbody>
        </table>
        {/*<button type="submit">{editIndex !== null ? 'Save Entry' : 'Submit'}</button>*/}
        <button onClick={handleAddToCreate} style={{width:'25%', marginLeft:'400px'}}>Create</button>
      </form>

      {/* Timesheet Entries */}
      {/*<div>
  <h4>Timesheet Entries</h4>
  <table>
    <thead>
      <tr>
        <th>Employee Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {timesheets.map((timesheet, index) => (
              <tr key={index}>
                <td onClick={() => handleEmployeeClick(index)}>{timesheet.employee}</td>
                <td>
                <button onClick={() => handleEdit(index)}><i className="fa fa-pencil-square-o"></i></button>
                  <button onClick={() => handleDelete(index)}><i className="fa fa-trash"></i></button>
                </td>
              </tr>
            ))}
    </tbody>
  </table>
    </div>*/}

{/* Employee Details Form */}
{/*// Selected Timesheet Details Form*/}
{/* Selected Timesheet Details Form */}
{selectedTimesheet && showEmployeeDetails && (
  <div className="EmployeeDetailsForm">
    <h4>Employee Details</h4>
    <table>
      <tbody>
        <tr>
          <td>Employee:</td>
          <td>{selectedTimesheet.employee}</td>
        </tr>
        <tr>
          <td>Client:</td>
          <td>{selectedTimesheet.client}</td>
        </tr>
        <tr>
          <td>Project:</td>
          <td>{selectedTimesheet.project}</td>
        </tr>
        <tr>
          <td>Period:</td>
          <td>{`${getMonthName(selectedTimesheet.month)} ${selectedTimesheet.year}`}</td>
        </tr>
        <tr>
          <td>Bill Type:</td>
          <td>{selectedTimesheet.paymentFrequency}</td>
        </tr>
        <tr>
          <th>Attach Approved Timesheets:</th>
          <td>{selectedTimesheet.AttachTimesheet}</td>
        </tr>
        {/* Additional attachment details */}
        {selectedTimesheet.additionalAttachment.AttachTimesheet_additional.map((attachment, index) => (
          <tr key={index}>
            <th>Additional Attachment {index + 1}:</th>
            <td>{attachment}</td>
          </tr>
        ))}
        {/* Display hours and work done based on paymentFrequency */}
        {/* Display hours and work done based on paymentFrequency */}
        {selectedTimesheet.paymentFrequency === 'Hourly' && selectedTimesheet.hours && (
  <tr>
    <th>Worked Hours:</th>
    <td>
      {selectedTimesheet.hours.map((hour, index) => (
        <div key={index}>
          <span>{`Day ${index + 1}: ${hour}`}</span>
        </div>
      ))}
      <div>Total Hours: {calculateTotalHours(selectedTimesheet.hours)}</div>
    </td>
  </tr>
)}
 {selectedTimesheet.paymentFrequency === 'Day' && selectedTimesheet.taskDescription && (
  <tr>
    <th>Work Done:</th>
    <td>
      {selectedTimesheet.taskDescription.map((description, index) => (
        <div key={index}>
          <span>{`Day ${index + 1}: ${description}`}</span>
        </div>
      ))}
    </td>
  </tr>
 )}

      </tbody>
    </table>
    <button onClick={() => setShowEmployeeDetails(false)}>Close</button>
  </div>
 )}


  </div>
  );
};

export default Timesheet;
