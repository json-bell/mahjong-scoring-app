import { useEffect, useState } from "react";
import { readGames, type GameOutSchema } from "../../api";

const useGames = () => {
  const [data, setData] = useState<GameOutSchema[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await readGames();
      if (data) setData(data);
      if (error) setError(error);
      setLoading(false);
    };

    fetch().catch((err) => console.error(err));
  }, []);

  return { data, error, loading };
};

export default useGames;
