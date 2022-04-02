import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../../database";

export const isekaiRouter = express.Router();
isekaiRouter.use(express.json());

isekaiRouter.get("/", async (_req, res) => {
    try {
        const isekais = await collections.isekais.find({}).toArray();
        res.status(200).send(isekais);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

isekaiRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const isekai = await collections.isekais.findOne(query);

        if (isekai) {
            res.status(200).send(isekai);
        } else {
            res.status(404).send(`Failed to find an isekai: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an isekai: ID ${req?.params?.id}`);
    }
});

isekaiRouter.post("/", async (req, res) => {
    try {
        const isekai = req.body;
        const result = await collections.isekais.insertOne(isekai);

        if (result.acknowledged) {
            res.status(201).send(`Created a new isekai: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new isekai.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

isekaiRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const isekai = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.isekais.updateOne(query, { $set: isekai });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an isekai: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an isekai: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an isekai: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

isekaiRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.isekais.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an isekai: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an isekai: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an isekai: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
