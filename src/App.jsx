import React, { useState } from 'react';
import Navbar from './components/Navbar';
import login from './components/Login';
import Productlist from './components/Productlist';


function App() {
  const [showLogin, setShowLogin] = useState(false);

return (
  <div className="App">
  <Navbar onLoginClick={() => setShowLogin(true)} />

    {showLogin ? (
  <login setShowLogin={setShowLogin} />
  ) : (
    <Productlist/>
  )}
  </div>
);
}

export default App;