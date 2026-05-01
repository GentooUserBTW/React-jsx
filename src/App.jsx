import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import login from './components/Login';
import Productlist from './components/Productlist';


function App() {
  const [showLogin, setShowLogin] = useState(false);

return (
  <div className="App">
  <Navbar onLoginClick={() => setShowLogin(true)} />

  <main className="content-area">
  {showLogin ? (
  <login setShowLogin={setShowLogin} />
  ) : (
    <Productlist/>
  )}
  </main>

  <footer className="footer">
    <p>Welcome to Vimms lair:</p>
  </footer>
  </div>
)
};

export default App;