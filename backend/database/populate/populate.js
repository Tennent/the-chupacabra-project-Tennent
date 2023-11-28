import mongoose from "mongoose";
import dotenv from 'dotenv';
import fs from "fs/promises";
import { fileURLToPath } from 'url';
import path from "path";
import AnimalModel from '../models/AnimalModel.js';
import QuestModel from "../models/QuestModel.js";


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); // gets the directory part of the file's absolute path.

dotenv.config({
  path: path.join(__dirname, '../../config/.env'),
  override: true,
});
const dbUrl = process.env.DB_URL;

// Populate functions
async function populateAnimals() {
  const animalFilePath = path.join(
    __dirname,
    "../data",
    "animals.json"
  );
  const animals = JSON.parse(await fs.readFile(animalFilePath));
  await AnimalModel.deleteMany({});
  await AnimalModel.create(animals);
}

async function populateQuests() {
  const questFilePath = path.join(
    __dirname,
    "../data",
    "quests.json"
  );
  const quests = JSON.parse(await fs.readFile(questFilePath));
  await QuestModel.deleteMany({});
  await QuestModel.create(quests);
}

// Main function to connect to db and populate
async function main() {
  try {
    
    await mongoose.connect(dbUrl);

    // Here we can call the populate functions
    await populateAnimals();
    await populateQuests();
    console.log("Database was populated succesfully.");

    mongoose.disconnect()
    console.log("Disconnected from database");

  } catch (error) {
    console.error(error);
  }
}
main();
