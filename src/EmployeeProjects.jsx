import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeProjects = () => {
  const navigate = useNavigate(); // Initialize navigate function for navigation

  const handleProjectViewChange = (view) => {
    if (view === 'active') {
      navigate('/active-projects'); // Navigate to Active Projects page
    } else if (view === 'inactive') {
      navigate('/inactive-projects'); // Navigate to Inactive Projects page
    }
  };

  return (
    <div sty>
       
      <div className="project-navigation" style={{width:'35%',marginLeft:'250px',  marginTop:'20px', borderTop:'2px solid black'}}>
      <h4>Select the below buttons to view</h4>
        <button className="project-nav-button" onClick={() => handleProjectViewChange('active')} style={{ backgroundColor: '#f44336' }}>Active Projects</button>
        <button className="project-nav-button" onClick={() => handleProjectViewChange('inactive')} style={{ backgroundColor: '#f44336' }}>Inactive Projects</button>
      </div>
    </div>
  );
};

export default EmployeeProjects;
