import React, { Dispatch, SetStateAction, useRef } from "react";
import "./ResultsList.css";

// Define the structure of each item
export interface ResultItem {
  name: string;
  abbreviation: string;
}

// Define the props for ResultsList
interface ResultsListProps {
  items: ResultItem[];
  onSelect: Dispatch<SetStateAction<ResultItem | undefined>>;
  setShowResultList: Dispatch<SetStateAction<boolean>>;
  className?: string;
  [key: string]: any;
}

const ResultsList: React.FC<ResultsListProps> = ({
  className = "",
  onSelect,
  items,
  setShowResultList,
  ...otherProps
}) => {
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  if (items.length === 0) return;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = index + 1;
      if (next < items.length) {
        listItemRefs.current[next]?.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = index - 1;
      if (prev >= 0) listItemRefs.current[prev]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSelect(items[index]);
    }
  };

  return (
    <ul
      id="results-list"
      role="listbox"
      className={`ResultsList ${className}`}
      {...otherProps}
    >
      {items.map((item, index) => (
        <li
          ref={(el) => {
            listItemRefs.current[index] = el;
          }}
          role="option"
          aria-selected
          tabIndex={0}
          key={`resultList-item-${index}-${item.abbreviation}`}
          className="ResultsList-item"
          onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) =>
            handleKeyDown(e, index)
          }
          onClick={() => {
            onSelect(item);
            setShowResultList(false);
          }}
        >
          {item.name}, {item.abbreviation.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export const MemoizedResultList = React.memo(ResultsList);
