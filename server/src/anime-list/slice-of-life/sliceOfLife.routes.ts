import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../../database";

export const sliceOfLifeRouter = express.Router();
sliceOfLifeRouter.use(express.json());

sliceOfLifeRouter.get("/", async (_req, res) => {
    try {
        const sliceOfLifes = await collections.sliceOfLifes.find({}).toArray();
        res.status(200).send(sliceOfLifes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

sliceOfLifeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const slifeOfLife = await collections.sliceOfLifes.findOne(query);

        if (slifeOfLife) {
            res.status(200).send(slifeOfLife);
        } else {
            res.status(404).send(`Failed to find an sliceOfLife: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an sliceOfLife: ID ${req?.params?.id}`);
    }
});

sliceOfLifeRouter.post("/", async (req, res) => {
    try {
        const slifeOfLife = req.body;
        const result = await collections.sliceOfLifes.insertOne(slifeOfLife);

        if (result.acknowledged) {
            res.status(201).send(`Created a new sliceOfLife: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new sliceOfLife.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

sliceOfLifeRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const sliceOfLife = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.sliceOfLifes.updateOne(query, { $set: sliceOfLife });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an sliceOfLife: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an sliceOfLife: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an sliceOfLife: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

sliceOfLifeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.sliceOfLifes.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an sliceOfLife: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an sliceOfLife: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an sliceOfLife: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
