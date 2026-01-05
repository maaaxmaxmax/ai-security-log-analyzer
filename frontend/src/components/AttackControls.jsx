import { useState } from "react";

function AttackControls() {
    const [status, setStatus] = useState("");

    async function triggerBruteForce() {
        setStatus("Simulating brute force attack...");

        try {
            const response = await fetch("http://localhost:3001/api/sim/bruteforce", {
                method: "POST",
            });

            const data = await response.json();
            console.log("Simulation result:", data);

            setStatus(`Brute force attack simulated (${data.count} logs created)`);
        } catch (err) {
            console.error(err);
            setStatus("Failed to simulate brute force attack");
        }
    }

    return (
        <div>
            <h3>Attack simulator</h3>
            <button onClick={triggerBruteForce}>
                Simulate brute force attack
            </button>
            <p>{status}</p>
        </div>
    );
}

export default AttackControls;
