import React from 'react';
import './HeroDetails.css';

export default function HeroDetails({ creature, setSelectedHero }) {
    return (
        <div className='hero-cards'>
            <div className='hero-card' onClick={() => setSelectedHero(creature)}>
                <img src={`/images/creatures/${creature.species}.png`} alt="hero-image" />
                <h2>{creature.species}</h2>
                <h3>{creature.home_location}</h3>

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
