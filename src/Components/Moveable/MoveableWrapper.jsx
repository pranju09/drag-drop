import React, { creat, useRef, useState } from "react";
import Moveable from "react-moveable";
import classNames from "classnames";
import ElementWrapper from "../Common/ElementWrapper";
import Grid from "../Grid/Grid";

const MoveableWrapper = ({
  targetElem,
  children,
  styles,
  withGutterBoxWidth,
  boxWidth,
  withGutterBoxHeight,
  boxHeight,
}) => {
  let sw,
    ew,
    occupiedWidth,
    sh,
    eh,
    occupiedHeight,
    direction,
    leftBoxCount,
    topBoxCount;
  let [showGrid, setShowGrid] = useState(true);
  const [frame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    scale: [1, 1],
  });

  const getBlockMultiplier = (
    resizeDiff = 0,
    dir,
    size,
    withGutterBoxSize,
    gutterSpace
  ) => {
    let fStep;
    dir = resizeDiff > 0 ? dir : dir * -1;
    fStep = dir === 1 ? size / 2 + gutterSpace : size / 2;
    // (h/2)+gh : h/2 OR (w/2)+gw : w/2
    resizeDiff = Math.abs(resizeDiff);
    if (resizeDiff < fStep) return 0;
    resizeDiff = resizeDiff - fStep;
    var pos = resizeDiff / withGutterBoxSize;
    return Math.ceil(pos) * dir;
  };

  const getForcedHeight = (occupiedHeight, verticalMultiplier) => {
    return (
      (occupiedHeight + verticalMultiplier) * withGutterBoxHeight - 18 + "px"
    );
  };

  const getForcedWidth = (occupiedWidth, horizontalMultiplier) => {
    return (
      (occupiedWidth + horizontalMultiplier) * withGutterBoxWidth - 26 + "px"
    );
  };

  const handleDrag = (e) => {
    let newTop = Math.round(e.top / withGutterBoxHeight) * withGutterBoxHeight,
      newLeft = Math.round(e.left / withGutterBoxWidth) * withGutterBoxWidth;
    e.target.style.top = newTop + "px";
    e.target.style.left = newLeft + "px";
  };

  const handleResizeStart = (e) => {
    sw = e.clientX;
    sh = e.clientY;
    leftBoxCount =
      (e.target.getBoundingClientRect().left -
        e.target.parentElement.getBoundingClientRect().left) /
      withGutterBoxWidth;

    topBoxCount =
      (e.target.getBoundingClientRect().top -
        e.target.parentElement.getBoundingClientRect().top) /
      withGutterBoxHeight;

    direction = e.direction;
    occupiedWidth = e.target.getBoundingClientRect().width - 2;
    occupiedWidth = Math.floor((occupiedWidth + 24) / withGutterBoxWidth); //  To get occupied boxes : width

    occupiedHeight = e.target.getBoundingClientRect().height - 2;
    occupiedHeight = Math.floor((occupiedHeight + 16) / withGutterBoxHeight); //  To get occupied boxes : height
  };

  const handleResize = (e) => {
    const beforeTranslate = e.drag.beforeTranslate;
    frame.translate = beforeTranslate;
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
  };

  const handleResizeEnd = (e) => {
    let horizontalMultiplier, verticalMultiplier;
    ew = e.clientX;
    eh = e.clientY;

    // Horizontal Resize [1,0] [-1,0]
    let resizeWidth = ew - sw;
    horizontalMultiplier = getBlockMultiplier(
      resizeWidth,
      direction && direction[0],
      boxWidth,
      withGutterBoxWidth,
      withGutterBoxWidth - boxWidth
    );
    // When resize to left
    if (direction && direction[0] < 0) {
      let moveLeft = (leftBoxCount - horizontalMultiplier) * withGutterBoxWidth;
      e.target.style.left = moveLeft + "px";
      e.target.style.transform = ``;
    }

    e.target.style.width = getForcedWidth(occupiedWidth, horizontalMultiplier);

    // Vertical Resize
    let resizeHeight = eh - sh;

    verticalMultiplier = getBlockMultiplier(
      resizeHeight,
      direction && direction[1],
      boxHeight,
      withGutterBoxHeight,
      withGutterBoxHeight - boxHeight
    );
    // When resize to top
    if (direction && direction[1] < 0) {
      let moveTop = (topBoxCount - verticalMultiplier) * withGutterBoxHeight;
      e.target.style.top = moveTop + "px";
      e.target.style.transform = ``;
    }

    e.target.style.height = getForcedHeight(occupiedHeight, verticalMultiplier);
  };

  const handleRotate = (e) => {
    frame.rotate = e.beforeRotate;
    e.target.style.top =
      Math.round(e.top / withGutterBoxHeight) * withGutterBoxHeight + "px";
    e.target.style.left =
      Math.round(e.left / withGutterBoxWidth) * withGutterBoxWidth + "px";
  };
  console.log({ showGrid });

  return (
    <>
      {targetElem && (
        <Moveable
          ref={targetElem}
          target={targetElem.current}
          draggable={true}
          resizable={true}
          scalable={true}
          zoom={1}
          rotatable={true}
          rotationPosition={"top"}
          onDrag={handleDrag}
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}
          onRotate={handleRotate}
          onScaleStart={({ set, dragStart }) => {
            set(frame.scale);
            dragStart && dragStart.set(frame.translate);
          }}
          onScale={({ target, scale, drag }) => {
            const beforeTranslate = drag.beforeTranslate;

            frame.translate = beforeTranslate;
            frame.scale = scale;
            console.log({ scale, beforeTranslate });
            target.style.transform =
              `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
              ` scale(${scale[0]}, ${scale[1]})`;
          }}
        ></Moveable>
      )}
      {/* {showGrid && (
        <Grid
          withGutterBoxWidth={withGutterBoxWidth}
          boxWidth={boxWidth}
          withGutterBoxHeight={withGutterBoxHeight}
          boxHeight={boxHeight}
        ></Grid>
      )} */}
    </>
  );
};

export default React.memo(MoveableWrapper);
