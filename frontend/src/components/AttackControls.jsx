import { useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

function AttackControls() {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    /* async function triggerAttack(type) {
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
    } */


        async function triggerAttack(type) {
            setLoading(true);
            setStatus(`simulating ${type} attack...`);

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

     return (
        <Card sx={{ maxWidth: 450, mb: 4, backgroundColor: "#1e1e1e", color: "white" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Attack Simulator
                </Typography>
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
>
    Failed Login Burst
</Button>
               
                

                <Typography sx={{ mt: 2, opacity: 0.8 }}>
                    
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AttackControls;
