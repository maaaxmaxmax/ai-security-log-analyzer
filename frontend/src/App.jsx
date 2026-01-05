import AttackControls from "./components/AttackControls.jsx";
import LogList from "./components/LogList.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>AI Security Log Analyzer</h1>

      <AttackControls />
      <LogList />
    </div>
  );
}

export default App;
