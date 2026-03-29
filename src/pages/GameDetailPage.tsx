import { useParams } from "react-router-dom";
import useGameDetail from "../hooks/api/useGameDetail";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import HandPreview from "../components/HandPreview/HandPreview";
import { Hand } from "../domain/hand";

const GameDetailPage: React.FC = () => {
  const { gameId } = useParams();
  const { data, error, loading } = useGameDetail(Number(gameId));

  return (
    <>
      <h2>Game: {gameId}</h2>
      <br />
      <br />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data?.created_at && (
            <h3>
              Game created at{" "}
              {new Date(data.created_at).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              on{" "}
              {new Date(data.created_at).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h3>
          )}
          <h4>Players</h4>
          {data?.players.map(({ name, player_slot, score }) => {
            return (
              <li>
                Player {player_slot}: {name} - score: {score}
              </li>
            );
          })}
          <h4>Hands</h4>
          {data?.hands.map((handSchema) => {
            // const { id, created_at, hand, player_slot, score } = handSchema
            const hand = Hand.fromSchema(handSchema.hand);
            return (
              <div key={handSchema.id} style={{ display: "flex" }}>
                <HandPreview hand={hand} />
              </div>
            );
          })}
        </>
      )}
      {error && JSON.stringify(error)}
    </>
  );
};

export default GameDetailPage;
