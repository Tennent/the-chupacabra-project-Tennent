import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './HeroInteraction.css'
import Quest from '../Quest/Quest';
import { getHero } from '../../services/fetchHero';
import patchHero from '../../services/patchHero';

export default function HeroInteraction({ hero, setHero }) {

    const navigate = useNavigate();
    const [quests, setQuests] = useState([]);

    const handleHeroAction = async (positiveEffect, positiveValue, negativeEffect, negativeValue) => {
        await patchHero(positiveEffect, positiveValue);
        await patchHero(negativeEffect, negativeValue);
        setHero(await getHero())

        if (!negativeEffect && !negativeValue) {
            alert(`Your creature gained ${positiveValue} ${positiveEffect}!`)
        } else {
            alert(`Your creature gained ${positiveValue} ${positiveEffect}, but lost ${negativeValue} ${negativeEffect}!`);
        }
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

    useEffect(() => {
        async function test() {
            setHero(await getHero());
        }
        test();
    }, [quests]);

    return (
        <>
            {hero === null || !hero ?
                <div className='redirect-message'>
                    <h1>No Hero Selected!</h1>
                    <button onClick={() => navigate('/selecthero')}>Select A Hero</button>
                </div>
                :
                quests.length > 0 ?
                    <div className='quests-container'>
                        <Quest quests={quests} setQuests={setQuests} />
                    </div>
                    :
                    <div className='selected-hero-details'>
                        <div className='selected-hero-card'>
                            <img src={`../../src/assets/images/creatures/${hero.species}.png`} alt="hero-image" />
                            <h2>{hero.userinput.name} {`(${hero.userinput.gender})`}</h2>
                            <h3>{hero.species}</h3>

                            <ul className='hero-stats'>Stats:
                                <li>LVL: {hero.stats.level}</li>
                                <li>{hero.stats.xp} XP</li>
                                <li>{hero.stats.current_hp} HP</li>
                                <li>Mood: {hero.stats.mood}</li>
                                <li>{hero.stats.gold} Gold</li>
                            </ul>

                            <div className='hero-actions'>
                                <button type='button' onClick={() => handleHeroQuest()}>Go On Quest</button>
                                <button type='button' onClick={() => handleHeroAction('xp', 10, 'mood', -15)}>Train</button>
                                <button type='button' onClick={() => handleHeroAction('mood', 10, undefined, undefined)}>Pet</button>
                                <button type='button' onClick={() => handleHeroAction('current_hp', 10, 'gold', -15)}>Feed</button>
                            </div>
                        </div>
                    </div>}
        </>
    )
}
