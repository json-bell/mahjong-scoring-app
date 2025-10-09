import type { ReactNode } from "react";
import { useApiCheck } from "../../hooks/api-status/useApiCheck";

export const ApiStatusCheck = (): ReactNode => {
  const { error, isReady } = useApiCheck();
  const status: "error" | "loading" | "ready" = isReady
    ? "ready"
    : error
    ? "error"
    : "loading";

  return (
    <div
      style={{
        padding: "20px",
        width: "fit-content",
      }}
    >
      API Status:
      <div
        style={{
          backgroundColor: "black",
          padding: "8px",
          color: colorLookup[status],
          maxWidth: "200px",
          border: "1px solid white",
          borderRadius: "16px",
        }}
      >
        {textLookup[status]}
      </div>{" "}
    </div>
  );
};

const colorLookup = {
  ready: "lightgreen",
  error: "magenta",
  loading: "yellow",
};
const textLookup = {
  ready: "API Connection Ready",
  loading: "Loading...",
  error:
    "Error :( - Please refresh and try again. Note, Render's cold load may take up to 3 minutes to spin up the backend",
};
