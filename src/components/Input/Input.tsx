import React, {
  useState,
  useEffect,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";
import "./Input.css";
import { useDebounce } from "use-debounce";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = "",
  ...otherProps
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue] = useDebounce(inputValue, 500);
  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
    console.log(inputValue);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(debouncedValue);
  };

  return (
    <input
      className={`Input ${className}`}
      type="text"
      value={inputValue}
      onChange={handleChange}
      {...otherProps}
    />
  );
};
