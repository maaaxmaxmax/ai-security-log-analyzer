import Log from "../models/Log.js";

function now() {
    return new Date().toISOString();
}

//brute force attack
export async function simulateBruteForce() {
    const logs = [];

    for (let i = 0; i < 8; i++) {
        logs.push({
            timestamp: new Date(Date.now() + i * 200).toISOString(),
            ip: "185.22.15.90",
            action: "LOGIN_FAIL",
            username: "admin",
            message: `Failed login attempt #${i + 1}`
        });
    }

    return await Log.insertMany(logs);
}

//IP scan
export async function simulateIPScan() {
    const logs = [];
    const attackerIP = "103.44.22.19";

    for (let i = 0; i < 20; i++) {
        const port = Math.floor(Math.random() * 60000) + 1;

        logs.push({
            timestamp: new Date(Date.now() + i * 300).toISOString(),
            ip: attackerIP,
            action: "PORT_SCAN",
            username: null,
            message: `Scan attempt on port ${port}`
        });
    }

    return await Log.insertMany(logs);
}

//Failed burst login

export async function simulateFailedBurst() {
    const logs = [];
    const attackerIP = "66.12.44.91";
    const username = "noob";
    const attempts = 12;

    for (let i = 0; i < attempts; i++) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + i);

        logs.push({
            timestamp: time.toISOString(),
            ip: attackerIP,
            action: "LOGIN_FAIL_BURST",
            username,
            message: `Rapid burst failed login attempt #${i + 1}`
        });
    }

    return await Log.insertMany(logs);
}
    
//night-time attack
    export async function simulateNightTime() {
    const logs = [];

    for (let i = 0; i < 6; i++) {
        const d = new Date();
        d.setMinutes(d.getMinutes() - i);

        logs.push({
            timestamp: d.toISOString(),
            ip: "51.22.19.73",
            action: "LOGIN_SUCCESS_NIGHT",
            username: "admin",
            message: "Suspicious night-time login"
        });
    }

    return await Log.insertMany(logs);
}
