import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
import { comedyRouter } from "./anime-list/comedy/comedy.routes";
import { isekaiRouter } from "./anime-list/isekai/isekai.routes";
import { romanceRouter } from "./anime-list/romance/romance.routes";
import { shonenRouter } from "./anime-list/shonen/shonen.routes";
import { sliceOfLifeRouter } from "./anime-list/slice-of-life/sliceOfLife.routes";



// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/employees", employeeRouter);
        app.use("/comedys", comedyRouter);
        app.use("/isekais", isekaiRouter);
        app.use("/romances", romanceRouter);
        app.use("/shonens", shonenRouter);
        app.use("/sliceOfLifes", sliceOfLifeRouter);

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

    })
    .catch(error => console.error(error));
