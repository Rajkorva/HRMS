import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

 {/*const handleLogin = (event) => {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.email && password === storedUser.password) {
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };*/}

  const handleLogin = (event) => {
    navigate('/dashboard')
  };
  const handleForgotPassword = () => {
    navigate('/profile');
  };

  const handleSignIn = () => {
    navigate('/sign-up');
  };

  const handleCheckboxChange = () => {
    setRemember(!remember);
  };

  return (
    <div className="headersection" style={{ height: '494.5px', marginTop:'60px' }}>
      <div className="left">
        <div className="title">
          <h1 style={{marginRight: '550px', marginBottom: '-40px', marginTop: '154.50px'}}>
            <span style={{color: '#060f41'}}>ELINT</span>
            <span style={{color: '#f3811d'}}> PRO</span>
          </h1>
          <h6 style={{ marginLeft: '-20px' }}>
            (Enter Username and Password To Log-In)
          </h6>
        </div>
      </div>
      <center className="idd" style={{marginLeft:'500px', marginTop:'-300px'}}>
        <h2 style={{ color: 'black' }}>Sign in</h2>
        <form className="idd1" onSubmit={handleLogin}>
          <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <i className="fa fa-key icon"></i>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="idd2" type="submit" style={{ backgroundColor:' var(--primary-bg-color)'}}>Login</button>
          <div className="input-containers" style={{ color: 'black' }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={handleCheckboxChange}
              name="remember"
            />
            Remember 
          </div>
        </form>
        <div className="container">
          <button type="button" onClick={handleSignIn} className="contactbtn">Sign Up</button>
          <span className="psw" onClick={handleForgotPassword}>Forgot <a href="#">password?</a></span>
        </div>
      </center>
      <div className="topnav" style={{height:'60px', backgroundColor:'#183b53', position:'fixed', marginLeft:'10px'}}>
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

export default LoginPage;
