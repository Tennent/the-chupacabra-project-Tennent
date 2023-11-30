import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    
    const navigate = useNavigate();

    const [creatures, setCreatures] = useState([]);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchCreatures = async () => {
            try {
                const response = await fetch("/api/v1/creatures");
                const creatures = await response.json();
                setCreatures(creatures);
            } catch (error) {
                console.error("Failed to fetch creatures!", error)
            }
        };
        const fetchQuests = async () => {
            try {
                const response = await fetch("/api/v1/quests");
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
        navigate(`/editcreature/${creatureId}`);
    }

    function handleEditQuestBtn(event) {
        const questId = event.target.id;
        navigate(`/editquest/${questId}`);
    }

    return (
        <>
            <div>
                <h1>Creatures:</h1>
                {creatures.map(creature => (
                    <div key={creature._id}>
                        <h3>Creature: {creature.creature.species}</h3>
                        <p>ID: {creature._id}</p>
                        <button id={creature._id} onClick={handleEditCreatureBtn}>Edit creature</button>
                    </div>    
                ))}
            </div>
            <div>
                <h1>Quests:</h1>
                {quests.map(quest => (
                    <div key={quest._id}>
                        <h3>{quest.name}</h3>
                        <p>Quest ID: {quest._id}</p>
                        <button id={quest._id} onClick={handleEditQuestBtn}>Edit quest</button>
                    </div>    
                ))}
            </div>
        </>
    );
}