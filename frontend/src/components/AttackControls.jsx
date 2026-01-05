import { useState } from "react";

// MUI imports
import { Card, CardContent, Button, Typography } from "@mui/material";

function AttackControls() {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function triggerBruteForce() {
        setLoading(true);
        setStatus("Simulating brute force attack...");

        try {
            const response = await fetch("http://localhost:3001/api/sim/bruteforce", {
                method: "POST",
            });

            const data = await response.json();

            setStatus(`Brute force attack simulated (${data.count} logs created)`);
        } catch (err) {
            console.error(err);
            setStatus("Failed to simulate brute force attack");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card sx={{ maxWidth: 400, mb: 4, backgroundColor: "#1e1e1e", color: "white" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Attack Simulator
                </Typography>

                <Button 
                    variant="contained" 
                    color="error"
                    onClick={triggerBruteForce}
                    disabled={loading}
                >
                    {loading ? "Simulating..." : "Simulate Brute Force Attack"}
                </Button>

                <Typography sx={{ mt: 2 }}>
                    {status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AttackControls;
