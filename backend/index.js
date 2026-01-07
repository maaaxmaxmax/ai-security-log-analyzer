import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Log from "./models/Log.js";
import dotenv from "dotenv";
import { analyzeLogs } from "./services/ai.js";
import { simulateBruteForce, simulateNightTime, simulateIPScan, simulateFailedBurst } from "./sim/attackSimulator.js";


console.log("Imported functions:", {
    simulateBruteForce,
    simulateNightTime,
    simulateIPScan,
    simulateFailedBurst
});

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


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

//night time attack
app.post("/api/sim/nighttime", async (req, res) => {
    try {
        const logs = await simulateNightTime();
        res.json({message: "Night-time login attack simulated", count: logs.length });
    } catch (err) {
        console.error("Night-time error", err);
        res.status(500).json({ error: "Night-time simulation failed"});
    }
});

//IP scan attack
app.post("/api/sim/ipscan", async (req, res) => {
    try {
        const logs = await simulateIPScan();
        res.json({message: "IP scan attack simulated", count: logs.length });
    } catch (err) {
        console.error("IP scan error", err);
        res.status(500).json({ error: "IP scan simulation failed"});
    }
});

//Login burst attack
app.post("/api/sim/failedburst", async (req, res) => {
    try {
        const logs = await simulateFailedBurst();
        res.json({message: "Failed burst attack simulated", count: logs.length });
    } catch (err) {
        console.error("Burst attack error", err);
        res.status(500).json({ error: "Failed burst simulation failed"});
    }
});

//AI analysis placeholder
app.post("/api/logs/analyze", async (req, res) => {
    try {
        const logs = await Log.find().sort({timestamp: -1 }).limit(10);
        const result = await analyzeLogs(logs);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "AI analysis failed"});
    }
});


// get AI analysis for each attack
app.post("/api/analyze/:type", async (req, res) => {
    const type = req.params.type;

    const queryMap = {
        bruteforce: { action: "LOGIN_FAIL" },
        burst: { action: "LOGIN_FAIL_BURST" },
        night: { action: "LOGIN_SUCCESS" },
        portscan: { action: "PORT_SCAN" }
    };

    const filter = queryMap[type];
    if (!filter) return res.status(400).json({error: "unknown attack type"});

    try {
        //get the last 20 logs
        const logs = await Log.find(filter).sort({ timestamp: -1 }).limit(20);

        if (logs.length === 0) {
            return res.json({
                message: "No logs found for this attack type"
            });
        }

        //run the ai analysis
        const aiReport = await analyzeLogs(logs);

        res.json(aiReport);
    } catch (err) {
        console.error("Analysis error:", err);
        res.status(500).json({error: "AI analysis failed"});
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



app.get("/api/metrics/realtime", async (req, res) => {
    
    // time window, the last 60 seconds
    try {
        const now = new Date();
        const cutoff = new Date(now.getTime() - 60 * 1000);

        // fetch the logs
        const recentLogs = await Log.find({
            timestamp: { $gte: cutoff.toISOString()}
        });

        // counter for each different type of attack
        const metrics = {
            LOGIN_FAIL: 0,
            LOGIN_FAIL_BURST: 0,
            PORT_SCAN: 0,
            LOGIN_SUCCESS_NIGHT: 0
        };

        // count each event
        recentLogs.forEach(log => {
            if (metrics[log.action] !== undefined) {
                metrics[log.action]++;
            }
        });

        // send the metrics to the frontend
        res.json({
            timestamp: now.toISOString(),
            ...metrics
        });
    } catch (err) {
        console.error("Error generating metrics:", err);
        res.status(500).json({ error: "could not generate metrics"});
    }
});


//here i place all the suspicious logs
app.get("/api/logs/suspicious", (req, res) => {
    res.json([]);
});


// the connection to mongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch(err => console.error("MongoDB error", err));

//api route
app.get("/", (req, res) => {
    res.send("API for AI logger is running");
});

//here i start the server
app.listen(3001, () => console.log("Backend is running on http://localhost:3001"));

