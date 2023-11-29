import React from 'react'

export default function HeroInteraction() {
    return (
        <div className='hero-details'>
            <h1>Select hero!</h1>
            <div className='hero-card'>
                <img src="" alt="hero-image" />
                <h2>Name placeholder</h2>
                <h3>Subname placeholder</h3>

                <ul>Stats:
                    <li>LVL</li>
                    <li>XP</li>
                    <li>HP</li>
                    <li>Mood</li>
                    <li>Gold</li>
                </ul>

                <ul>Actions:
                    <li>Work</li>
                    <li>Pet</li>
                    <li>Train</li>
                </ul>
            </div>
        </div>
    )
}
