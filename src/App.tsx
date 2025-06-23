import React, { useEffect, useState } from "react";
import { ResultItem, ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/states.json";

const API_SAMPLE = [
  { name: "Sydney South", state: { abbreviation: "NSW" } },
  { name: "Sydney", state: { abbreviation: "NSW" } },
  { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
  { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
  { name: "Sydenham", state: { abbreviation: "VIC" } },
];

export default function App() {
  const [stateList, setStateList] = useState<ResultItem[]>([]);
  const [selectState, setSelectedState] = useState<ResultItem | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleSearchInput = () => {};

  useEffect(() => {
    const fetchStateList = async () => {
      const data = await fetch(API_URL);
      try {
        if (data.ok) {
          const jsonData = await data.json();
          setStateList(jsonData);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchStateList();
    setLoading(false);
  }, []);

  if (error) return <p>Error: {error}</p>;
  return (
    <section>
      TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
      &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
      <a href={`${API_URL}?q=${inputValue}`}>API</a>.
      <Input value={inputValue} onChange={setInputValue} />
      <Button onClick={handleSearchInput} />
    </section>
  );
}
