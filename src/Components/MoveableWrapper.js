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
  console.log("comp mounted");
  const [dimensions, setDimensions] = useState({
    sw: 0,
    ew: 0,
    occupiedWidth: 0,
    sh: 0,
    eh: 0,
    occupiedHeight: 0,
    direction: 0,
    startLeft: 0,
  });
  const [frame] = React.useState({
    translate: [0, 0],
    rotate: 0,
  });

  const getBlockMultiplier = (diff = 0, dir, vertical = 0) => {
    let fStep;
    if (vertical) fStep = dir === 1 ? boxHeight / 2 + 16 : boxHeight / 2;
    // (h/2)+gh : h/2
    else fStep = dir === 1 ? boxWidth / 2 + 24 : boxWidth / 2; // (w/2)+gw : w/2
    diff = Math.abs(diff);
    if (diff < fStep) return 0;
    diff = diff - fStep;
    let boxSize = vertical ? withGutterBoxHeight : withGutterBoxWidth;
    var pos = diff / boxSize;
    return Math.ceil(pos) * dir;
  };

  let {
    sw,
    ew,
    occupiedWidth,
    sh,
    eh,
    occupiedHeight,
    direction,
    startLeft,
  } = dimensions;
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
            startLeft =
              (e.target.getBoundingClientRect().left -
                e.target.parentElement.getBoundingClientRect().left) /
              withGutterBoxWidth;
            console.log({ startLeft });
            direction = e.direction;
            occupiedWidth = e.target.getBoundingClientRect().width - 2;
            occupiedWidth = Math.floor(
              (occupiedWidth + 24) / withGutterBoxWidth
            ); //  To get occupied boxes : width
            occupiedHeight = e.target.getBoundingClientRect().height - 2;
            occupiedHeight = Math.floor(
              (occupiedHeight + 16) / withGutterBoxHeight
            ); //  To get occupied boxes : height
          }}
          onResize={(e) => {
            const beforeTranslate = e.drag.beforeTranslate;
            frame.translate = beforeTranslate;
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          onResizeEnd={(e) => {
            let horizontalMultiplier, verticalMultiplier;
            ew = e.clientX;
            eh = e.clientY;

            let diffInWidth = ew - sw; // resizeWidth = endPos - startPos

            if (direction && direction[0] > 0) {
              if (diffInWidth > 0) {
                horizontalMultiplier = getBlockMultiplier(diffInWidth, 1);
              } else {
                horizontalMultiplier = getBlockMultiplier(diffInWidth, -1);
              }
            } else {
              // console.log("left width : ", startLeft - ew);
              if (diffInWidth < 0) {
                horizontalMultiplier = getBlockMultiplier(diffInWidth, -1);
              } else {
                horizontalMultiplier = getBlockMultiplier(diffInWidth, 1);
              }
              let newMultiplier = Math.floor(startLeft / withGutterBoxWidth),
                moveLeft =
                  (startLeft + horizontalMultiplier) * withGutterBoxWidth;

              // console.log({ horizontalMultiplier });

              // if (horizontalMultiplier > 0) {
              //   moveLeft = withGutterBoxWidth * (newMultiplier - 1);
              //   e.target.style.left = `${moveLeft}px`;
              //   e.target.style.transform = ``;
              // } else {
              //   moveLeft = withGutterBoxWidth * newMultiplier;
              //   e.target.style.left = `${moveLeft}px`;
              //   e.target.style.transform = ``;
              // }
              console.log({
                startLeft,
                moveLeft,
                horizontalMultiplier,
                ind: horizontalMultiplier * withGutterBoxWidth,
              });
              e.target.style.left = moveLeft - 24 + "px";
              horizontalMultiplier = horizontalMultiplier * -1;
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
