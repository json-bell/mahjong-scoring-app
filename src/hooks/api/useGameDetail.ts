import { useEffect, useState } from "react";
import { readGameById, type GameDetailSchema } from "../../api";

const useGameDetail = (gameId: number) => {
  const [data, setData] = useState<GameDetailSchema | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await readGameById({ path: { game_id: gameId } });
      if (data) setData(data);
      if (error) setError(error);
      setLoading(false);
    };

    fetch().catch((err) => console.error(err));
  }, []);

  return { data, error, loading };
};

export default useGameDetail;
