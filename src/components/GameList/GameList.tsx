import type { GameOutSchema } from "../../api";
import useGames from "../../hooks/api/useGames";
import Link from "../InteractiveElements/Link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./GameList.module.scss";

export interface GameListProps {}

const GameList: React.FC<GameListProps> = () => {
  const { data, error, loading } = useGames();

  return (
    <>
      <h3>Available Games:</h3>
      {error && (
        <fieldset>
          <legend>ERROR</legend>
          {JSON.stringify(error)}
        </fieldset>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className={styles.gameList}>
          {data?.map((game) => {
            const createdAt = game.created_at
              ? new Date(game.created_at).toDateString()
              : null;
            return (
              <li key={game.id} style={{ listStyle: "none" }}>
                <Link to={`/game/${game.id}`} className={styles.gameListItem}>
                  <h4 style={{ textAlign: "left", display: "inline-block" }}>
                    Game {game.id}:
                  </h4>
                  {createdAt && <p>Created on {createdAt}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default GameList;
