import { useEffect, useState } from "react";
// import { apiClient } from "../api/hey-api";
import { getHealthCheck } from "../../api";

interface ApiCheck {
  isReady: boolean;
  error: string | null;
}

export function useApiCheck(/* checkIntervalMs = 20000 */): ApiCheck {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const doHealthCheck = async () => {
      const response = await getHealthCheck();

      if (response.status === 200) setIsReady(true);
      else setError(JSON.stringify(response.error));
    };

    doHealthCheck().catch((err) => setError(String(err)));
  }, []);

  return { isReady, error };
}
