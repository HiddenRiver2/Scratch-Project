import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();
  const signupURL = 'http://localhost:3000/signup'

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    event?.preventDefault();
    const {username, password} = document.forms[0];
    async function request() {
      const userData = await fetch(
        signupURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: username, password: password})
        }
      )
      .then(res => res.json())
      .then(returnData => {
        return returnData
      })
      .catch((err) => console.log('Error verifying Login', err));

      if (userData){
        return navigate("/Table")
      } else {
        return navigate("/signup")
      }
    };

  }

  const handleClick = () => {
    return navigate('/');
  };

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
        <label> Username </label>
        <input 
          type="text" 
          name="username" 
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} 
          required />
      </div>
      <div className='input-container'>
        <label> Password </label>
        <input 
          type="text" 
          name="username" 
          value={password} 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required />
      </div>
      <button>Signup</button>
      <button onClick={handleClick}>Back to Login</button>
      </form>
    </div>
  )
}

export default Signup;