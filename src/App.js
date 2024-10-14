// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/sinhvien/login/login'; 
import Home from './components/sinhvien/home/home';
import Dangkyhp from './components/sinhvien/dangkyhp/dangkyhp';
import Lichsuhp from './components/sinhvien/dangkyhp/lichsuhp';
import Navbar from './components/sinhvien/navbar/navbar';
import EditAccount from './components/sinhvien/edit_account/edit_account';
import Logout from './components/sinhvien/logout'; 
import Thoikhoabieu from './components/sinhvien/thoikhoabieu/thoikhoabieu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dangkyhp" element={<Dangkyhp />} />
        <Route path="/lichsuhp" element={<Lichsuhp />} />
        <Route path="/edit_account" element={<EditAccount />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/thoikhoabieu" element={<Thoikhoabieu />} />
        </Routes>
    </Router>
  );
}

export default App;
