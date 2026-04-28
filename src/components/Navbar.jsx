import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/cart-logo.png';
import cart from '../assets/cart.png';

const Navbar = ({ onLoginClick }) => { // 1. Ensure this prop is here
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropDown] = useState(null);

  const menuItems = [
    { title: "Parts: ", links: ["Engine", "Brake", "Transmission", "Exhaust"] },
    { title: "Auto Care: ", links: ["Cleaning Kits", "Oil and fluid", "Tools", "Tires"] },
    { title: "Services: ", links: ["insurance", "Pricing guide", "Repair estimator and configuration"] },
    { title: "Corporate: ", links: ["Stock price", "Investor relations", "careers"] }
  ];

  // The ( must be on the same line as return!
  return (
    <nav className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Autopart Logo" />
        <p>Autopart.co</p>
      </div>

      {/* This section displays your tabs/menu */}
      <ul className={isMobile ? "nav-menu-mobile" : "nav-menu"}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => setActiveDropDown(index)}
            onMouseLeave={() => setActiveDropDown(null)}
          >
            <span className="menu-title">{item.title}</span>
            {activeDropdown === index && (
              <ul className="custom-dropdown">
                {item.links.map((link, i) => (
                  <li key={i} className="dropdown-link">
                    <a href={`/${link.toLowerCase().replace(/\s/g, '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="nav-login-cart">
        <button className="login-btn" onClick={onLoginClick}>
          Login
        </button>
        <div className="cart-container">
          <img src={cart} alt="Cart" />
          <div className="nav-cart-count">0</div>
        </div>
        <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <>&#10005;</> : <>&#9776;</>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;