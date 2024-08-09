import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Vendor from './vendor';

const VendorDetails = () => {
  const location = useLocation();
  const initialState = location.state && location.state.employees ? location.state : { employees: [] };
  const [employees, setEmployees] = useState(initialState.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showVendor, setShowVendor] = useState(false);
  const [showVendorList, setShowVendorList] = useState(false);
  const [showActiveVendors, setShowActiveVendors] = useState(false);
  const [showInActiveVendors, setShowInActiveVendors] = useState(false);
  const navigate = useNavigate();

  const handleVendorClick = () => {
    setShowVendor(prevState => !prevState); // Toggle the state
  };

  const handleVendorListClick = () => {
    setShowVendorList(!showVendorList);
    setShowVendor(false); // Close client details
  };

  const handleActiveVendorsClick = () => {
    navigate('/active-vendors');
  };

  const handleInActiveVendorsClick = () => {
    navigate('/inactive-vendors');
  };

  return (
    <div className="ClientContainer">
      <div>
        <div className="menu-items" onClick={handleVendorClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-user-plus"style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Add Vendor
        </div>
        {showVendor && <Vendor />}
        <div className="menu-items" onClick={handleVendorListClick} style={{width:'60%', alignItems:'start'}}>
          <i className="fas fa-users" style={{marginLeft:'150px', marginBottom:'-17.5px'}}></i> Vendors List
        </div>
        {showVendorList && (
          <>
            <div className="submenu-items" onClick={handleActiveVendorsClick} style={{width:'61.5%', alignItems:'start'}}>
              <i className="fas fa-toggle-on" style={{marginLeft:'165px', marginBottom:'-17.5px'}}></i> Active Vendors
            </div>
            <div className="submenu-items" onClick={handleInActiveVendorsClick} style={{width:'61.5%', alignItems:'start'}}>
              <i className="fas fa-toggle-off" style={{marginLeft:'165px', marginBottom:'-17.5px'}}></i> InActive Vendors
            </div>
          </>
        )}
        {showActiveVendors && (
          <div>
            <h3>Active Clients Form</h3>
            {/* Your Active List Form */}
          </div>
        )}
        {showInActiveVendors && (
          <div>
            <h3>InActive Clients Form</h3>
            {/* Your Bench List Form */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDetails;
