import React from "react";
import "./styles.scss";

const Button = ({
  children,
  text,
  size,
  onSubmitHandler,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${className} groups-post-btn groups-post-btn--${size}`}
      type="button"
      onClick={() => onSubmitHandler()}
    >
      {children} {text}
    </button>
  );
};

export default Button;
