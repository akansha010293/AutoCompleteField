import { ResultItem } from "../components/ResultsList/ResultsList";

export function filterList(list: ResultItem[], input: string): ResultItem[] {
  return list.filter((stateListItem) =>
    stateListItem.name.toLowerCase().startsWith(input.toLowerCase())
  );
}
