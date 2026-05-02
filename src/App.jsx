import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/Productlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Navbar />

        {/* ROUTES */}
        <main className="content-area">

          <Routes>

            {/* AUTOPARTS MAIN PAGE */}
            <Route path="/" element={<ProductList />} />

            {/* LOGIN PAGE */}
            <Route path="/login" element={<Login />} />

            {/* REGISTER PAGE */}
            <Route path="/register" element={<Register />} />

          </Routes>

        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p>Welcome to Autoparts.co</p>
        </footer>

      </div>

    </BrowserRouter>
  );
}

export default App;