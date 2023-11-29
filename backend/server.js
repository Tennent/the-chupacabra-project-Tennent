import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";

import Creature from './database/models/CreatureModel.js'
import Hero from './database/models/HeroModel.js'
import Quests from './database/models/QuestModel.js'

// Construct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config files
dotenv.config({
    path: path.join(__dirname, './config/.env'),
    override: true,
});
const dbUrl = process.env.DB_URL;

// Create app  express instance
const app = express();

// Middlewares
app.use(express.json())

app.use((req, _, next) => {
    console.log(`Request method: ${req.method}`);
    console.log(`Request url: ${req.url}`);
    next()
})


// Endpoints
app.get('/api/v1/welcome', (req, res) => {
    try {
        res.status(200).json({ message: "Hello world" })
    } catch (error) {
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/creatures', async (req, res) => {
    try {
        const creatures = await Creature.find({})

        if (!creatures) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(creatures)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/hero', async (req, res) => {
    try {
        const hero = await Hero.find({})

        if (!hero) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(hero)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/quests', async (req, res) => {
    try {
        const quests = await Quests.find({})

        if (!quests) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(quests)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

// Main
async function main() {
    await mongoose.connect(dbUrl)
    app.listen(3000, () => {
        console.log("server is running at port: 3000");
    })
}
main()
