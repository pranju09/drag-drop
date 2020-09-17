import React from 'react';
import classNames from "classnames";
const ElementWrapper = ({refName,children,selected,setTargetElement}) => {
    return (
    <div 
        className={classNames("moveable",refName, {selected_movable: selected == refName})} 
        onMouseOver={()=> setTargetElement(refName)}
        onClick={()=> setTargetElement(refName)}
    >
        {children}
    </div>
    )
}
export default ElementWrapper;

