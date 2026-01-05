import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Log from "./models/Log.js";
import { simulateBruteForce } from "./sim/attackSimulator.js";

const app = express();
app.use(cors());
app.use(express.json());


//Brute force attack
app.post("/api/sim/bruteforce", async (req, res) => {
    try {
        const logs = await simulateBruteForce();
        res.json({
            message: "Brute force attack simulated",
            count: logs.length,
            logs
        });
    } catch (err) {
        console.error("Error during brute force simulation:", err);
        res.status(500).json({error: "simulation failed"});
    }
});

// Get all the logs
app.get("/api/logs", async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        console.error("Error fetching logs:", err);
        res.status(500).json({ error: "Could not fetch logs" });
    }
});

//post and save logs (takes JSON from frontentd (or simulated attacks) and creates new logs in MongoDB)
app.post("/api/logs", async (req, res) => {
    try  {
        const newLog = await Log.create(req.body);
        res.status(201).json(newLog);
    } catch (err) {
        console.error("Error saving log:", err);
        res.status(500).json({error: "Could not save log"});
    }
});

//api route
app.get("/", (req, res) => {
    res.send("API for AI logger is running");
});


//here i place all the suspicious logs
app.get("/api/logs/suspicious", (req, res) => {
    res.json([]);
});



//AI analysis placeholder
app.post("/api/logs/analyze", (req, res) => {
    res.json({
        messagge: "AI analysis is not yet implemented",
        input: req.body
    });
});

// the connection to mongoDB
mongoose.connect("mongodb+srv://matteprov_db_user:RiUoeM6WdN9ZVCYn@cluster0.vy9yeff.mongodb.net/?appName=Cluster0")
    .then(() => console.log("connected to MongoDB"))
    .catch(err => console.error("MongoDB error", err));


//here i start the server
app.listen(3001, () => console.log("Backend is running on http://localhost:3001"));

