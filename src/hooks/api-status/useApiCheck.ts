import { useEffect, useState } from "react";
import { getHealthCheck } from "../../api";

interface ApiCheck {
  isReady: boolean;
  error: string | null;
  onReload: () => void;
}

export function useApiCheck(/* checkIntervalMs = 20000 */): ApiCheck {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [forceReload, setForceReload] = useState<number>(0);
  const onReload = () => {
    setForceReload((curr) => curr + 1);
  };

  useEffect(() => {
    const doHealthCheck = async () => {
      setError(null);
      setIsReady(false);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 200)
      );

      const response = await getHealthCheck();

      console.log(response.status);

      if (response.code === "ERR_NETWORK") setError("Network Error");
      else if (response.status === 200) setIsReady(true);
      else if (response.status === 400) setError(response.message);
      else setError("Unknown Error");
    };

    doHealthCheck().catch((err) => {
      throw new Error(err);
    });
  }, [forceReload]);

  return { isReady, error, onReload };
}
