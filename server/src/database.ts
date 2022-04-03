import * as mongodb from "mongodb";
import { Employee } from "./employee";
import { Comedy } from "./anime-list/comedy/comedy";
import { Isekai } from "./anime-list/isekai/isekai";
import { Romance } from "./anime-list/romance/romance";
import { SliceOfLife } from "./anime-list/slice-of-life/slice-of-life";
import { Shonen } from "./anime-list/shonen/shonen";

export const collections: {
    
    employees?: mongodb.Collection<Employee> , 
    comedys?: mongodb.Collection<Comedy>;
    isekais?: mongodb.Collection<Isekai>;
    romances?: mongodb.Collection<Romance>;
    shonens?: mongodb.Collection<Shonen>;
    sliceOfLifes?: mongodb.Collection<SliceOfLife>;


} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("Anime-List");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;

    const comedyCollection = db.collection<Comedy>("comedys");
    collections.comedys = comedyCollection;

    const isekaiCollection = db.collection<Isekai>("isekais");
    collections.isekais = isekaiCollection;

    const romanceCollection = db.collection<Romance>("romances");
    collections.romances = romanceCollection;

    const shonenCollection = db.collection<Shonen>("shonens");
    collections.shonens = shonenCollection;

    const sliceOfLifeCollection = db.collection<SliceOfLife>("slifeOfLifes");
    collections.sliceOfLifes = sliceOfLifeCollection;

}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", {validator: jsonSchema});
        }
    });
}
