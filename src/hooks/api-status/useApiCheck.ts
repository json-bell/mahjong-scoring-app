import { useEffect, useState } from "react";
import { getHealthCheck } from "../../api";

export type ApiErrorString = "Network Error" | "Internal Error";

interface ApiCheck {
  isReady: boolean;
  error: null | ApiErrorString;
  onReload: () => void;
}

export function useApiCheck(/* checkIntervalMs = 20000 */): ApiCheck {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<null | ApiErrorString>(null);

  const [forceReload, setForceReload] = useState<number>(0);
  const onReload = () => {
    setForceReload((curr) => curr + 1);
  };

  useEffect(() => {
    const doHealthCheck = async () => {
      setError(null);
      setIsReady(false);
      const response = await getHealthCheck();

      if ("code" in response && response.code === "ERR_NETWORK")
        setError("Network Error");
      else if (response.status === 200) setIsReady(true);
      else setError("Internal Error");
    };

    doHealthCheck().catch((err) => {
      console.error(err);
    });
  }, [forceReload]);

  return { isReady, error, onReload };
}
