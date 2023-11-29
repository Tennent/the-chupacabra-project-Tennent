import mongoose from "mongoose";

const questSchema = mongoose.Schema({
    name: { type: String, required: true },
    reward: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    quest_duration: { type: Number, required: true },
})

export default mongoose.model('quest', questSchema, 'quests')