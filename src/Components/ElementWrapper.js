import React, { useRef } from "react";
import classNames from "classnames";
import { setElementStyle } from "./common";
const ElementWrapper = ({ childRef, children, setTargetElement, styles }) => {
  return (
    <div
      ref={childRef}
      className={classNames("hightlighter")}
      onMouseOver={() => setTargetElement(childRef)}
      onClick={() => setTargetElement(childRef)}
      style={{ ...styles }}
    >
      {children}
    </div>
  );
};
export default ElementWrapper;
