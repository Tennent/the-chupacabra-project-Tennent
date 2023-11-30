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
app.use(express.static('public'))

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

app.post('/api/v1/hero', async (req, res) => {

    try {

        const { userinput, creature } = req.body

        // Checks if a hero is already exist
        if ((await Hero.find({})).length > 0) {
            console.log("Hero already exists");
            return res.status(422).json({ message: "You have alredy chosen a hero" })
        }

        const heroToAdd = new Hero({
            userinput: {
                name: userinput.name,
                gender: userinput.gender
            },
            creature: {
                species: creature.species,
                image: creature.image,
                home_location: creature.home_location
            },
            stats: {
                level: 1,
                xp: 0,
                current_hp: 100,
                max_hp: 100,
                gold: 0,
                mood: 50
            },
            items: []
        })

        const savedHero = await heroToAdd.save()
        console.log(`Response sent!`);
        return res.status(201).json(savedHero)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.patch('/api/v1/heroAction/:propertyToUpdate', async (req, res) => {
    try {

        // Validation
        const propertyToUpdate = req.params.propertyToUpdate
        if (propertyToUpdate === "gold" || propertyToUpdate === "mood" || propertyToUpdate === "current_hp" || propertyToUpdate === "xp") {
            const statToUpdate = `stats.${propertyToUpdate}`
            const { value } = req.body
            console.log(propertyToUpdate);
            const valueToUpdate = (await Hero.find({}, { [statToUpdate]: 1 }))[0].stats[propertyToUpdate]
            let newValue = valueToUpdate + value
            console.log(valueToUpdate);
            const maxHP = (await Hero.find({}, { "stats.max_hp": 1 }))[0].stats.max_hp
            const currentHP = (await Hero.find({}, { "stats.current_hp": 1 }))[0].stats.current_hp
            console.log(currentHP);
            console.log(maxHP);

            if ((newValue > maxHP) && propertyToUpdate === "current_hp") newValue = 100
            const updatedHero = await Hero.findOneAndUpdate(
                {},
                { $set: { [statToUpdate]: newValue } }
            )
            updatedHero.save()
            console.log(updatedHero);
            console.log(`Response sent!`);
            return res.status(200).json({ message: "Action registered" })
        }

        console.log(`Bad request!`);
        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        console.log(error);
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
