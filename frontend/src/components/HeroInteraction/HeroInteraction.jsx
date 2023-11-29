import React from 'react'
import './HeroInteraction.css'

export default function HeroInteraction({ hero }) {

    const handeHeroAction = async (propertyName, value) => {
        try {
            const res = await fetch(`/api/v1/heroAction/${propertyName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value })
            })
            if (res.ok) {
                console.log(`${propertyName} update succesful!`);
            } else {
                console.log(`Ooops, something went wrong during ${propertyName} updating`);
            }
        } catch (err) {
            console.error(`Error updating hero stats! ${err}`);
        }
    };

    return (
        <div className='selected-hero-details'>
            <div className='selected-hero-card'>
                <img src="https://static.vecteezy.com/system/resources/previews/024/241/089/original/colorful-cavalier-king-charles-spaniel-dog-cavalier-king-charles-spaniel-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png" alt="hero-image" />
                <h2>{hero.userinput.name} {`(${hero.userinput.gender})`}</h2>
                <h3>{hero.creature.species}</h3>

                <ul className='hero-stats'>Stats:
                    <li>LVL: {hero.stats.level}</li>
                    <li>{hero.stats.xp} XP</li>
                    <li>{hero.stats.max_hp} HP</li>
                    <li>Mood: {hero.stats.mood}</li>
                    <li>{hero.stats.gold} Gold</li>
                </ul>

                <div className='hero-actions'>Actions:
                    <button type='button'>Go On Quest</button>
                    <button type='button' onClick={() => handeHeroAction('xp', 10)}>Train</button>
                    <button type='button' onClick={() => handeHeroAction('mood', 10)}>Pet</button>
                    <button type='button' onClick={() => handeHeroAction('current_hp', 10)}>Feed</button>
                </div>
            </div>
        </div>
    )
}
