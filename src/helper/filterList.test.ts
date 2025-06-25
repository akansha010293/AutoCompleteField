import { filterList } from "./filterList";
import { ResultItem } from "../components/ResultsList/ResultsList";

const states: ResultItem[] = [
  { name: "Victoria", abbreviation: "VIC" },
  { name: "New South Wales", abbreviation: "NSW" },
  { name: "Queensland", abbreviation: "QLD" },
];

test("filters by prefix, case-insensitive", () => {
  expect(filterList(states, "v")).toEqual([
    { name: "Victoria", abbreviation: "VIC" },
  ]);
  expect(filterList(states, "QUEEN")).toEqual([
    { name: "Queensland", abbreviation: "QLD" },
  ]);
});

test("returns all if input is empty", () => {
  expect(filterList(states, "")).toEqual(states);
});

test("returns empty if no match", () => {
  expect(filterList(states, "zzz")).toEqual([]);
});
