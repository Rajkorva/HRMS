import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';

const TimesheetDetails = () => {
  const location = useLocation();
  const [timesheets, setTimesheets] = useState([]);
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [reasonForRejection, setReasonForRejection] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState('Approved');
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [invoiced, setInvoiced] = useState('Yes');
  const [formData, setFormData] = useState({
    employee: 'Employee Name', // Set default value for employee
    client: '', // Set default value for client
    project: '',
    month: '',
    year: '',
    paymentFrequency: '',
    AttachTimesheet: '',
    additionalAttachment: { AttachTimesheet_additional: [] },
  });

  useEffect(() => {
    if (location.state && location.state.timesheet) {
      setTimesheets(location.state.timesheet);
    }
  }, [location.state]);

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[parseInt(month) - 1];
  };

  const handleDelete = (index) => {
    const newTimesheets = [...timesheets];
    newTimesheets.splice(index, 1);
    setTimesheets(newTimesheets);
  };

  const handleEmployeeClick = (index) => {
    setSelectedTimesheet(timesheets[index]); // Set selectedTimesheet to the clicked timesheet
    setShowEmployeeDetails(true);
  };

  const handleEdit = (index) => {
    const entry = timesheets[index];
    if (entry) {
      setClient(entry.client);
      setProject(entry.project);
      setMonth(entry.month);
      setYear(entry.year);
      setEmployeeName(entry.employeeName);
      setPaymentFrequency(entry.paymentFrequency);
      setStatus(entry.status);
      setReasonForRejection(entry.reasonForRejection || '');
      setInvoiced(entry.invoiced);
      setFormData({
        ...formData,
        additionalAttachment: { AttachTimesheet_additional: entry.additionalAttachment.AttachTimesheet_additional || [] }
      });
      setEditIndex(index);
      setShowEmployeeDetails(true); // Set showEmployeeDetails to true here
    }
  };

  const handleSearchEmployee = (e) => {
    const { value } = e.target;
    setEmployeeName(value);
  };

  const handleSearchClient = (e) => {
    const { value } = e.target;
    setClient(value);
  };

  const handleSearchMonth = (e) => {
    const { value } = e.target;
    setMonth(value);
  };

  const handleSearchYear = (e) => {
    const { value } = e.target;
    setYear(value);
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatus(value);
    if (value === 'Approved') {
      setInvoiced('Yes');
    } else if (value === 'Rejected') {
      setInvoiced('No');
    }
  };

  const sendEmail = () => {
    const emailContent = `Dear ${employeeName},\n\nYour timesheet has been rejected due to the following reason: ${reasonForRejection}.\n\nRegards,\n[Your Company]`;
    console.log("Email Content:", emailContent);
    alert("Email sent successfully!");
  };

  const handleReject = () => {
    setReasonModalOpen(true);
  };

  const handleCloseModal = () => {
    setReasonModalOpen(false);
  };

  const handleConfirmReject = () => {
    sendEmail();
    setReasonModalOpen(false);
  };

  const handleApproved = (index) => {
    const updatedTimesheets = [...timesheets];
    updatedTimesheets[index].status = 'Approved';
    setTimesheets(updatedTimesheets);
  };

  const handleRejected = () => {
    setStatus('Rejected');
    setInvoiced('No');
  };

  const handleAttachTimesheetClick = (url) => {
    console.log("URL:", url); // Debugging line
    window.open(url, '_blank');
  };
  const calculateTotalHours = (hours) => {
    if (hours && hours.length > 0) {
      return hours.reduce((total, hour) => total + parseFloat(hour || 0), 0);
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div>
        <h4 style={{color:'black'}}>Timesheet Entries</h4>
        <div className='Searchtags'>
          <div>
            <label>Search Employee: </label>
            <input type="text" value={employeeName} onChange={handleSearchEmployee} />
          </div>
          <div>
            <label>Search Client: </label>
            <input type="text" value={client} onChange={handleSearchClient} />
          </div>
          <div>
            <label>Search Period: </label>
            <div className="period-input">
              <select value={month} onChange={handleSearchMonth}>
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
              <input className="period-inputs" type="text" placeholder="Year" value={year} onChange={handleSearchYear} />
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Client</th>
              <th>Project</th>
              <th>Period</th>
              <th>Bill Type</th>
              <th>Attached Timesheet</th>
              <th>worked Hours</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((timesheet, index) => (
              <tr key={index}>
              <td onClick={() => handleEmployeeClick(index)}>{timesheet.employee}</td>
              <td onClick={() => handleEmployeeClick(index)}>{timesheet.client}</td>
              <td onClick={() => handleEmployeeClick(index)}>{timesheet.project}</td>
              <td onClick={() => handleEmployeeClick(index)}>{`${getMonthName(timesheet.month)} ${timesheet.year}`}</td>
              <td onClick={() => handleEmployeeClick(index)}>{timesheet.paymentFrequency}</td>
              <td onClick={() => handleAttachTimesheetClick(timesheet.AttachTimesheet)}>{timesheet.AttachTimesheet}</td>
              <td onClick={() => handleEmployeeClick(index)}>
                {timesheet.hours && timesheet.hours.map((hour, index) => (
                  <div key={index}>
                    <span>{`Day ${index + 1}: ${hour} hours`}</span>
                  </div>
                ))}
                <div>Total Hours: {calculateTotalHours(timesheet.hours)}</div>
              </td>
                <td>{timesheet.status || 'Created'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  {/*<button type="button" className="btn btn-default" onClick={() => handleApproved(index)}>Approve</button>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*{showEmployeeDetails && selectedTimesheet && (
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
                <td>Attached Timesheet:</td>
                <td onClick={() => handleAttachTimesheetClick(selectedTimesheet.AttachTimesheet)}>
                  {selectedTimesheet.AttachTimesheet}
                </td>
              </tr>
              {selectedTimesheet.additionalAttachment &&
                selectedTimesheet.additionalAttachment.AttachTimesheet_additional &&
                selectedTimesheet.additionalAttachment.AttachTimesheet_additional.map((attachment, index) => (
                  <tr key={index}>
                    <td>Additional Attachment {index + 1}:</td>
                    <td onClick={() => handleAttachTimesheetClick(attachment)}>{attachment}</td>
                  </tr>
                ))}
              {selectedTimesheet.paymentFrequency === 'Hourly' && selectedTimesheet.hours && (
  <tr>
    <th>Worked Hours:</th>
    <td>
      {selectedTimesheet.hours.map((hour, index)  => (
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
                  <td>Work Done:</td>
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
          <div className='Status-buttons'>
            <h2>Status</h2>
            <div>
              <button type="button" className="btn btn-primary" onClick={handleReject}>Reject</button>
            </div>
            {reasonModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={handleCloseModal}>&times;</span>
                  <h2>Enter Reason for Rejection</h2>
                  <textarea
                    placeholder="Enter reason..."
                    value={reasonForRejection}
                    onChange={(e) => setReasonForRejection(e.target.value)}
                  />
                  <button onClick={handleConfirmReject}>Send Email</button>
                </div>
              </div>
            )}
          </div>
          <div className="btn-default">
            <h2>Invoiced</h2>
            <button type="button" className="btn btn-default" onClick={handleApproved}>Yes</button>
            <button type="button" className="btn btn-default" onClick={handleRejected}>No</button>
          </div>
        </div>
            )}*/}
    </div>
  );
};

export default TimesheetDetails;
