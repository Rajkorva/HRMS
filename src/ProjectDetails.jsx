import React, { useState } from 'react';
import './App.css';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
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
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const navigate = useNavigate();

  const billingRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth']; // Available billing rates

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleAddToActive = () => {
    navigate('/active-projects', { state: { projects: [...projects, formData] } });
  };

  const handleAddToInActive = () => {
    navigate('/inactive-projects', { state: { projects: [...projects, formData] } });
  };
  const handleCurrencyChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="ProjectDetails">
      <h5>Project Details  {index}</h5> {/* Display the index from URL parameters */}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Project Name:</td>
              <td>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Project Manager:</td>
              <td>
                <input
                  type="text"
                  name="projectManager"
                  value={formData.projectManager}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Start Date:</td>
              <td>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>End Date:</td>
              <td>
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="currency">
          <td>Currency:</td>
          <td>
          <select 
            name="currency" 
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="$">USD</option>
            <option value="€">EUR</option>
            <option value="£">GBP</option>
            <option value="¥">JPY</option>
            <option value="₹">INR</option>
          </select>
          </td>
</tr>
          </tbody>
        </table>
        {/*<button type="submit">{isEditing ? 'Save' : 'Add Project'}</button>*/}
        <button onClick={handleAddToActive}>Add To Active List</button>
        {/*<button onClick={handleAddToInActive}>Add to Inactive List</button>*/}
      </form>
      {/*<div>
       <h4>Projects List</h4>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td onClick={() => handleProjectClick(index)}>{project.projectName}</td>
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
                  </div>*/}
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
            </tbody>
          </table>
      </div>
      )}
    </div>
  );
};

export default ProjectDetails;
