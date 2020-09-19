import React, { createRef, useRef, useState } from "react";
import Moveable from "react-moveable";
import classNames from "classnames";
import ElementWrapper from "./ElementWrapper";

const MoveableWrapper = ({
  refName,
  children,
  styles,
  withGutterBoxWidth,
  widthGutterBoxHeight,
}) => {
  let sw, ew, aw;
  const [frame] = React.useState({
    translate: [0, 0],
    rotate: 0,
  });
  const [targetElem, setTargetElement] = useState();
  let childRefs = useRef([]);

  const getBlockMultiplier = (diff, dir) => {
    const fStep = dir === 1 ? 46 + 24 : 46; // (w/2)+gw : w/2
    diff = Math.abs(diff);
    if (diff < fStep) return 0;
    diff = diff - fStep;
    var pos = diff / 116;
    return Math.ceil(pos) * dir;
  };
  console.log(childRefs);
  return (
    <>
      {targetElem && (
        <Moveable
          ref={targetElem.ref}
          target={targetElem.target}
          draggable={true}
          throttleDrag={0}
          resizable={true}
          throttleResize={0}
          rotatable={true}
          rotationPosition={"top"}
          throttleRotate={0}
          onDragStart={({ set, target, width }) => {
            set(frame.translate);
          }}
          onDrag={({ target, left, top, beforeRotate, currentTarget }) => {
            let newTop =
                Math.round(top / widthGutterBoxHeight) * widthGutterBoxHeight,
              newLeft =
                Math.round(left / withGutterBoxWidth) * withGutterBoxWidth;
            target.style.top = newTop + "px";
            target.style.left = newLeft + "px";
            console.log({ currentTarget, target });
          }}
          onResizeStart={(e) => {
            sw = e.clientX;
            aw = e.target.getBoundingClientRect().width - 2;
            aw = Math.floor((aw + 24) / 116); //  To get occupied boxes
            console.log({ startBlockSize: aw, sw });
          }}
          onResize={({ target, width, height, drag }) => {
            const beforeTranslate = drag.beforeTranslate;
            frame.translate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          onResizeEnd={(e) => {
            let multiplier;
            ew = e.clientX;
            const diff = ew - sw;
            console.log({ ew, sw, diff });
            if (diff > 0) {
              multiplier = getBlockMultiplier(diff, 1);
            } else {
              multiplier = getBlockMultiplier(diff, -1);
            }
            e.target.style.width = (aw + multiplier) * 116 - 26 + "px";
            console.log({ ew, diffBlockSize: multiplier });
          }}
          onRotate={({ target, left, top, beforeRotate }) => {
            frame.rotate = beforeRotate;
            target.style.top =
              Math.round(top / widthGutterBoxHeight) * widthGutterBoxHeight +
              "px";
            target.style.left =
              Math.round(left / withGutterBoxWidth) * withGutterBoxWidth + "px";
          }}
        ></Moveable>
      )}
      <div
        className={classNames("hightlighter", "wrapper")}
        // onMouseOver={() =>
        //   setTargetElement({
        //     ref: childRefs[refName],
        //     target: childRefs[refName].current,
        //   })
        // }
        // onClick={() =>
        //   setTargetElement({
        //     ref: childRefs[refName],
        //     target: childRefs[refName].current,
        //   })
        // }
        // onBlur={() => setTargetElement({})}
        style={{ ...styles }}
      >
        {children}
      </div>
    </>
  );
};

export default React.memo(MoveableWrapper);
