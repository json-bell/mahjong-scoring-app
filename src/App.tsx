import "./App.css";
import { ApiStatusCheck } from "./components/ApiStatusCheck";
import { HandScorer } from "./components/HandScorer/HandScorer";
import MeldInput from "./components/Inputs/MeldInput";
import { useMahjongMelds } from "./hooks/mahjong/useMahjongHands";

function App() {
  const { melds, onMeldChange } = useMahjongMelds();
  const meld = melds[0];
  return (
    <>
      <div>
        Mahjong Scoring - App Work in progress. You can check out the GitHub
        project{" "}
        <a href="https://github.com/json-bell/mahjong-scoring-app">here</a>
      </div>
      <MeldInput
        meld={meld}
        onMeldChange={(partialMeld) => {
          console.log("Updating meld to ", partialMeld);
          onMeldChange(0, partialMeld);
        }}
        name="Meld Input"
        inputId="unique=-meld"
      />
      <ApiStatusCheck />
      <HandScorer />
    </>
  );
}

export default App;
