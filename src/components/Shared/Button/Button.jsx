import React from "react";
import './styles.scss';

const Button = ({text,onSubmitHandler}) => {
  return (
    <button className="post-btn" type="button" onClick={()=>onSubmitHandler()}>
     {text}
    </button>
  );
};

export default Button;
