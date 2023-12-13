import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./EditCreature.css"
export default function EditCreature(){
    
    const { creatureId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        species: "",
        image: "",
        home_location: "",
        stats: {
            level: 0,
            xp: 0,
            current_hp: 0,
            max_hp: 0,
            gold: 0,
            mood: 0
        }
    });

    useEffect(() => {
        const setInitialValues = async () => {
            try {
                const response = await fetch(`/api/v1/creature/${creatureId}`);
                const selectedCreature = await response.json();
                setValues({
                    species: selectedCreature.species,
                    image: selectedCreature.image,
                    home_location: selectedCreature.home_location,
                    stats: {
                        level: selectedCreature.stats.level,
                        xp: selectedCreature.stats.xp,
                        current_hp: selectedCreature.stats.current_hp,
                        max_hp: selectedCreature.stats.max_hp,
                        gold: selectedCreature.stats.gold,
                        mood: selectedCreature.stats.mood
                    }
                })
                setLoading(false);
            } catch(error){
                console.error("Failed to fetch single creature!", error);
            }
        }
        setInitialValues();
    }, [creatureId]);

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        const category = dataset.category;
    
        if (category) {
            setValues(prevValues => ({
                ...prevValues,
                [category]: {
                    ...prevValues[category],
                    [name]: value
                }
            }));
        } else {
            setValues(prevValues => ({
                ...prevValues,
                [name]: value
            }))  
        }
    };

    async function handleEditCreature(e){
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/updateCreature/${creatureId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            await response.json();
            if (response.status === 200){
                alert("Creature successfully updated!")
            } else {
                console.error('Update failed:', response.message);
            }
        } catch (error) {
            console.log("Error happened during update", error)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <form onSubmit={handleEditCreature} className="container">
            <h1>Edit creature:</h1>
            <p>ID: {creatureId}</p>
            <label htmlFor="species">Species:</label>
            <input name="species" value={values.species} onChange={handleChange} />
            <label htmlFor="image">Image:</label>
            <input name="image" value={values.image} onChange={handleChange} />
            <label htmlFor="homeLocation">Home location:</label>
            <input name="homeLocation" value={values.home_location} onChange={handleChange} />
            <label htmlFor="level">Level:</label>
            <input name="level" type="number" value={values.stats.level} data-category="stats" onChange={handleChange} />
            <label htmlFor="xp">XP:</label>
            <input name="xp" type="number" value={values.stats.xp} data-category="stats"onChange={handleChange} />
            <label htmlFor="currentHp">Current HP:</label>
            <input name="currentHp" type="number" value={values.stats.current_hp} data-category="stats" onChange={handleChange} />
            <label htmlFor="maxHp">Max HP:</label>
            <input name="maxHp" type="number" value={values.stats.max_hp} data-category="stats" onChange={handleChange} />
            <label htmlFor="gold">Gold:</label>
            <input name="gold" type="number" value={values.stats.gold} data-category="stats" onChange={handleChange} />
            <label htmlFor="mood">Mood:</label>
            <input name="mood" type="number" value={values.stats.mood} data-category="stats" onChange={handleChange} />
            <button type="submit" onClick={handleEditCreature}>Confirm changes</button>
            <button type="button" onClick={() => navigate("/edit")}>Back</button>
        </form>
    )
}