import React from "react";
import "./ResultsList.css";

// Define the structure of each item
export interface ResultItem {
  name: string;
  state: {
    abbreviation: string;
  };
}

// Define the props for ResultsList
interface ResultsListProps {
  items: ResultItem[];
  onSelect: (item: ResultItem | undefined) => void;
  className?: string;
  [key: string]: any;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  className = "",
  onSelect,
  items,
  ...otherProps
}) => {
  if (items.length === 0) return;
  return (
    <ul className={`ResultsList ${className}`} {...otherProps}>
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className="ResultsList-item"
          onClick={() => onSelect(item)}
        >
          <button className="ResultsList-button">
            {item.name}, {item.state.abbreviation}
          </button>
        </li>
      ))}
    </ul>
  );
};
