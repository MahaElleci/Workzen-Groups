import React from "react";
import "./styles.scss";

function HeaderBar({ title, tabs, selectTab, selectedTab, children }) {
  return (
    <div className="groups-bar-wrapper d-md-flex">
      {!tabs && (
        <div className="groups-bar-wrapper__title">
          <h5>{title}</h5>
        </div>
      )}
      {tabs &&
        tabs.map((item, i) => {
          return (
            <div key={i} className="groups-bar-wrapper__title">
              <a
                className={item.id === selectedTab ? "selected" : ""}
                onClick={() => selectTab(item.id)}
              >
                {item.text}
              </a>
            </div>
          );
        })}
      <div className="groups-bar-wrapper__actions-items">{children}</div>
    </div>
  );
}

export default HeaderBar;
