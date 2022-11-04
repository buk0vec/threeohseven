import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import CreteUser from "./createuser";
import Linkhome from "./link_home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreteUser />} />
        <Route path="/mylinktree" element={<Linkhome />} />
      </Routes>
    </Router>
  );
}

export default App;
