import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    name: { type: String, required: true }
})

export default mongoose.model('animal', animalSchema)