import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import List from './components/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path='/list' element={<PrivateRoute/>}>
            <Route exact path='/list' element={<List/>}/>
        </Route>
        <Route exact path='/email-form' element={<PrivateRoute/>}>
            <Route exact path='/email-form' element={<EmailForm/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
