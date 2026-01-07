import { useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

function AttackControls({ onAIResult }) {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function triggerAttack(type) {
        setLoading(true);
        setStatus(`Simulating ${type} attack...`);

        try {
            const response = await fetch(`http://localhost:3001/api/sim/${type}`, {
                method: "POST",
            });

            const data = await response.json();
            setStatus(`${type} attack simulated (${data.count} logs created)`);
        } catch (err) {
            console.error(err);
            setStatus(`Failed to simulate ${type} attack`);
        } finally {
            setLoading(false);
        }
    }

    async function analyze(type) {
        setStatus(`Analyzing ${type} logs with AI...`);

        try {
            const res = await fetch(`http://localhost:3001/api/analyze/${type}`, {
                method: "POST",
            });

            const data = await res.json();

            setStatus("AI analysis complete.");

            // send result to App.jsx
            onAIResult(data);

        } catch (err) {
            console.error(err);
            setStatus("AI analysis failed.");
        }
    }

    return (
        <Card sx={{ width: "100%", mb: 4, backgroundColor: "#1e1e1e", color: "white" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Attack Simulator
                </Typography>

                {/* Attack Buttons */}
                <Button 
                    variant="contained"
                    color="error"
                    onClick={() => triggerAttack("bruteforce")}
                    disabled={loading}
                    sx={{ mb: 1 }}
                >
                    Brute Force Attack
                </Button>

                <Button 
                    variant="contained"
                    color="warning"
                    onClick={() => triggerAttack("nighttime")}
                    disabled={loading}
                    sx={{ mb: 1 }}
                >
                    Night-Time Attack
                </Button>

                <Button 
                    variant="contained"
                    color="info"
                    onClick={() => triggerAttack("ipscan")}
                    disabled={loading}
                    sx={{ mb: 1 }}
                >
                    IP Scan Attack
                </Button>

                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={() => triggerAttack("failedburst")}
                    disabled={loading}
                    sx={{ mb: 2 }}
                >
                    Failed Login Burst
                </Button>

                {/* AI buttons */}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    AI Analysis
                </Typography>

                <Button onClick={() => analyze("bruteforce")} sx={{ color: "#fff" }}>
                    Analyze Brute Force
                </Button>

                <Button onClick={() => analyze("burst")} sx={{ color: "#fff" }}>
                    Analyze Burst Logins
                </Button>

                <Button onClick={() => analyze("night")} sx={{ color: "#fff" }}>
                    Analyze Night Logins
                </Button>

                <Button onClick={() => analyze("portscan")} sx={{ color: "#fff" }}>
                    Analyze Port Scan
                </Button>

                {/* Status */}
                <Typography sx={{ mt: 2, opacity: 0.8 }}>
                    {status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AttackControls;
