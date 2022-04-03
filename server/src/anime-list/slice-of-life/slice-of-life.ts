import * as mongodb from "mongodb";

export interface SliceOfLife {
    name: string;
    position: string;
    level: "junior" | "mid" | "senior";
    _id?: mongodb.ObjectId;
}