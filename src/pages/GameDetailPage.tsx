import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const GameDetailPage: React.FC = () => {
  const { gameId } = useParams();
  return (
    <>
      Game: {gameId}
      <br />
      <br />
      This page is not yet implemented. Please come back later <br />
      <br />
      <NotFoundPage />
    </>
  );
};

export default GameDetailPage;
