import { useEffect, useState } from "react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Bar, BarChart } from "recharts";
import DashboardCard from "./ui/DashboardCard";

// Helper: Pick a color depending on intensity
function intensityColor(value) {
    if (value === 0) return "#222";           
    if (value < 5) return "#00695c";          
    if (value < 10) return "#00897b";         
    if (value < 20) return "#43a047";         
    if (value < 40) return "#fbc02d";         
    if (value < 60) return "#f57f17";         
    return "#d32f2f";                         
}

export default function Heatmap() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:3001/api/logs");
            const logs = await response.json();

            // Group logs by HOUR instead of minute
            const grouped = {};

            logs.forEach(log => {
                const hour = log.timestamp.slice(0, 13); // YYYY-MM-DDTHH
                grouped[hour] = (grouped[hour] || 0) + 1;
            });

            // Convert to recharts format
            const formatted = Object.entries(grouped).map(([hour, count]) => ({
                hour,
                count
            }));

            setData(formatted);
        }

        load();
    }, []);

    return (
        <DashboardCard title="Attack Intensity Heatmap">
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="hour" tick={{ fill: "#aaa" }} />
                        <YAxis tick={{ fill: "#aaa" }} />
                        <Tooltip
                            contentStyle={{ background: "#222", border: "1px solid #444" }}
                            labelStyle={{ color: "#ccc" }}
                        />
                        <Bar dataKey="count">
                            {data.map((entry, index) => (
                                <Cell key={index} fill={intensityColor(entry.count)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
}
