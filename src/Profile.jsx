import React, { useState } from 'react';
import './App.css';

const Profile = ({ username, onLogout, setUsername, setPassword }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeUsername = () => {
    setUsername(newUsername);
    alert(`Username changed to: ${newUsername}`);
    setNewUsername('');
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      setPassword(newPassword);
      alert('Password changed');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="profile-container" style={{marginTop:'100px'}}>
      <div>
        <h2>USER DETAILS:</h2>
      </div>
      <div>
        <h3>Username:</h3>
        <input
          type="text"
          placeholder="Email"
          value={newUsername}
          onChange={handleUsernameChange}
        />
        <button onClick={handleChangeUsername}> Reset</button>
      </div>
      <div>
        <h3>Change Password:</h3>
        
        <input
          type="passcode/otp"
          placeholder="OTP"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div className="topnav" style={{height:'60px', backgroundColor:'#183b53', position:'fixed', marginLeft:'-60px'}}>
    <div style={{position:'fixed'}}>
    <img
      src="https://www.elintpros.com/assets/img/elintpro_logo.png"
      alt="Company's Logo"
      className="logos"
      style={{
        backgroundColor: 'white', // Set background color
        width: '100px', // Set width
        height: '200px',
        border: '4px solid white',
        borderRight: '20px solid white',
        borderLeft: '20px solid white',
        borderBottom: '5px solid white',
        borderTop: '5px solid white',
        marginLeft: '15px' // Set height
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
  );
};

export default Profile;
