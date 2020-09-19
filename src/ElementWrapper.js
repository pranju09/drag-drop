import React from 'react';
import classNames from "classnames";
import { setElementStyle } from './common';
const ElementWrapper = ({ref,refName,children,setTargetElement}) => {
    return (
    <div 
        className={classNames("hightlighter",refName)} 
        onMouseOver={()=> setTargetElement(refName)}
        onClick={()=> setTargetElement(refName)}
        style={setElementStyle(children)}
    >
        {children}
    </div>
    )
}
export default ElementWrapper;

