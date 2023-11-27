import mongoose from "mongoose";

const questSchema = mongoose.Schema({
    name: { type: String, required: true },
    reward: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    quest_duration: { type: String, required: true },
})

export default mongoose.model('quest', questSchema)