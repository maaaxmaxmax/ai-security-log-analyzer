import Log from "../models/Log.js";

function now() {
    return new Date().toISOString();
}


export async function simulateBruteForce() {
    const logs = [];

    for (let i = 0; i < 8; i++) {
        logs.push({
            timestamp: now(),
            ip: "185.22.15.90",
            action: "LOGIN_FAIL",
            username: "admin",
            message: `Failed login attempt #${i + 1}`
        });
    }

    // Save logs and return the saved documents
    const savedLogs = await Log.insertMany(logs);

    return savedLogs; 
}