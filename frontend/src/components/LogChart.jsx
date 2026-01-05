import { useEffect, useState } from "react";
import DashboardCard from "./ui/DashboardCard";

import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function LogChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:3001/api/logs");
            const logs = await response.json();

            const grouped = {};
            logs.forEach(log => {
                const minute = log.timestamp.slice(0, 16);
                grouped[minute] = (grouped[minute] || 0) + 1;
            });

            const chartData = Object.entries(grouped).map(([minute, count]) => ({
                minute,
                count
            }));

            setData(chartData);
        }

        load();
    }, []);

    return (
        <DashboardCard title="Logs Per Minute">
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="minute"
                            tick={{ fill: "#aaa" }}
                        />
                        <YAxis tick={{ fill: "#aaa" }} />
                        <Tooltip
                            contentStyle={{ background: "#222", border: "1px solid #444" }}
                            labelStyle={{ color: "#ccc" }}
                        />
                        <Line 
                            type="monotone"
                            dataKey="count"
                            stroke="#00e676"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
}
