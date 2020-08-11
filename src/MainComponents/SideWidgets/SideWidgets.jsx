import React, {useState, useEffect} from "react";
import EmptyState from "../../SharedComponents/EmptyState/EmptyState"; 
import Spinner from "../../SharedComponents/Loader/Loader";
import "./styles.scss"; 

import {getUsers_service} from "../../Services/sitecore-services" 

const SideWidgets = ({ header, data, children, type, emptyState }) => {    
  const [membersInfo, setMembersInfo] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);   
  async function fetchMembersInfo(){   
    setIsLoading(true)  
    const response = await getUsers_service(data);  
    setMembersInfo(response.data);  
    setIsLoading(false);
  }  
  useEffect(()=>{ 
    if(type === "Listing" && data){ 
      fetchMembersInfo();
    }
  },[data]) 
  function renderWidgetContent() { 
    if (membersInfo && !isLoading) {
      return membersInfo.length > 0 ? (
        membersInfo.map((item, i) => {
          return (
            <div key={i} className="groups-widget-wrapper__item">
              <img
                alt="userimage"
                className="groups-widget-wrapper__item__image"
                src={item.image ? item.image : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"}
              />
              <div className="groups-widget-wrapper__item__text">
                <a href="#" className="title">
                  {item.displayName}
                </a>
                <p className="subtitle">{item.jobTitle}</p>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState message={emptyState} />
      );
    }
  }
  return (
    <div className="groups-widget-wrapper">
      <div className="widget-header">
        <h5>{header}</h5>
        {children}
      </div>
      {type === "Listing" ? ( 
        isLoading ? <Spinner /> :
        renderWidgetContent()
      ) : (
        <div className="text-wrapper">
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};
export default SideWidgets;
