import React, { useState } from "react";
import "./App.css";

const navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <div>
      <nav className="navBar">
        <button>{navbarOpen ? "Close" : "Open"}</button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>...</ul>
      </nav>
      <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
    </div>
  );
};

export default navbar;
