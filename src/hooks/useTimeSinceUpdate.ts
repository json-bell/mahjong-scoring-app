import { useEffect, useRef, useState, type DependencyList } from "react";

const useTimeSinceUpdate = <T extends string>(
  times: { timeMs: number; slug: T }[],
  deps: DependencyList
) => {
  const initialTime: T = times.sort((a, b) => a.timeMs - b.timeMs)[0].slug;

  const [timeSinceUpdate, setTimeSinceUpdate] = useState<T>(initialTime);
  const cleanupRef = useRef<() => void | null>(null);

  const resetTimeSinceUpdate = (): (() => void) => {
    // Reset - set up initial time, call previous cleanup
    setTimeSinceUpdate(initialTime);
    cleanupRef.current?.();

    const timeoutIds = times.map(({ slug, timeMs }) =>
      setTimeout(() => {
        setTimeSinceUpdate(slug);
      }, timeMs)
    );

    const newCleanup = () => {
      timeoutIds.forEach((id) => {
        clearTimeout(id);
      });
    };
    cleanupRef.current = newCleanup;
    return newCleanup;
  };

  useEffect(resetTimeSinceUpdate, deps);

  return { timeSinceUpdate, resetTimeSinceUpdate };
};

export default useTimeSinceUpdate;
