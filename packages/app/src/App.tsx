import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Login from './login';
import CreteUser from './createuser';
import Linkhome from './link_home';
import PickPhoto from './pickPhoto';
import Background from './background';
function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/create' element={<CreteUser/>} />
        <Route path='/mylinktree' element={<Linkhome/>} />
        <Route path='/photoselector' element={<PickPhoto/>} />
        <Route path='/backgroundselector' element={<Background/>} />
    </Routes>

    </Router>
  );
}

export default App;
