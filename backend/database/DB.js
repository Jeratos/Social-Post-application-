import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB = async () => {
    try {

        // connect originAgentCluster
        const connectionString =process.env.DATABASE_URL;
        await mongoose.connect(connectionString);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default DB;