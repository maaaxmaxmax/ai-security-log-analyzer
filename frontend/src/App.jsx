import { useState } from "react";
import AttackControls from "./components/AttackControls.jsx";
import LogList from "./components/LogList.jsx";
import LogChart from "./components/LogChart.jsx";
import Heatmap from "./components/Heatmap.jsx";
import AIResultPanel from "./components/AIResultPanel.jsx";
import DashboardLayout from "./layouts/DashBoardLayout.jsx";
import { Typography, Box } from "@mui/material";

function App() {
    const [aiResult, setAiResult] = useState(null);

    return (
        <Box sx={{ padding: "30px",
      width: "100vw",
      minHeight: "100vh",
      boxSizing: "border-box",
      display: "block", }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 4, fontWeight: "bold" }}>
                AI Security Log Analyzer
            </Typography>

            <DashboardLayout
                attackControls={<AttackControls onAIResult={setAiResult} />}
                aiPanel={<AIResultPanel result={aiResult} />}
                logOverview={<LogList />}
                threatChart={<LogChart />}
                
            />
        </Box>
    );
}

export default App;
