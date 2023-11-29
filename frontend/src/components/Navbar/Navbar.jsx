import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to={'/'}>
                    <img src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF92ZWN0b3JfbGluZV9hcnRfb2ZfYWJzdHJhY3Rfb3JhbmdlX2ZveF9fbWluaW1hbF9mYTg4YmRhNC0yYmRlLTRjN2QtYjZjOC03YTIzZDc1ZDhjNjIucG5n.png" alt="logo" />
                </Link>
            </div>
            <div className='navbar-links'>
                <Link to='/'>Home</Link>
                <Link to='/selecthero'>Select A Hero</Link>
                <Link to='/herodashboard'>Hero Dashboard</Link>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
    )
}
