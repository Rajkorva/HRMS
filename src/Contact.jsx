import React from 'react';
import './App.css'; // Make sure to import the CSS file

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = 'mailto:service@thinkanalytix.com';
  };

  return (
    
    <div className="containerrr" style={{marginTop:'30px', width:'95%', height:'800px'}}>
      <div className="contact-form" style={{width:'100%', marginRight:'70px'}} >
        <div>
          <h2 className="section-heading">We Love to Hear From You</h2>
          <p className="section-paragraph"> * Please call or email using the contact form, and we will be happy to assist you.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Subject.." required />
              </div>
              <div style={{marginLeft:'40px'}}>
                <label htmlFor="fullname" >Full Name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Your Full name.." required style={{width:'200px'}}  />
              </div>
            </div>
            <div className="form-row" >
              <div style={{marginRight:'45px'}}>
                <label htmlFor="email" >Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email.." required />
              </div>
              <div style={{marginLeft:'40px', marginTop:'-6px'}}>
                <label htmlFor="country" style={{marginLeft:'-20px'}}>Country</label>
                <select id="country" name="country" required style={{marginLeft:'-20px'}}>
                <option value="subject">Select Country</option>
                  <option value="india">India</option>
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write something here.." style={{ height: '280px' }} required></textarea>
            <button type="submit" style={{width:'50%', marginLeft:'125px'}}>Submit</button>
          </form>
        </div>
      </div>

      <div className="locations" style={{width:'70%', marginRight:'10px', marginLeft:'-150px'}}>
        <h2 className="section-heading">Our Locations</h2>
        <div className="location">
          <h3>U.S.A</h3>
          <p>136 Waxhaw Parkway,Suite E-109, Waxhaw,<br/> NC - 28173</p>
          <p><a href="mailto:hr@elintpros.com"><i className="fa fa-fw fa-envelope" style={{color:'#fff'}}></i> hr@elintpros.com</a> </p>
          <i class='fas fa-phone'> </i> 931-567-1785
        </div>
        <div className="location">
          <h3>INDIA</h3>
          <p>1st Floor B Block, 6-54/E/1554-56/103 Elite Commercial Building, Pragathi Nagar,<br/> Hyderabad - 500090</p>
          <p><a href="mailto:hr@elintvista.com"><i className="fa fa-fw fa-envelope" style={{color:'#fff'}}></i> hr@elintvista.com</a></p>
          <i class='fas fa-phone'> </i> 9676-212-680
        </div>
        <div className="location">
          <h3>Call Us</h3>
          <p> 931-567-1785</p>
          
        </div>
        <div className="location">
          <h3>Email</h3>
          <p><a href="mailto:hr@elintpros.com">hr@elintpros.com</a></p>
        </div>
      </div>
      <div className="topnav" style={{height:'60px', backgroundColor:'#183b53', position:'fixed', marginLeft:'-40px'}}>
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

export default Contact;
