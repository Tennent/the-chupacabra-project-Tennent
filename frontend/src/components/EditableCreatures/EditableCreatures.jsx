import React from "react";
export function EditableCreatures({ creatures, handleEditCreatureBtn, handleDeleteCreatureBtn }) {
    
    return <div className="container">
        <h1>Creatures:</h1>
        {creatures.map(creature => <div className="container" key={creature._id}>
            <h2>Creature: {creature.species}</h2>
            <p>ID: {creature._id}</p>
            <div>
                <button id={"edit"+creature._id} onClick={handleEditCreatureBtn}>Edit</button>
                <button id={"delete"+creature._id} onClick={handleDeleteCreatureBtn}>Delete</button>
            </div>
        </div>)}
    </div>;
}
