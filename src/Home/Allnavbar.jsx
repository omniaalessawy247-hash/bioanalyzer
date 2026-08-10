import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignInAlt, FaFlask, FaChartBar, FaHeart } from 'react-icons/fa';  
import { BiDna } from 'react-icons/bi'; 

 

const NavbarContent = () => {
 

  return (
    <>
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active text-white" aria-current="page" style={{ fontSize: '1rem' }}>
            <FaHome size={22} className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link text-white" style={{ fontSize: '1rem' }}>
            <FaChartBar size={22} className="me-2" /> About
          </Link>
        </li>

        
        <li className="nav-item">
        <Link to="/D,Rsequance" className="nav-link text-white" style={{ fontSize: '1rem' }}>
            <BiDna size={22} className="me-2" />  DNA & RNA Sequence Analysis
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bio" className="nav-link text-white" style={{ fontSize: '1rem' }}>
            <BiDna size={22} className="me-2" /> Learning About Bioinformatics
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Refrence" className="nav-link text-white" style={{ fontSize: '1rem' }}>
            <FaFlask size={22} className="me-2" /> Reference
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/userprofile" className="nav-link text-white" style={{ fontSize: '1rem' }}>
            <FaUser size={22} className="me-2" /> User Profile
          </Link>
        </li>
      </ul>

      <div className="d-flex align-items-center">
        <Link to="/login" className="btn btn-outline-light me-2" style={{ fontSize: '1rem' }}>
          <FaSignInAlt size={18} className="me-1" /> Login
        </Link>
      </div>
    </>
  );
};

const Allnavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient shadow" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: '#004d4d' }}>
      <div className="container-fluid text-center">
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="display-6 text-white" style={{ fontSize: '1.5rem' }}>Bioinformatics</h1>
          <FaHeart style={{ color: 'white', fontSize: '2rem' }} className="mx-2" />
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <NavbarContent />
        </div>
      </div>

      <div className="text-center my-3">
        <h3 className="text-white" style={{ fontSize: '1.2rem' }}>🧬 Start Your Bioinformatics Journey Now!</h3>
      </div>
    </nav>
  );
};

export default Allnavbar;
