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
  id: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className = "",
  id,
  ...otherProps
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={id}
      className={`Input ${className}`}
      type="text"
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );
};
