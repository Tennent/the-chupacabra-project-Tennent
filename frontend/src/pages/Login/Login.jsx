import React from 'react';
import { useState } from 'react'
import './Login.css';
import getUser from '../../services/getUser';
export default function Login({ setUser }) {
    //States
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //Event handlers
    async function handleLogin(e) {
        e.preventDefault()
        const messageBody = { user_name: userName, user_password: userPassword };
        setUser(await getUser(messageBody));
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <label htmlFor="userName">Username</label>
                <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <label htmlFor="userPassword">Password</label>
                <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
