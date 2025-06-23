import React, { ButtonHTMLAttributes } from "react";
//@todo
// import iconPath from "./icons.svg";
import "./Button.css";

// Extend native button props, overriding `onClick` for custom typing
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  ...otherProps
}) => {
  return (
    <button
      type="button"
      className={`Button ${className}`}
      onClick={onClick}
      {...otherProps}
    >
      <svg viewBox="0 0 24 24" width="24" height="16">
        {/* <use xlinkHref={`${iconPath}#dls-icon-arrow-right`} /> */}
      </svg>
    </button>
  );
};
