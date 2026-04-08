import React from 'react';
import './Navbar.css'
import logo from '../assets/cart-logo.png'
import cart from '../assets/cart.png'

const Navbar = () => {
  return (
      <div className='navbar'>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>Autopart.co</p>
          </div>
        <ul className="nav-menu">
        <li>*Parts</li>
        <li>*Auto care</li>
        <li>*Stock price</li>
        <li>*Pricing and insurance</li>
        </ul>
        <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart} alt="" />
        </div>
        </div>
  );
};
export default Navbar;