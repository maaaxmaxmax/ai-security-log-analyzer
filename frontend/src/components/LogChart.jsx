import { useEffect, useState } from "react";
import DashboardCard from "./ui/DashboardCard";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function LogChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // poll backend every second
        const interval = setInterval(async () => {
            try {
                const response = await fetch("http://localhost:3001/api/metrics/realtime");
                const metrics = await response.json();

                const newEntry = {
                    time: new Date().toLocaleTimeString(),

                    brute: metrics.LOGIN_FAIL,
                    burst: metrics.LOGIN_FAIL_BURST,
                    scan: metrics.PORT_SCAN,
                    night: metrics.LOGIN_SUCCESS_NIGHT
                };

                setData(prev => {
                    const updated = [...prev, newEntry];

                    // keep only last 30 points for a smooth sliding window
                    if (updated.length > 30) updated.shift();

                    return updated;
                });
            } catch (err) {
                console.error("Realtime metrics error:", err);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardCard title="Real-Time Threat Monitoring">
            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
                        <YAxis tick={{ fill: "#aaa" }} />
                        <Tooltip contentStyle={{ background: "#222", border: "1px solid #444" }} />

                        {/* lines for each attack */}
                        <Line type="monotone" dataKey="brute" stroke="#ff1744" strokeWidth={3} dot={false} name="Brute Force" />
                        <Line type="monotone" dataKey="burst" stroke="#2979ff" strokeWidth={3} dot={false} name="Burst Login" />
                        <Line type="monotone" dataKey="scan" stroke="#ff9100" strokeWidth={3} dot={false} name="IP Scan" />
                        <Line type="monotone" dataKey="night" stroke="#00e676" strokeWidth={3} dot={false} name="Night Login" />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
}
