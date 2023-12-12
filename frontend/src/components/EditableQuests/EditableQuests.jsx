import React from "react";
export function EditableQuests({ quests, handleEditQuestBtn, handleDeleteQuestBtn}) {
    
    return <div className="container">
        <h1>Quests:</h1>
        {quests.map(quest => <div className="container" key={quest._id}>
            <h2>{quest.name}</h2>
            <p>Quest ID: {quest._id}</p>
            <div>
                <button id={"edit"+quest._id} onClick={handleEditQuestBtn}>Edit</button>
                <button id={"delete"+quest._id} onClick={handleDeleteQuestBtn}>Delete</button>
            </div>
        </div>)}
    </div>;
}
