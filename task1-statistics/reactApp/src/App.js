import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          
            <Route path='/' exact  />
          
      </Router>
    </>
  );
}

export default App;
