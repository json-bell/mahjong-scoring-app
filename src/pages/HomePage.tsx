import { HandScorer } from "../components/HandScorer/HandScorer";

const HomePage: React.FC = () => {
  return (
    <>
      <div>
        Mahjong Scoring - App Work in progress. You can check out the GitHub
        project{" "}
        <a href="https://github.com/json-bell/mahjong-scoring-app">here</a>
      </div>

      <HandScorer />
    </>
  );
};

export default HomePage;
