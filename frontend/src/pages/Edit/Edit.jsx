import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    
    const navigate = useNavigate();

    const [creatures, setCreatures] = useState([]);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchCreatures = async () => {
            try {
                const response = await fetch("*GET-ALL-CREATURES-URL*");
                const creatures = await response.json();
                setCreatures(creatures);
            } catch (error) {
                console.error("Failed to fetch creatures!", error)
            }
        };
        const fetchQuests = async () => {
            try {
                const response = await fetch("*GET-ALL-QUESTS-URL");
                const quests = await response.json();
                setQuests(quests);
            } catch (error) {
                console.error("Failed to fetch quests!", error)
            }
        };
        fetchCreatures();
        fetchQuests();
    }, [])

    function handleEditCreatureBtn(event) {
        const creatureId = event.target.id;
        navigate(`edit/${creatureId}`);
    }

    function handleEditQuestBtn(event) {
        const questId = event.target.id;
        navigate(`edit/${questId}`);
    }

    return (
        <>
            <div>
                <h1>Creatures:</h1>
                {creatures.map(creature => {
                    <div key={creature._id}>
                        <h3>Creature ID: {creature._id}</h3>
                        <p>Species: {creature.creature.species}</p>
                        <button id={creature._id} onClick={handleEditCreatureBtn}>Edit creature</button>
                    </div>    
                })}
            </div>
            <div>
                <h1>Quests:</h1>
                {quests.map(quest => {
                    <div key={quest._id}>
                        <h3>Quest ID: {quest._id}</h3>
                        <p>Name: {quest.name}</p>
                        <button id={quest._id} onClick={handleEditQuestBtn}>Edit quest</button>
                    </div>    
                })}
            </div>
        </>
    );
}