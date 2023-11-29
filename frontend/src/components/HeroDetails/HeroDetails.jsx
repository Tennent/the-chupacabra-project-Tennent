import React from 'react';
import './HeroDetails.css';

export default function HeroDetails({ creature, setSelectedHero }) {

    return (
        <div className='hero-cards'>
            <div className='hero-card' onClick={() => setSelectedHero(creature)}>
                <img src="https://static.vecteezy.com/system/resources/previews/024/241/089/original/colorful-cavalier-king-charles-spaniel-dog-cavalier-king-charles-spaniel-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" alt="hero-image" />
                <h2>{creature.creature.species}</h2>
                <h3>{creature.creature.home_location}</h3>

                <ul>Stats:
                    <li>LVL: {creature.stats.level}</li>
                    <li>{creature.stats.current_hp} HP</li>
                    <li>{creature.stats.gold} Gold</li>
                    <li>Mood: {creature.stats.mood}</li>
                </ul>
            </div>
        </div>
    )
}
