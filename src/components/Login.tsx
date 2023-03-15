import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../scss/application.scss';


const Login = () => {

  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");


  const navigate = useNavigate();
  const loginURL = 'api/verifyUser';

  const handleSubmit = () => {
    event?.preventDefault();
    // const {username, password} = document.forms[0];
    console.log("What is uname and pass?", uname, pass);
    async function request() {
      console.log("Logging in attempt");
      const userData = await fetch(
        loginURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: uname, password: pass})
        }
      )
      .then(res => res.json())
      .then(returnData => {
        console.log("What is returnData?", returnData)
        return returnData
      })
      .catch((err) => console.log('Error verifying Login', err));

      if (userData){
        return navigate("/Table")
      } else {
        return navigate("/signup")
      }
    };
    request();
  }

  const handleClick = () => {
    return navigate('/signup');
  };

  return(
<div>
  <div className='loginContainer'>
  <form onSubmit={handleSubmit}>
    <div className='input-container'>
      <label> Username </label>
      <input 
        type="text" 
        name="username" 
        value={uname}
        placeholder="Username"
        onChange={(e) => setUname(e.target.value)} 
        required />
    </div>
    <div className='input-container'>
      <label> Password </label>
      <input 
        type="text" 
        name="username" 
        value={pass} 
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
        required />
    </div>
    <button>Login</button>
    <button onClick={handleClick}>Sign Up</button>
  </form>
  </div>
</div>
  )
}

export default Login;