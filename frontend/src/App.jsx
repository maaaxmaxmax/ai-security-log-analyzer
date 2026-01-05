import AttackControls from "./components/AttackControls.jsx";
import LogList from "./components/LogList.jsx";
import "./App.css";
import LogChart from "./components/LogChart.jsx";
import Heatmap from "./components/Heatmap.jsx";
import { Container, Typography } from "@mui/material";

function App() {
  return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography 
                variant="h4" 
                sx={{ color: "#fff", mb: 4, fontWeight: "bold" }}
            >
                AI Security Log Analyzer
            </Typography>

            <AttackControls />
            <LogList />
            <LogChart />
            <Heatmap />
        </Container>
  );
}

export default App;
