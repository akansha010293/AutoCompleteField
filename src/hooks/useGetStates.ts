import { useEffect, useState } from "react";
import { ResultItem } from "../components/ResultsList/ResultsList";

export const useGetStates = (apiUrl: string) => {
  const [stateList, setStateList] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch states");
        const data: ResultItem[] = await res.json();
        setStateList(data);
      } catch (err: any) {
        setError(
          err.message ??
            "The page is currently down. Please try after sometime."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  return { stateList, loading, error };
};
