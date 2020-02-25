import React from "react";
import { useSelector } from "react-redux";

const SideWidgets = (props) => {
  const data = useSelector(state => state.workmates);
  return (
    <div className="widget-wrapper"> 
<h5 className="widget-header">{props.header}</h5>
      {data.map((item, i) => {
        return (
          <div key={i} className="widget-wrapper__item">
            <img className="widget-wrapper__item__image" src={item.image}/>
            <div className="widget-wrapper__item__text">
              <a href="#" className="title">{item.heading}</a>
              <p className="subtitle">{item.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SideWidgets;
