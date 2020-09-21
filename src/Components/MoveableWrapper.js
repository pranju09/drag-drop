import React, { creat, useRef, useState } from "react";
import Moveable from "react-moveable";
import classNames from "classnames";
import ElementWrapper from "./ElementWrapper";

const MoveableWrapper = ({
  targetElem,
  children,
  styles,
  withGutterBoxWidth,
  boxWidth,
  withGutterBoxHeight,
  boxHeight,
}) => {
  let sw, ew, occupiedWidth, sh, eh, occupiedHeight, direction;
  const [frame] = React.useState({
    translate: [0, 0],
    rotate: 0,
  });

  const getBlockMultiplier = (diff = 0, dir, vertical = 0) => {
    let fStep;
    if (vertical) fStep = dir === 1 ? boxHeight / 2 + 16 : boxHeight / 2;
    // (h/2)+gh : h/2
    else fStep = dir === 1 ? boxWidth / 2 + 24 : boxWidth / 2; // (w/2)+gw : w/2
    console.log({ fStep, diff });
    diff = Math.abs(diff);
    if (diff < fStep) return 0;
    diff = diff - fStep;
    let boxSize = vertical ? withGutterBoxHeight : withGutterBoxWidth;
    var pos = diff / boxSize;
    return Math.ceil(pos) * dir;
  };

  return (
    <>
      {targetElem && (
        <Moveable
          ref={targetElem}
          target={targetElem.current}
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
                Math.round(top / withGutterBoxHeight) * withGutterBoxHeight,
              newLeft =
                Math.round(left / withGutterBoxWidth) * withGutterBoxWidth;
            target.style.top = newTop + "px";
            target.style.left = newLeft + "px";
          }}
          onResizeStart={(e) => {
            sw = e.clientX;
            sh = e.clientY;
            occupiedWidth = e.target.getBoundingClientRect().width - 2;
            occupiedWidth = Math.floor(
              (occupiedWidth + 24) / withGutterBoxWidth
            ); //  To get occupied boxes : width
            occupiedHeight = e.target.getBoundingClientRect().height - 2;
            occupiedHeight = Math.floor(
              (occupiedHeight + 16) / withGutterBoxHeight
            ); //  To get occupied boxes : height
            // console.log({ startBlockSize: occupiedWidth, sw });
          }}
          onResize={({ target, width, height, drag }) => {
            const beforeTranslate = drag.beforeTranslate;
            frame.translate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          onResizeEnd={(e) => {
            let horizontalMultiplier, verticalMultiplier;
            ew = e.clientX;
            eh = e.clientY;

            const diffInWidth = ew - sw;
            if (diffInWidth > 0) {
              horizontalMultiplier = getBlockMultiplier(diffInWidth, 1);
            } else {
              horizontalMultiplier = getBlockMultiplier(diffInWidth, -1);
            }
            e.target.style.width =
              (occupiedWidth + horizontalMultiplier) * withGutterBoxWidth -
              26 +
              "px";

            const diffInHeight = eh - sh;
            if (diffInHeight > 0) {
              verticalMultiplier = getBlockMultiplier(diffInHeight, 1, 1);
            } else {
              verticalMultiplier = getBlockMultiplier(diffInHeight, -1, 1);
            }
            e.target.style.height =
              (occupiedHeight + verticalMultiplier) * withGutterBoxHeight -
              18 +
              "px";
          }}
          onRotate={({ target, left, top, beforeRotate }) => {
            frame.rotate = beforeRotate;
            target.style.top =
              Math.round(top / withGutterBoxHeight) * withGutterBoxHeight +
              "px";
            target.style.left =
              Math.round(left / withGutterBoxWidth) * withGutterBoxWidth + "px";
          }}
        ></Moveable>
      )}
      {children}
    </>
  );
};

export default React.memo(MoveableWrapper);
