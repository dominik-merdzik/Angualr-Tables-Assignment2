import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../../database";

export const comedyRouter = express.Router();
comedyRouter.use(express.json());

comedyRouter.get("/", async (_req, res) => {
    try {
        const comedys = await collections.comedys.find({}).toArray();
        res.status(200).send(comedys);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

comedyRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const comedy = await collections.comedys.findOne(query);

        if (comedy) {
            res.status(200).send(comedy);
        } else {
            res.status(404).send(`Failed to find an comedy: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an comedy: ID ${req?.params?.id}`);
    }
});

comedyRouter.post("/", async (req, res) => {
    try {
        const comedy = req.body;
        const result = await collections.comedys.insertOne(comedy);

        if (result.acknowledged) {
            res.status(201).send(`Created a new comedy: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new comedy.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

comedyRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const comedy = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.comedys.updateOne(query, { $set: comedy });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an comedy: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an comedy: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an comedy: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

comedyRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.comedys.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an comedy: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an comedy: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an comedy: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
