import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import Logo from '../../assets/logo.png';
import Search from '../../assets/search_icon.svg';
import Bell from '../../assets/bell_icon.svg';
import Proflie from '../../assets/profile_img.png';
import Caret from '../../assets/caret_icon.svg';
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) navRef.current.classList.add('nav-dark');
      else navRef.current.classList.remove('nav-dark');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={Search} alt="Search" className="icons" />
        <p>Children</p>
        <img src={Bell} alt="Bell" className="icons" />

        <div className="navbar-profile">
          <img src={Proflie} alt="Profile" className="profile"/>
          <img src={Caret} alt="Caret" className="caret" />

          <div className="dropdown">
            <p onClick={handleLogout}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
