import React from 'react';
import './HeroDetails.css';

export default function HeroDetails({ animal, setSelectedHero }) {

    return (
        <div className='hero-cards'>
            <div className='hero-card' onClick={() => setSelectedHero(animal)}>
                <img src="https://static.vecteezy.com/system/resources/previews/024/241/089/original/colorful-cavalier-king-charles-spaniel-dog-cavalier-king-charles-spaniel-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" alt="hero-image" />
                <h2>{animal.breed.type}</h2>
                <h3>{animal.breed.home_location}</h3>

                <ul>Stats:
                    <li>LVL: {animal.stats.level}</li>
                    <li>{animal.stats.current_hp} HP</li>
                    <li>{animal.stats.gold} Gold</li>
                    <li>Mood: {animal.stats.mood}</li>
                </ul>
            </div>
        </div>
    )
}
