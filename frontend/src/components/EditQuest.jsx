import { useParams } from "react-router-dom"

export default function EditQuest(){
    
    const { questId } = useParams();
    
    return (
        <>
            Edit quest with ID: {questId}
        </>
    )
}

// Replicate EditCreature
{/*     {
        "name": "Guardian of the Mystic Grove",
        "reward": "120 Gold",
        "location": "Enchanted Forest",
        "description": "The mystical creatures of the Enchanted Forest are in danger. Stand guard as the temporary protector and ensure the safety of the sacred Mystic Grove.",
        "quest_duration": "2 seconds"
    }    */}