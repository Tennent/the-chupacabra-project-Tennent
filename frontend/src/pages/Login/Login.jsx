import React from 'react';
import { useState } from 'react'
import './Login.css';
import loginUser from '../../services/loginUser';
import { useNavigate } from 'react-router-dom';
export default function Login({ setUser, user }) {

    //Feature hooks
    const navigate = useNavigate();

    //States
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //Event handlers
    async function handleLogin(e) {
        e.preventDefault()
        const messageBody = { user_name: userName, user_password: userPassword };
        setUser(await loginUser(messageBody));
        navigate('/');
    };

    async function handleLogout() {
        setUser(null);
        navigate('/');
    };

    return (
        <> {!user || user.message === 'Some error occured' ?
            <div className='login-container'>
                <form onSubmit={handleLogin}>
                    <label htmlFor="userName">Username</label>
                    <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <label htmlFor="userPassword">Password</label>
                    <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </div>
            :
            <div className='login-container'>
                <h1>You are already logged in!</h1>
                <button onClick={() => handleLogout()}>Log Out</button>
            </div>
        }
        </>
    )
}
