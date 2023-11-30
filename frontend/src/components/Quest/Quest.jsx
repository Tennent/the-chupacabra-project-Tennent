import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Quests.css'
import patchHero from '../../services/patchHero';

export default function Quest({ quests, setQuests }) {

    const [randomQuests, setRandomQuest] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [countdown, setCoutdown] = useState('');

    useEffect(() => {
        const selectRandomQuest = (quests) => {
            const randomList = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * quests.length);
                const selectedQuest = quests.splice(randomIndex, 1)[0];
                randomList.push(selectedQuest);
            }
            setRandomQuest(randomList);
        }
        selectRandomQuest(quests);
    }, []);

    function questCountdown(seconds) {
        const timer = setInterval(function () {
            const minutesDisplay = Math.floor(seconds / 60);
            const secondsDisplay = seconds % 60;

            setCoutdown(`${minutesDisplay}:${secondsDisplay}`);

            if (seconds <= 0) {
                clearInterval(timer);
                console.log("Countdown finished!");
            } else {
                seconds--;
            }
        }, 1000);
    };

    const triggerQuest = (quest, time) => {
        setSelectedQuest(quest);
        questCountdown(time);
    };

    const handleFinishQuest = async (quest) => {
        await patchHero('gold', quest.reward_gold)
        await patchHero('xp', quest.reward_xp)
        await patchHero('current_hp', quest.hp_loss)
        alert(`Quest successful! Your creature gained ${quest.reward_gold} Gold, ${quest.reward_xp} XP and lost ${quest.hp_loss} HP`)
        location.reload();
    }

    return (
        <>
            {selectedQuest ?
                <div className='selected-quest-card'>
                    <img src={`../../src/assets/images/locations/${selectedQuest.location}.jpg`} alt="quest-img" />
                    <h2>{selectedQuest.name}</h2>
                    <h3>{selectedQuest.location}</h3>
                    <p>{selectedQuest.description}</p>
                    {countdown === '0:0' ?
                        <button className='finish-btn' onClick={() => handleFinishQuest(selectedQuest)}>Finsih Quest</button>
                        :
                        <span className='quest-timer'>{countdown}</span>}
                </div>
                :
                <div>
                    <div className='quest-cards'>
                        {randomQuests.map(quest => <div className='quest-card' key={quest._id} onClick={() => triggerQuest(quest, quest.quest_duration)}>
                            <img src={`../../src/assets/images/locations/${quest.location}.jpg`} alt="quest-img" />
                            <div className='quest-container'>
                                <h2>{quest.name}</h2>
                                <h3>{quest.location}</h3>
                                <p>{quest.description}</p>
                            </div>
                            <div className='quest-details-container'>
                                <span>{quest.quest_duration} min, {quest.reward_gold} Gold</span>
                            </div>
                        </div>)}
                    </div>
                    <div className='button-holder'>
                        <button className='return-btn' onClick={() => setQuests([])}>Return To Dashboard</button>
                    </div>
                </div>}
        </>
    )
}
