import React, { useState, useEffect} from 'react';
import './App.css';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const ActiveProjects = () => {
  const { index } = useParams(); // Get the index from the URL parameters

  const [formData, setFormData] = useState({
    projectName: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    billingRate: '',
    perHour: '',
    perWeek: '',
    perDay: ''
  });

  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  

  const billingRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth']; // Available billing rates

  useEffect(() => {
    if (location.state && location.state.projects) {
      setProjects(location.state.projects);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProjects(projects.map((project, i) => (i === editIndex ? formData : project)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setProjects([...projects, formData]);
    }
    setFormData({
      projectName: '',
      projectManager: '',
      startDate: '',
      endDate: '',
      billingRate: '',
      perHour: '',
      perWeek: '',
      perDay: ''
    });
  };

  

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(projects[index]);
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
    if (selectedProject && index === projects.indexOf(selectedProject)) {
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (index) => {
    setSelectedProject(selectedProject === projects[index] ? null : projects[index]);
  };
  const handleAddToInActive = () => {
    navigate('/active-projects', { state: { projects: [...projects, formData] } });
  };

  return (
    <div style={{width:'800px', marginLeft:'12.5%'}}>
        
      <h4 style={{color:'black'}}>Active Projects List</h4>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td  onClick={() => handleProjectClick(index)}>{project.projectName}</td>
              <td>
                {!isEditing && (
                  <>
                    <button onClick={() => handleEdit(index)} style={{width:'60px',marginRight:'10px',borderRadius:'50%'}}><i className="fa fa-pencil-square-o"></i></button>
                    <button onClick={() => handleDelete(index)} style={{width:'60px',borderRadius:'50%'}}><i className="fa fa-trash"></i></button>
                  </>
                )}
              </td>
              <td><label class="switch">
  <input type="checkbox" />
  <span class="slider round"></span>
  <span class="switch-text active-text" style={{top:'16px'}}>Active</span>
  <span class="switch-text inactive-text" style={{top:'16px'}}>InActive</span>
</label>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProject && (
        <div>
          <h4>Selected Project Details</h4>
          <table>
            <tbody>
              <tr>
                <td>Project Name:</td>
                <td>{selectedProject.projectName}</td>
              </tr>
              <tr>
                <td>Project Manager:</td>
                <td>{selectedProject.projectManager}</td>
              </tr>
              <tr>
                <td>Start Date:</td>
                <td>{selectedProject.startDate}</td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td>{selectedProject.endDate}</td>
              </tr>
              {/* Other project details */}
            </tbody>
          </table>
        </div>
      )}
      <button class="inactives-button" onClick={handleAddToInActive}>Add to In-Active List</button>
    </div>
  );
};

export default ActiveProjects;
