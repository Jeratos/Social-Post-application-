import express from "express";
import cors from "cors";
import DB from "./database/DB.js";
import router from "./routers/route.js";

const PORT = 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", router);

// database connection
DB().then(()=>{
    // server
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });

}).catch((error) => {
    console.log("Error connecting to database", error);
})

