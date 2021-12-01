import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Statistics from './components/pages/Statistics';
import Car from './components/pages/Car';
import Register from './components/pages/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/car' component={Car} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
