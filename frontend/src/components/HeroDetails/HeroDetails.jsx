import React from 'react';
import './HeroDetails.css';

export default function HeroDetails() {
    return (
        <div className='hero-details'>
            <h1 className='title'>Select hero!</h1>
            <div className='hero-card'>
                <img src="https://static.vecteezy.com/system/resources/previews/024/241/089/original/colorful-cavalier-king-charles-spaniel-dog-cavalier-king-charles-spaniel-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" alt="hero-image" />
                <h2>Name placeholder</h2>
                <h3>Subname placeholder</h3>

                <ul>Stats:
                    <li>LVL</li>
                    <li>HP</li>
                    <li>Mood</li>
                </ul>
            </div>
        </div>
    )
}
