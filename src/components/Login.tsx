import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const loginURL = 'http://localhost:3000/login';

  const handleSubmit = () => {
    event?.preventDefault();
    const {username, password} = document.forms[0];
    async function request() {
      const userData = await fetch(
        loginURL, {
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
    return navigate('/signup');
  };

  return(
<div>
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
    <button>Submit</button>
    <button onClick={handleClick}>Sign Up</button>
  </form>
</div>
  )
}

export default Login;