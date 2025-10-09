import "./App.css";
import { rawTileSvgLookup } from "./assets/tiles";
import { ApiStatusCheck } from "./components/ApiStatusCheck";
import { HandScorer } from "./components/HandScorer/HandScorer";

function App() {
  return (
    <>
      Mahjong Scoring - App Work in progress. You can check out the GitHub
      project{" "}
      <a href="https://github.com/json-bell/mahjong-scoring-app">here</a>
      <ApiStatusCheck />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
        {Object.entries(rawTileSvgLookup).map(([key, svgFile]) => {
          return (
            <div
              style={{
                border: "1px solid grey",
                padding: "4px",
                margin: "4px",
              }}
              key={key}
            >
              {key}
              <img src={svgFile} alt={key} />
            </div>
          );
        })}
      </div>
      <HandScorer />
    </>
  );
}

export default App;
