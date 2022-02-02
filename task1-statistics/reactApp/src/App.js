import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Statistics from './components/pages/Statistics';
import Car from './components/pages/Car';
import Register from './components/pages/Register';
import Login from "./components/pages/Login";
import Useracc from "./components/pages/Useracc";
import Session from 'react-session-api'


function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        
          <Route path='/' exact component={Home} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/car' component={Car} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login}/>
          <Route path='/useracc' component={Useracc}/>
        
      </Router>
    </>
  );
}

export default App;
