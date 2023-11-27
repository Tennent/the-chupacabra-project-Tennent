import mongoose from "mongoose";

const heroSchema = mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true },
    xp: { type: Number, required: true },
    gold: { type: Number, required: true },
})

export default mongoose.model('hero', heroSchema)