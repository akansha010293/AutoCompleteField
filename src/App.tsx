import React, { useEffect, useState } from "react";
import { ResultItem, ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import "./App.css";
import { useDebounce } from "use-debounce";

const API_URL = "http://localhost:8010/proxy/states.json";

export default function App() {
  const [stateList, setStateList] = useState<ResultItem[]>([]);
  const [selectedState, setSelectedState] = useState<ResultItem | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [debouncedInput] = useDebounce(inputValue, 300); // ← debounce delay
  const filterStateList = stateList.filter((stateListItem) => {
    return stateListItem.name
      .toLowerCase()
      .startsWith(debouncedInput.toLowerCase());
  });

  /* ──────────────────────────────────────────────────────────
     1. Fetch once on mount
  ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch states");
        const data: ResultItem[] = await res.json();
        setStateList(data);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section>
      TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
      &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
      <a href={`${API_URL}?q=${inputValue}`}>API</a>.
      <Input
        value={inputValue}
        onChange={setInputValue}
        placeholder="Search a state"
      />
      <Button onClick={() => setInputValue("")} />
      <ResultsList items={filterStateList} onSelect={setSelectedState} />
      {selectedState && (
        <p>
          Your selected state is : {selectedState.name} ,
          {selectedState.abbreviation}
        </p>
      )}
    </section>
  );
}
