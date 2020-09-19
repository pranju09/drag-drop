import React from "react";

const Grid = ({
  withGutterBoxWidth = 0,
  boxWidth = 0,
  widthGutterBoxHeight = 0,
  boxHeight = 0,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="grid-tiles__svg">
      <defs>
        <pattern
          id="grid-pattern-BAYMmkuk5"
          height={`${widthGutterBoxHeight}px`}
          width={`${withGutterBoxWidth}px`}
          patternUnits="userSpaceOnUse"
          className="grid-tiles__pattern-outer"
        >
          <rect
            height={`${boxHeight}px`}
            width={`${boxWidth}px`}
            rx="3"
            x="0.5"
            y="0.5"
            strokeWidth="1"
            className="grid-tiles__pattern-inner"
          ></rect>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern-BAYMmkuk5)"
      ></rect>
    </svg>
  );
};

export default Grid;
