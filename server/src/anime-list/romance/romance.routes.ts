import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../../database";

export const romanceRouter = express.Router();
romanceRouter.use(express.json());

romanceRouter.get("/", async (_req, res) => {
    try {
        const romances = await collections.romances.find({}).toArray();
        res.status(200).send(romances);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

romanceRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const romance = await collections.romances.findOne(query);

        if (romance) {
            res.status(200).send(romance);
        } else {
            res.status(404).send(`Failed to find an romance: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an romance: ID ${req?.params?.id}`);
    }
});

romanceRouter.post("/", async (req, res) => {
    try {
        const romance = req.body;
        const result = await collections.romances.insertOne(romance);

        if (result.acknowledged) {
            res.status(201).send(`Created a new romance: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new romance.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

romanceRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const romance = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.romances.updateOne(query, { $set: romance });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an romance: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an romance: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an romance: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

romanceRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.romances.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an romance: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an romance: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an romance: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
