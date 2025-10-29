import { useEffect, useState } from "react";
import { readScoringRules, type ReadScoringRulesResponses } from "../../api";

const useScoringRules = () => {
  const [data, setData] = useState<ReadScoringRulesResponses["200"] | null>(
    null
  );
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await readScoringRules();
      if (data) setData(data);
      if (error) setError(error);
      setLoading(false);
    };

    fetch().catch((err) => console.error(err));
  }, []);

  const rules = Object.entries(data ?? {}).map(([, rule]) => rule);

  return { rules, error, loading };
};

export default useScoringRules;
