import React, { useState } from 'react';
import './App.css'; 
import Client from './Client';
import Project from './Project';
import Employee from './Employee';
import Timesheet from './Timesheet';
import Invoice from './Invoice';
import Vendor from './vendor';
import Home from './Home';
import OnBenchEmployees from './OnBenchEmployees';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import Profile from './Profile';
import About from './About';
import VendorDetails from './VendorDetails';
import Timesheets from './Timesheets';
import Invoices from './Invoices';
import EmployeeManagement from './EmployeeManagement';
import Sales from './Sales';
import Prospects from './Prospects';
import InProcess from './InProcess';
import Sold from './Sold';
import ProductPage from './ProductPage';
import Purchase from './Purchase';

const Dashboard = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      // Refresh the active menu by changing the refreshKey
      setRefreshKey(prevKey => prevKey + 1);
    } else {
      setActiveMenu(menu);
      setMenuOpen(true);
    }
  };

  const handleLogOut = () => {
    navigate('/first-page');
  };

  const handleMenuBarClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setActiveMenu(false);
    } else {
      setMenuOpen(true);
    }
  };

  const renderComponent = () => {
    switch (activeMenu) {
      case 'client':
        return <Client />;
      case 'project':
        return <Project />;
      case 'employee':
        return <Employee />;
      case 'timesheets':
        return <Timesheets />;
      case 'invoices':
        return <Invoices />;
      case 'onbenchemployees':
        return <OnBenchEmployees />;
      case 'vendordetails':
        return <VendorDetails />;
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
        case 'sales':
        return <Sales />;
      case 'productpage':
        return <ProductPage />;
        case 'purchase':
        return <Purchase />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container" >
      

      <div className={`sidebar ${menuOpen ? 'open' : ''}`} style={{height:'100%'}}>
        <div className="sidebar-header" onClick={handleMenuBarClick} >
          <i className="fas fa-bars"></i>
        </div>

        {menuOpen && (
          <div className="sidebar-menu" style={{height:'100%'}}>
            <div className="menu-item" onClick={() => handleMenuClick('employee')}>
              <i className="fas fa-users"></i> <div style={{marginLeft:'2%'}}>EMPLOYEES</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('project')}>
              <i className="fas fa-project-diagram"></i> <div style={{marginLeft:'4%'}}> PROJECTS</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('client')}>
              <i className="fas fa-user-tie"></i><div style={{marginLeft:'6.5%'}}> CLIENTS</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('vendordetails')}>
              <i className="fas fa-address-book"></i> <div style={{marginLeft:'5%'}}>SUPPLIERS</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('timesheets')}>
              <i className="fas fa-user-clock"></i> <div style={{marginLeft:'0%'}}>TIMESHEETS</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('invoices')}>
              <i className="fas fa-receipt"></i>   <div style={{marginLeft:'8%'}}>INVOICES </div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('productpage')}>
              <i className="fas fa-suitcase"></i> <div style={{marginLeft:'5.5%'}}>PRODUCTS / SERVICES</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('sales')}>
              <i className="fas fa-poll"></i> <div style={{marginLeft:'10%'}}> SALES</div>
            </div>
            <div className="menu-item" onClick={() => handleMenuClick('purchase')}>
              <i className="fab fa-google-wallet"></i> <div style={{marginLeft:'8%'}}> PURCHASE</div>
            </div>
            <div className="menu-item" >
              <i className=""></i> <div style={{marginLeft:'10%'}}> </div>
            </div>
             <div className="menu-item">
              <i className=""></i> <div style={{marginLeft:'10%'}}></div>
            </div>
            
            
          </div>
        )}
      </div>
    

      
      <div className="topnavs">  
  <div onClick={() => handleLogOut('logout')}>
    <a href="first-page">
      <i className="fa fa-sign-out"></i> Log out
    </a>
  </div>
  {renderComponent()}
</div>
<div className="welcome-dashboard">
        <h1 style={{ color: '#f3811d', fontSize: '40px', textAlign: 'center' }}>Welcome To Elint Pro Solutions</h1>
        <p style={{ textAlign: 'center' }}>Empower Your decisions With data Driven InSights</p>
        <div className="company-dashboard">
          <p>ELINT PRO is a dedicated IT services company that offers niche solutions to its customers. We specialize in providing product-based solutions, IT services, and staffing.</p>
          <p>Our mission is to facilitate our clients' growth through innovative solutions and exceptional service delivery.</p>
          <p>Contact us today to explore how we can support your business goals!</p>
        </div>
        
        </div>

    </div>
  );
};

export default Dashboard;




