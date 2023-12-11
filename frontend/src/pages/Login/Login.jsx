import React from 'react';
import { useState } from 'react'
import './Login.css';
import postUser from '../../services/postUser';
export default function Login() {
  //States
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //Event handlers
  async function handleRegister(e) {
    e.preventDefault()
    const messageBody = { user_name: userName, user_password: userPassword };
    const data = await postUser(messageBody);
    console.log(userName, userPassword);
    console.log(data);
  };

  return (
    <>
      <div className='login-container'>
        <img src="https://ehs.research.uiowa.edu/sites/ehs.research.uiowa.edu/files/styles/large/public/wysiwyg_uploads/under%20construction.png?itok=YRojMn6H" alt="construction" />
        <h1>Page under construction</h1>
      </div>

      <form onSubmit={handleRegister}>
        <label htmlFor="userName">Username</label>
        <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <label htmlFor="userPassword">Password</label>
        <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </>
  )
}
