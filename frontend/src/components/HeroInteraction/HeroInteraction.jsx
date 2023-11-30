import React, { useState } from 'react'
import './HeroInteraction.css'
import Quest from '../Quest/Quest';
import { getHero } from '../../services/fetchHero';
import patchHero from '../../services/patchHero';

export default function HeroInteraction({ hero, setHero }) {

    const [quests, setQuests] = useState([]);

    const handleHeroAction = async (propertyName, value) => {
        const data = await patchHero(propertyName, value)
        setHero(await getHero())
        alert(data.message);
    };

    const handleHeroQuest = async () => {
        try {
            const res = await fetch('/api/v1/quests');
            if (res.ok) {
                setQuests(await res.json());
                console.log('Quests fetched successfully!');
            }
        } catch (err) {
            console.error(`Error fetching quests! ${err}`);
        }
    };

    return (
        <>
            {quests.length > 0 ?
                <div className='quests-container'>
                    <Quest quests={quests} setQuests={setQuests} />
                </div>
                :
                <div className='selected-hero-details'>
                    <div className='selected-hero-card'>
                        <img src={`/images/creatures/${hero.creature.species}.png`} alt="hero-image" />
                        <h2>{hero.userinput.name} {`(${hero.userinput.gender})`}</h2>
                        <h3>{hero.creature.species}</h3>

                        <ul className='hero-stats'>Stats:
                            <li>LVL: {hero.stats.level}</li>
                            <li>{hero.stats.xp} XP</li>
                            <li>{hero.stats.current_hp} HP</li>
                            <li>Mood: {hero.stats.mood}</li>
                            <li>{hero.stats.gold} Gold</li>
                        </ul>

                        <div className='hero-actions'>Actions:
                            <button type='button' onClick={() => handleHeroQuest()}>Go On Quest</button>
                            <button type='button' onClick={() => handleHeroAction('xp', 10)}>Train</button>
                            <button type='button' onClick={() => handleHeroAction('mood', 10)}>Pet</button>
                            <button type='button' onClick={() => handleHeroAction('current_hp', 10)}>Feed</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
