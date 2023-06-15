import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import Login from './components/Login';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/email-form" element={<EmailForm />} />
          </Routes>
    </Router>
  );
}

export default App;
