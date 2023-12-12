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

app.get('/api/v1/creature/:id', async (req, res) => {
    try {
        const creature = await Creature.findById(req.params.id)

        if (!creature) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(creature)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/hero', async (req, res) => {
    try {
        const hero = await Hero.find({})

        if (!hero) {
            res.status(404).json({ hero: {}, message: "Not found in database" })
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

app.get('/api/v1/quests/:id', async (req, res) => {
    try {
        const quest = await Quests.findById(req.params.id)

        if (!quest) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(quest)

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
        //Extract data from the request
        const propertyToUpdate = req.params.propertyToUpdate
        const value = parseInt(req.body.value)

        // Validation for stats
        if (propertyToUpdate === "gold" ||
            propertyToUpdate === "mood" ||
            propertyToUpdate === "current_hp" ||
            propertyToUpdate === "xp") {

            // Extract data from the database
            const hero = (await Hero.find({}))[0]
            const maxHP = hero.stats.max_hp
            const currentHP = hero.stats.current_hp
            let newValue = hero.stats[propertyToUpdate] + value

            // Validation for max Health Point
            if ((newValue > maxHP) && propertyToUpdate === "current_hp") newValue = 100

            // Modify and save data on the database
            hero.stats[propertyToUpdate] = newValue
            await hero.save()

            // Backend log messages (might use some logger program later)
            console.log(`Response sent!\nAltered Hero:\n${hero}`);

            // Response send on success
            return res.status(200).json({
                message: (currentHP === 100 && propertyToUpdate === "current_hp") ?
                    "Your hero is at full hp" :
                    "Success"
            })
        }
        // Response send on validation error and backend logs
        console.log(`Bad request!\nError: Validation failed, ${propertyToUpdate} is not an existing stat`);
        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        // Response send on any other error and backend logs
        console.log(error);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.patch(`/api/v1/updateCreature/:id`, async (req, res) => {
    try {
        const creatureId = req.params.id;
        const creature = await Creature.findOne({_id: creatureId});

        if (!creature) {
            res.status(404).json({ message: "Not found in database" })
        }

        creature.creature = req.body.creature;
        creature.stats = req.body.stats;

        await creature.save();
        res.json({ message: "Update successful!", creature })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

app.delete(`/api/v1/deletecreature/:id`, async (req, res) => {
    try {
        await Creature.deleteOne({ _id: req.params.id });
        res.json({ message: "Item successfully deleted!" })
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

app.delete(`/api/v1/deletequest/:id`, async (req, res) => {
    try {
        await Quests.deleteOne({ _id: req.params.id });
        res.json({ message: "Item successfully deleted!" })
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

app.patch(`/api/v1/updateQuest/:id`, async (req, res) => {
    try {
        const questId = req.params.id;
        const quest = await Quests.findOne({_id: questId});

        if (!quest) {
            res.status(404).json({ message: "Not found in database" })
        }

        quest.name = req.body.name,
        quest.location = req.body.location,
        quest.description = req.body.description,
        quest.quest_duration = req.body.quest_duration,
        quest.image_url = req.body.image_url,
        quest.reward_gold = req.body.reward_gold,
        quest.reward_xp = req.body.reward_xp,
        quest.hp_loss = req.body.hp_loss

        await quest.save();
        res.json({ message: "Update successful!", quest })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
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
