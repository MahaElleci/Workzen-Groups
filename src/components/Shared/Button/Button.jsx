import React from "react";

const Button = ({text,onSubmitHandler}) => {
  return (
    <button className="post-btn" type="submit" onSubmit={()=>onSubmitHandler()}>
     {text}
    </button>
  );
};

export default Button;
