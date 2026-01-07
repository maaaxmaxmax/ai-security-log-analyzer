import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Grid, Divider } from "@mui/material";

export default function LogList() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
    async function loadLogs() {
        try {
            const res = await fetch("http://localhost:3001/api/logs");
            const data = await res.json();
            setLogs(data);
        } catch (err) {
            console.error("Failed to fetch logs:", err);
        }
    }

    loadLogs(); // initial load

    const interval = setInterval(loadLogs, 2000); // fetch every 2 seconds

    return () => clearInterval(interval); // cleanup
}, []);


    // Helper: return only latest 5 of each category
    function getLatest(actionType) {
        return logs
            .filter(log => log.action === actionType)
            .slice(0, 5);
    }

    const sections = [
        {
            title: "Brute Force Attempts",
            action: "LOGIN_FAIL",
            color: "error"
        },
        {
            title: "Night-Time Logins",
            action: "LOGIN_SUCCESS",
            color: "warning"
        },
        {
            title: "IP Scan Activity",
            action: "PORT_SCAN",
            color: "info"
        },
        {
            title: "Burst Login Failures",
            action: "LOGIN_FAIL_BURST",
            color: "secondary"
        }
    ];

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Security Log Overview
            </Typography>

            <Grid container spacing={2}>
                {sections.map((section, idx) => {
                    const items = getLatest(section.action);

                    return (
                        <Grid item xs={12} md={6} lg={3} key={idx}>
                            <Card sx={{ background: "#1e1e1e", color: "white", p: 1 }}>
                                <CardContent>
                                    <Chip
                                        label={section.title}
                                        color={section.color}
                                        sx={{ mb: 1 }}
                                    />

                                    <Divider sx={{ mb: 1, borderColor: "#333" }} />

                                    {items.length === 0 && (
                                        <Typography sx={{ opacity: 0.6 }}>
                                            No recent activity
                                        </Typography>
                                    )}

                                    {items.map((log, i) => (
                                        <Typography key={i} sx={{ mb: 1 }}>
                                            <strong>{log.timestamp.slice(11, 19)}</strong> —{" "}
                                            {log.ip}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
