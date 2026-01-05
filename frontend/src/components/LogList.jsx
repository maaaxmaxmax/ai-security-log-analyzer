import { useEffect, useState } from "react";

function LogList() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadLogs() {
            try {
                const response = await fetch("http://localhost:3001/api/logs");
                const data = await response.json();
                setLogs(data);
            } catch (err) {
                console.error("Error loading logs", err);
            } finally {
                setLoading(false);
            }
        }

        loadLogs();
    }, []);

    if (loading) return <p>Loading logs...</p>;

    return (
        <div>
            <h2>Security Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <strong>{log.timestamp}</strong> — {log.ip} — {log.action}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LogList;
