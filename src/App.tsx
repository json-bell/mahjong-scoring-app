import "./App.css";
import { ApiStatusCheck } from "./components/ApiStatusCheck";
import { HandScorer } from "./components/HandScorer/HandScorer";

function App() {
  return (
    <>
      Mahjong Scoring - App Work in progress. You can check out the GitHub
      project{" "}
      <a href="https://github.com/json-bell/mahjong-scoring-app">here</a>
      <ApiStatusCheck />
      <HandScorer />
    </>
  );
}

export default App;
