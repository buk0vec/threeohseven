import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import CreteUser from "./createuser";
import Linkhome from "./link_home";
import About from "./about";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreteUser />} />
        <Route path="/mylinktree" element={<Linkhome />} />
      </Routes>
    </Router>
  );
}
export default App;
