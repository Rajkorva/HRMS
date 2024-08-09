import React from 'react'

const About = () => {
  return (
    
      <div class="About">
      
      <img src="https://wallpaperaccess.com/full/4322200.jpg" />
      <div class="card-About" >

        <p style={{ color:'black'}}>ELINT PRO is a dedicated IT services company that offers niche solutions to its customers. ELINT PRO was established with a core business of providing product-based solutions, IT services, and staffing.</p>
        </div>
        <div className="topnav" style={{height:'60px', backgroundColor:'#183b53', position:'fixed', marginLeft:'-20px'}}>
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
    
  )
}

export default About;