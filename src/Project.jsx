import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const Project = () => {
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showActiveProjects, setShowActiveProjects] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showInActiveProjects, setShowInActiveProjects] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = () => {
    setShowProjectDetails(prevState => !prevState); // Toggle the state
    setShowInvoice(false);
  };
  const handleProjectListClick = () => {
    setShowProjectList(!showProjectList);
    setShowProjectDetails(false); // Close client details
  };

  const handleActiveProjectsClick = () => {
    navigate('/active-projects');
  };

  const handleInActiveProjectsClick = () => {
    navigate('/inactive-projects');
  };

  return (
    
    <div className="ClientContainer">
      <div>
        <div className="menu-items" onClick={handleProjectClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-user-plus" style={{marginLeft:'130px', marginBottom:'-17.5px'}}></i> Add Project
        </div>
        {showProjectDetails && <ProjectDetails />}
        <div className="menu-items" onClick={handleProjectListClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-users" style={{marginLeft:'130px', marginBottom:'-17.5px'}}></i> Project List
        </div>
        {showProjectList && (
          <>
            <div className="submenu-items" onClick={handleActiveProjectsClick}style={{width:'65%', alignItems:'start'}}>
              <i className="fas fa-toggle-on" style={{marginLeft:'175px', marginBottom:'-17.5px'}}></i> Active Projects
            </div>
            <div className="submenu-items" onClick={handleInActiveProjectsClick} style={{width:'65%', alignItems:'start'}}>
              <i className="fas fa-toggle-off" style={{marginLeft:'175px', marginBottom:'-17.5px'}}></i> InActive Projects
            </div>
          </>
        )}
        {showActiveProjects && (
          <div>
            <h3>Active Clients Form</h3>
            {/* Your Active List Form */}
          </div>
        )}
        {showInActiveProjects && (
          <div>
            <h3>InActive Clients Form</h3>
            {/* Your Bench List Form */}
          </div>
        )}
      </div>
    </div>
    
    
  );
};

export default Project;