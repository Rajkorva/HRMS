import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import LoginPage from './Loginpage'; // Corrected import statement
import Dashboard from './Dashboard';
import EmployeeDetails from './EmployeeDetails';
import AdditionalDetails from './AdditionalDetails';
import ProjectDetails from './ProjectDetails';
import BenchedEmployees from './BenchedEmployees';
import ClientDetails from './ClientDetails';
import OnBenchEmployees from './OnBenchEmployees';
import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';
import Profile from './Profile';
import Contact from './Contact';
import SignUp from './SignUp';
import ActiveEmployees from './ActiveEmployees';
import BenchEmployees from './BenchEmployees';
import TerminatedEmployees from './TerminatedEmployees';
import About from './About';
import LogOut from './LogOut';
import Employee from './Employee';
import ActiveClients from './ActiveClients';
import InActiveClients from './InActiveClients';
import W2FullTime from './W2FullTime';
import W2PartTime from './W2PartTime';
import Contract from './Contract';
import _1099 from './1099'; // Corrected import statement
import VendorList from './VendorList';
import ActiveProjects from './ActiveProjects';
import InActiveProjects from './InActiveProjects';
import ActiveVendors from './ActiveVendors';
import InActiveVendors from './InActiveVendors';
import TimesheetDetails from './TimesheetDetails';
import Timesheets from './Timesheets';
import Timesheet from './Timesheet';
import InvoiceList from './InvoiceList';
import Invoices from './Invoices'; // Ensure correct path
import EmployeeManagement from './EmployeeManagement';
import Payment from './Payment';
import PaymentPreview from './PaymentPreview'
import InProcess from './InProcess';
import Sold from './Sold';
import Prospects from './Prospects';
import SoldSheet from './SoldSheet';
import ProductPage from './ProductPage';
import Purchase from './Purchase';
import EmployeePay from './EmployeePay';
import TaxDeductions from './TaxDeductions';
import BankDetails from './BankDetails';
import EmployeeProjects from './EmployeeProjects';
import InvoicesandBills from './InvoicesandBills';
import EmployeeData from './EmployeeData';
import { useMediaQuery } from 'react-responsive';



const App = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/first-page" element={<FirstPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/bench-employees" element={<BenchEmployees />} />
          <Route path="/terminated-employees" element={<TerminatedEmployees />} />
          <Route path="/active-employees" element={<ActiveEmployees />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/employee-details" element={<EmployeeDetails />} />
          <Route path="/additional-details" element={<AdditionalDetails />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/client-details" element={<ClientDetails />} />
          <Route path="/on-bench-employees" element={<OnBenchEmployees />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/invoice-details" element={<InvoiceDetails />} />
          <Route path="/benched-employees" element={<BenchedEmployees />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/active-clients" element={<ActiveClients />} />
          <Route path="/w2-full-time" element={<W2FullTime />} />
          <Route path="/w2-part-time" element={<W2PartTime />} />
          <Route path="/1099" element={<_1099 />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/vendor-list" element={<VendorList />} />
          <Route path="/inactive-clients" element={<InActiveClients />} />
          <Route path="/inactive-projects" element={<InActiveProjects />} />
          <Route path="/active-projects" element={<ActiveProjects />} />
          <Route path="/active-vendors" element={<ActiveVendors />} />
          <Route path="/inactive-vendors" element={<InActiveVendors />} />
          <Route path="/timesheet-details" element={<TimesheetDetails />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/timesheet" element={<Timesheet />} />
          <Route path="/invoice-list" element={<InvoiceList />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-preview" element={<PaymentPreview />} />
          <Route path="/prospects" element={<Prospects />} />
          <Route path="/in-process" element={<InProcess />} />
          <Route path="/sold" element={<Sold />} />
          <Route path="/sold-sheet" element={<SoldSheet />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/employee-pay" element={<EmployeePay />} />
          <Route path="/tax-deductions" element={<TaxDeductions />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/employee-projects" element={<EmployeeProjects />} />
          <Route path="/invoices-and-bills" element={<InvoicesandBills />} />
          <Route path="/employee-data" element={<EmployeeData />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
      <div>
      {isDesktopOrLaptop }
      {isTabletOrMobile }
    </div>
    </Router>
    
  );
};

export default App;
