import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  MemoizedResultList,
  ResultItem,
} from "../components/ResultsList/ResultsList";
import { useGetStates } from "../hooks/useGetStates";
import { useClickOutside } from "../hooks/useClickOutSide";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { API_URL } from "../constant";
import { filterList } from "../helper/filterList";

export const SearchPage = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<ResultItem | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = React.useState<string>("");
  const [debouncedInput] = useDebounce(inputValue, 300);

  const [isOpen, setIsOpen] = useState(false);
  const [showResultList, setShowResultList] = useState(false);

  const { stateList, loading, error } = useGetStates(API_URL);

  useClickOutside(ref, () => setShowResultList(false), showResultList);

  const filterStateList = filterList(stateList, debouncedInput);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section className="searchBox">
        <div className="searchBox-inputGroup">
          <label htmlFor="search-input" className="searchBox-label">
            State
          </label>
          <div className="searchBox-inputContainer" ref={ref}>
            <div className="searchBox-inputWrapper">
              <Input
                id="search-input"
                aria-autocomplete="list"
                aria-controls="results-list"
                value={selectedState ? selectedState.name : inputValue}
                onChange={setInputValue}
                placeholder="Search a state"
                className="searchBox-input"
                onClick={() => setShowResultList(true)}
              />
              <Button
                onClick={() => {
                  setInputValue("");
                  setIsOpen(true);
                }}
                className="searchBox-button"
                aria-label="Clear and show selected state"
              />
            </div>
            {showResultList && (
              <MemoizedResultList
                items={filterStateList}
                onSelect={setSelectedState}
                className="searchBox-dropdown"
              />
            )}
          </div>
        </div>
      </section>

      {selectedState && isOpen && (
        <Modal
          title="Your selected state"
          isOpen
          onClose={() => {
            setIsOpen(false);
            setSelectedState(undefined);
          }}
        >
          <p>
            Your selected state is : {selectedState.name} ,
            {selectedState.abbreviation}
          </p>
        </Modal>
      )}
    </div>
  );
};
