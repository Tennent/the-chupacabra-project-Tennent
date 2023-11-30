import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to={'/'}>
                    <img src="../../src/assets/images/logo/chupacabra-project-logo.png" alt="logo" />
                </Link>
            </div>
            <div className='navbar-links'>
                <Link to='/'>Home</Link>
                <Link to='/selecthero'>Select A Hero</Link>
                <Link to='/herodashboard'>Hero Dashboard</Link>
                {/* <Link to='/edit'>Edit</Link> */}
                <Link to='/login'>Login</Link>
            </div>
        </nav>
    )
}
