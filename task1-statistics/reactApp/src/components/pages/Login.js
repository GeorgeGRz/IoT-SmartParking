import React from 'react';
import '../../App.css';
import { useState } from 'react';
//import { ButtonAcc } from '../ButtonAcc';
import { Route, Redirect } from 'react-router'
import Useracc from './Useracc';

export default function Login() {
 
  // States for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError(true);
    } else {
      console.log(password)
      const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ carId: email, user_passwd : password })
    };
    fetch('https://127.0.0.1:3030/login', requestOptions)
        .then(response => {console.log(response.json());setSubmitted(true);})
        .then(data => this.setState({ postId: 0 }));
      setError(false);
    }
  };
 
  // Showing success message
   const successMessage = () => {
     return (
      // <div
      //   className="success"
      //   style={{
      //     display: submitted ? '' : 'none',
      //   }}>
      //   <h1>User {email} successfully registered!!</h1>
      // </div>
      <Route exact path="/" render={() => (
        submitted ? (
          <Redirect to="/useracc"/>
        ) : (
          <Useracc/>
        )
      )}/>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 
  return (
    <div className="form">
      <div>
        <h1>User Login</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */} 
        <label className="formlabel">Email</label>
        <input onChange={handleEmail} className="input"
          value={email} type="email" />
 
        <label className="formlabel">Password</label>
        <input onChange={handlePassword} className="forminput"
          value={password} type="password" />
 
        <button onClick={handleSubmit} className="formbtn" to='/useracc' type="submit">
          Login
        </button>

        
          {/* <div className='hero-btns'>
          <ButtonAcc
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            LOG IN
          </ButtonAcc>
          </div> */}
      </form>
    </div>
  );
}
