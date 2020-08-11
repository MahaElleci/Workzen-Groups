import React from 'react'; 
import Icon from "../IcoMoon/IcoMoon";
import './styles.scss';
const EmptyState = ({message, icon, color, size}) => {
    return <div className="emptyState_wrapper"> 
      <Icon  disableFill="true" color={color} icon={icon} size={size}/>
        <p>{message}</p>
     </div>
} 
export default EmptyState