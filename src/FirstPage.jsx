import React from 'react';
import './App.css'; // Import CSS for styling

const handleSave = () => {
  // Your save logic here
};

const FirstPage = () => {
  return (
    <div className="topnav" style={{width:'99%'}}>
      <div >
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
      <div className="welcome-text">
        <h1>Welcome to ELINT  PRO</h1>
        <div>
        
        <div className="Main" style={{display:'flex', flexDirection:'row'}}>
          <p style={{marginTop:'17.5px'}}>ELINT PRO is a dedicated IT services company that offers niche solutions to its customers. ELINT PRO was established with a core business of providing product-based solutions, IT services, and staffing.</p>
        
          <img src="https://www.elintpros.com/assets/img/about_us.jpg" alt="" style={{width:'12.25%', height:'10%'}} />
        </div>
        </div>
        <div className="Dots" style={{display:'flex', flexDirection:'row'}}>
          <p style={{width:'75%'}}>We find our success in our client’s and employee’s organic growth.</p>
          <p style={{width:'75%'}}>We map opportunities with the best talent.</p>
          <p style={{width:'75%'}}>Looking forward to establishing in 50 countries.</p>
        </div>
        
        <div>
  <h1>Our Services</h1>
  <p>We are Specialist & We Map the Opportunities with the best talent</p>
  <div className="FirstContainer">
  <div className="card-body">
      <img src="https://www.elintpros.com/assets/img/it.jpg" />
      <ul><a href="https://www.elintpros.com/it-solutions.html">IT Solutions</a></ul>
    </div>
    <div className="card-body" >
      <img src="https://www.elintpros.com/assets/img/staff.jpg"  />
      <ul><a href="https://www.elintpros.com/staffing-services.html">Staffing Services</a></ul>
    </div>
   
    <div className="card-body">
      <img src="https://www.elintpros.com/assets/img/training.jpg" />
      <ul><a href="https://www.elintpros.com/corporate-training.html">Corporate Training</a></ul>
    </div>
  </div>
</div>
<div>
<h1>Gain a Success With Us!</h1>
<h2>Doing the Right Thing | At the Right Time</h2>
<p>ELINT PRO is a dedicated IT services company that offers niche solutions to its customers</p>
<ul style={{alignContent:'center', marginLeft:'40%'}}><a href="sign-up">Join With Us</a></ul>
</div>
<div class="card-contents">
<div class="card-section">
    <h2 style={{color: '#7eb5d7' }}>Useful Links</h2>
    <div style={{direction:'flex', flexDirection:'column'}}>
    <a href="first-page" >Home</a>
    <br/>
    <a href="about" style={{marginRight:'135px'}}>About Us</a>
    <br/>
    <a href="contact">Contact Us</a>
    <br/>
    <a href="" style={{marginRight:'135px'}}>Product</a>
    </div>
  </div>
  <div class="card-section" >
    <h2 style={{color: '#7eb5d7'}}>Our Services</h2>
    <a href="https://www.elintpros.com/staffing-services.html">Staffing Services</a>
    <a href="https://www.elintpros.com/corporate-training.html" style={{marginRight:'-20px'}}>Corporate Training and Support</a>
    <a href="https://www.elintpros.com/it-solutions.html">IT Solutions</a>
  </div>
  <div class="card-section">
    <h2 style={{color: '#7eb5d7'}}>Address</h2>
    <h3 style={{color:'black'}}>ELINT PRO SOLUTIONS - U.S.A</h3>
    <p>136 Waxhaw Parkway, Suite E-109, Waxhaw, NC - 28173</p>
    <p>931-567-1785 | hr@elintpros.com</p>
    <h3 style={{color:'black'}}>(DBA) ELINT VISTAS PVT LTD - INDIA</h3>
    <p>1st Floor B Block, 6-54/E/1554-56/103 Elite Commercial Building, Pragathi Nagar, Hyderabad - 500090</p>
    <p>9676-212-680 | hr@elintvista.com</p>
  </div>
</div>
</div>
<div className="container my-5">
      {/* Footer */}
      <footer className="text-center text-lg-start text-white">
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Content */}
          <section className="footer-content">
            {/* Column 1 */}
            <div className="section">
              <h1>Gain Success With Us!</h1>
              <h2>Doing the Right Thing | At the Right Time</h2>
              <p>ELINT PRO is a dedicated IT services company that offers niche solutions to its customers</p>
              <ul>
                <li><a href="sign-up">Join With Us</a></li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="section">
              {/* Card contents */}
              <div className="card-contents">
                {/* Card section 1 */}
                <div className="card-section">
                  <h2>Useful Links</h2>
                  <ul>
                    <li><a href="first-page">Home</a></li>
                    <li><a href="about">About Us</a></li>
                    <li><a href="contact">Contact Us</a></li>
                    <li><a href="">Product</a></li>
                  </ul>
                </div>
                {/* Card section 2 */}
                <div className="card-section">
                  <h2>Our Services</h2>
                  <a href="https://www.elintpros.com/staffing-services.html">Staffing Services</a><br />
                  <a href="https://www.elintpros.com/corporate-training.html">Corporate Training and Support</a><br />
                  <a href="https://www.elintpros.com/it-solutions.html">IT Solutions</a>
                </div>
                {/* Card section 3 */}
                <div className="card-section address">
                  <h2>Address</h2>
                  <h3>ELINT PRO SOLUTIONS - U.S.A</h3>
                  <p>136 Waxhaw Parkway, Suite E-109, Waxhaw, NC - 28173</p>
                  <p>931-567-1785 | hr@elintpros.com</p>
                  <h3>(DBA) ELINT VISTAS PVT LTD - INDIA</h3>
                  <p>1st Floor B Block, 6-54/E/1554-56/103 Elite Commercial Building, Pragathi Nagar, Hyderabad - 500090</p>
                  <p>9676-212-680 | hr@elintvista.com</p>
                </div>
              </div>
            </div>
          </section>
          {/* End of Section: Content */}

          <hr className="my-3" />

          {/* Section: Copyright */}
          <section className="footer-content">
            {/* Column 1 */}
            <div className="section copyright">
              <div className="p-3">
                © 2020 Copyright:
                <a href="https://mdbootstrap.com/" className="text-white">MDBootstrap.com</a>
              </div>
            </div>
            {/* Column 2 */}
            <div className="section social-buttons">
              {/* Social buttons */}
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-twitter"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-google"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-instagram"></i></a>
            </div>
            {/* End of Column 2 */}
          </section>
          {/* End of Section: Copyright */}
        </div>
        {/* End of Grid container */}
      </footer>
      {/* End of Footer */}
    </div>
    </div>
  );
}

export default FirstPage;
