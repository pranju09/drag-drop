import React from "react";
import classNames from "classnames";
import { setElementStyle } from "./common";
const ElementWrapper = ({ ref, refName, children, setTargetElement }) => {
  return (
    <div
      //   ref={wrapper}
      className={classNames("hightlighter", "wrapper")}
      //   onMouseOver={() =>
      //     setTargetElement({ ref: wrapper, target: wrapper.current })
      //   }
      //   onClick={() =>
      //     setTargetElement({ ref: wrapper, target: wrapper.current })
      //   }
    >
      {children}
    </div>
  );
};
export default ElementWrapper;
