import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../../database";

export const shonenRouter = express.Router();
shonenRouter.use(express.json());

shonenRouter.get("/", async (_req, res) => {
    try {
        const shonens = await collections.shonens.find({}).toArray();
        res.status(200).send(shonens);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

shonenRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const shonen = await collections.shonens.findOne(query);

        if (shonen) {
            res.status(200).send(shonen);
        } else {
            res.status(404).send(`Failed to find an shonen: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an shonen: ID ${req?.params?.id}`);
    }
});

shonenRouter.post("/", async (req, res) => {
    try {
        const shonen = req.body;
        const result = await collections.shonens.insertOne(shonen);

        if (result.acknowledged) {
            res.status(201).send(`Created a new shonen: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new shonen.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

shonenRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const shonen = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.shonens.updateOne(query, { $set: shonen });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an shonen: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an shonen: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an shonen: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

shonenRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.shonens.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an shonen: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an shonen: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an shonen: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
