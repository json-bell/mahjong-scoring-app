import type { ReactNode } from "react";
import { useApiCheck } from "../../hooks/useApiCheck";

export function ApiStatusCheck(): ReactNode {
  const apiCheck = useApiCheck();

  return (
    <div>
      This is the APICHECK result:
      <br />
      <br />`{JSON.stringify(apiCheck)}`
    </div>
  );
}
