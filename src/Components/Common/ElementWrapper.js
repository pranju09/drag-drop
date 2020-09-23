import React, { useRef } from "react";
import classNames from "classnames";
import { setElementStyle } from "../Common/main";
const ElementWrapper = ({ childRef, children, setTargetElement, styles }) => {
  return (
    <div
      ref={childRef}
      className={classNames("hightlighter")}
      onClick={(e) => {
        e.stopPropagation();
        setTargetElement(childRef);
      }}
      style={{ ...styles }}
    >
      {children}
    </div>
  );
};
export default React.memo(ElementWrapper);
