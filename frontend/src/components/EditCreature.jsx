import { useParams } from "react-router-dom"

export default function EditCreature(){
    
    const { creatureId } = useParams();

    const [creature, setCreature] = useState();
    const [species, setSpecies] = useState();
    const [image, setImage] = useState();
    const [homeLocation, setHomeLocation] = useState();
    const [level, setLevel] = useState();
    const [xp, setXp] = useState();
    const [currentHp, setCurrentHp] = useState();
    const [maxHp, setMaxHp] = useState();
    const [gold, setGold] = useState();
    const [mood, setMood] = useState();

    useEffect(() => {
        const fetchCreature = async () => {
            try {
                const response = await fetch(`api/creature/${creatureId}`);
                const creature = await response.json();
                setCreature(creature);
            } catch(error){
                console.error("Failed to fetch single creature!", error);
            }
        };
        fetchCreature();
    }, []);
    
    function handleEditCreature(){
        return null; // update with `PATCH` fetch
    }

    return (
        <form>
            <h2>Edit creature with ID: {creatureId}</h2>
            <label>Species:</label>
            <input value={creature.creature.species} placehodler={creature.creature.species} onChange={(e) => {setSpecies(e.target.value)}}/>
            <label>Image:</label>
            <input value={creature.creature.image} placehodler={creature.creature.image} onChange={(e) => {setImage(e.target.value)}}/>
            <label>Home location:</label>
            <input value={creature.creature.home_location} placehodler={creature.creature.home_location} onChange={(e) => {setHomeLocation(e.target.value)}}/>
            <label>Level:</label>
            <input value={creature.stats.level} placehodler={creature.stats.level} onChange={(e) => {setLevel(e.target.value)}}/>
            <label>XP:</label>
            <input value={creature.stats.xp} placehodler={creature.stats.xp} onChange={(e) => {setXp(e.target.value)}}/>
            <label>Current HP:</label>
            <input value={creature.stats.current_hp} placehodler={creature.stats.current_hp} onChange={(e) => {setCurrentHp(e.target.value)}}/>
            <label>Max HP:</label>
            <input value={creature.stats.max_hp} placehodler={creature.stats.max_hp} onChange={(e) => {setMaxHp(e.target.value)}}/>
            <label>Gold:</label>
            <input value={creature.stats.gold} placehodler={creature.stats.gold} onChange={(e) => {setGold(e.target.value)}}/>
            <label>Mood:</label>
            <input value={creature.stats.mood} placehodler={creature.stats.mood} onChange={(e) => {setMood(e.target.value)}}/>
            <button type="submit" onClick={handleEditCreature}>Confirm changes</button>
        </form>
    )
}