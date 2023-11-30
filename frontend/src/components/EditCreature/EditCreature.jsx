import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

export default function EditCreature(){
    
    const { creatureId } = useParams();

    // const [creature, setCreature] = useState({});
    const [species, setSpecies] = useState("");
    const [image, setImage] = useState("");
    const [homeLocation, setHomeLocation] = useState("");
    const [level, setLevel] = useState("");
    const [xp, setXp] = useState("");
    const [currentHp, setCurrentHp] = useState("");
    const [maxHp, setMaxHp] = useState("");
    const [gold, setGold] = useState("");
    const [mood, setMood] = useState("");

    useEffect(() => {
        const setInitialValues = async () => {
            const fetchCreature = async () => {
                try {
                    const response = await fetch(`/api/v1/creature/${creatureId}`);
                    const creature = await response.json();
                    // setCreature(creature);
                    return creature;
                } catch(error){
                    console.error("Failed to fetch single creature!", error);
                }
            };
            
            // const creature = await fetchCreature();
            // async function setInititalValues() {
            setSpecies((await fetchCreature()).creature.species);
            setImage((await fetchCreature()).creature.image);
            setHomeLocation((await fetchCreature()).creature.home_location);
            setLevel((await fetchCreature()).stats.level);
            setXp((await fetchCreature()).stats.xp);
            setCurrentHp((await fetchCreature()).stats.current_hp);
            setMaxHp((await fetchCreature()).stats.max_hp);
            setGold((await fetchCreature()).stats.gold);
            setMood((await fetchCreature()).stats.mood);
            // }
            // fetchCreature().then(setInititalValues);
        }
        setInitialValues();
    }, []);
    
    async function handleEditCreature(){
        try {
            // const response = await fetch('');
            
        } catch (error) {
            console.log("Error happened during while trying to update", error)
        }
    }

    return (
        <form>
            <h2>Edit creature with ID: {creatureId}</h2>
            <label>Species:</label>
            <input value={species} onChange={(e) => setSpecies(e.target.value)} />
            <label>Image:</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} />
            <label>Home location:</label>
            <input value={homeLocation} onChange={(e) => setHomeLocation(e.target.value)} />
            <label>Level:</label>
            <input value={level} onChange={(e) => setLevel(e.target.value)} />
            <label>XP:</label>
            <input value={xp} onChange={(e) => setXp(e.target.value)} />
            <label>Current HP:</label>
            <input value={currentHp} onChange={(e) => setCurrentHp(e.target.value)} />
            <label>Max HP:</label>
            <input value={maxHp} onChange={(e) => setMaxHp(e.target.value)} />
            <label>Gold:</label>
            <input value={gold} onChange={(e) => setGold(e.target.value)} />
            <label>Mood:</label>
            <input value={mood} onChange={(e) => setMood(e.target.value)} />
            <button type="submit" onClick={handleEditCreature}>Confirm changes</button>
        </form>
    )
}