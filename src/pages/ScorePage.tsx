import { Link } from "react-router-dom";
import { HandScorer } from "../components/HandScorer/HandScorer";

const ScorePage: React.FC = () => {
  return (
    <>
      <p>
        Mahjong Scoring - App Work in progress. You can check out the GitHub
        project{" "}
        <Link
          to="https://github.com/json-bell/mahjong-scoring-app"
          target="_blank"
        >
          here
        </Link>
      </p>
      <p>
        Check out the{" "}
        <Link to="/score/rules">currently implemented Mahjong hands</Link>, or
        see directly for yourself with the{" "}
        <Link to="https://github.com/json-bell/mahjong-api" target="_blank">
          Python API GitHub repository
        </Link>
      </p>
      <HandScorer />
    </>
  );
};

export default ScorePage;
