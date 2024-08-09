import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SignUp = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [requirement, setRequirement] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Validate password strength
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }

    // Validate passwords match
    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      setErrorMessage('An account with this email already exists.');
      return;
    }

    // Clear any existing error messages
    setErrorMessage('');

    // Store credentials in localStorage
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Show modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Navigate to login page after closing the modal
    navigate('/login-page');
  };

  return (
    <form style={{ border: '1px solid #ccc', display: 'grid', gridTemplateColumns: '1fr', height:'538.5px', width:'100%'}}>
      <div className="signup-container" style={{marginTop:'40px'}}>
        <h1 style={{marginBottom:'-7.5px'}}>Sign Up</h1>
        <p style={{marginBottom:'-10px'}}>(Please fill in this form to create an account.)</p>
        <hr/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',marginLeft:'200px', marginRight:'200px' }}>
          <div>
            <label htmlFor="companyName"><b>Company Name</b></label>
            <input type="text" placeholder="Enter Company Name" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

            <label htmlFor="companyAddress"><b>Company Address</b></label>
            <input type="text" placeholder="Enter Company Address" name="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required />

            <label htmlFor="contactName"><b>Contact Name</b></label>
            <input type="text" placeholder="Enter Your Name" name="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />

            <label htmlFor="contactNumber"><b>Contact Number</b></label>
            <input type="text" placeholder="Contact Number" name="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />

            <label htmlFor="requirement"><b>Requirement</b></label>
            <input type="text" placeholder="Enter Your Requirements" name="requirement" value={requirement} onChange={(e) => setRequirement(e.target.value)} required />
          </div>

          <div style={{marginRight:'0px'}}>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="psw-repeat"><b>Confirm Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />

            <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms & Privacy</a>.</p>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div className="clearfix">
              <button type="submit" onClick={handleSignUp} className="signupbtn">Sign Up</button>
            </div>
          </div>
        </div>
        <div className="topnav" style={{height:'60px', backgroundColor:'#183b53', position:'fixed', marginLeft:'-30px'}}>
          <div style={{position:'fixed'}}>
            <img
              src="https://www.elintpros.com/assets/img/elintpro_logo.png"
              alt="Company's Logo"
              className="logos"
              style={{
                backgroundColor: 'white',
                width: '100px',
                height: '200px',
                border: '4px solid white',
                borderRight: '20px solid white',
                borderLeft: '20px solid white',
                borderBottom: '5px solid white',
                borderTop: '5px solid white',
                marginLeft: '15px'
              }}
            />
            <a className="active" href="first-page"><i className="fa fa-fw fa-home"></i> Home</a>
            <a href="about"><i className="fa fa-user-o"></i> About</a>
            <a href="#news"><i className="fa fa-briefcase"></i> More About Product</a>
            <a href="contact"><i className="fa fa-fw fa-envelope"></i> Contact</a>
            <a href="login-page"><i className="fa fa-fw fa-user"></i> Log In</a>
            <a href="sign-up"><i className="fa fa-user-plus"></i> Sign Up</a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal} style={{ marginRight:'390px', marginTop:'195px',fontStretch:'extra-expanded'}}>X</span>
            <h2>Account Created</h2>
            <p>Your account has been successfully created.</p> 
            <a href='/login-page' >Click here to Login</a>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUp;
