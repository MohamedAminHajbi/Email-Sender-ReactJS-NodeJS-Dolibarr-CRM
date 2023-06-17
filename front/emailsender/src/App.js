import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import Login from './components/Login';
import { Container } from '@mui/material';
import List from './components/List';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/email-form" element={<EmailForm />} />
          </Routes>
    </Router>
  );
}

export default App;
