import React from 'react';
import { useState } from 'react'
import './Register.css';
import postUser from '../../services/postUser';
export default function Register() {
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
        <div className='register-container'>
            <form onSubmit={handleRegister}>
                <label htmlFor="userName">Username</label>
                <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <label htmlFor="userPassword">Password</label>
                <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
