import React, {
  useState,
  createRef,
  useLayoutEffect,
  createElement,
} from "react";
import MoveableWrapper from "./MoveableWrapper";
import "./App.css";
import Grid from "./Grid";
import "./Grid.css";
import { useWindowSize } from "./common";

const App = () => {
  let showGrids = true,
    elements = [
      {
        id: "heading",
        type: "text",
        content: "Some content",
        tag: "h1",
        styling: {
          top: "0px",
          height: "50px",
        },
        reponsive: {},
      },
      {
        id: "para",
        type: "text",
        content:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        tag: "p",
        styling: {
          top: "80px",
        },
        reponsive: {},
      },
    ];
  const containerRef = createRef();
  const [dimensions, setDimensions] = useState({});
  const [windowWidth] = useWindowSize();

  useLayoutEffect(() => {
    if (containerRef.current) {
      let width = containerRef.current.offsetWidth,
        height = containerRef.current.offsetHeight,
        newWidth = Math.round(width / 12),
        newHeight = Math.round((newWidth * 9) / 16);
      setDimensions({
        width: width,
        height: height,
        withGutterBoxWidth: newWidth,
        boxWidth: newWidth - 24,
        widthGutterBoxHeight: newHeight,
        boxHeight: newHeight - 16,
      });
    }
  }, [windowWidth]);

  const {
    withGutterBoxWidth,
    boxWidth,
    widthGutterBoxHeight,
    boxHeight,
  } = dimensions;

  return (
    <div className="container">
      <section className="blue-section" ref={containerRef}>
        {elements.map((elem, ind) => (
          <MoveableWrapper
            key={ind}
            withGutterBoxWidth={withGutterBoxWidth}
            widthGutterBoxHeight={widthGutterBoxHeight}
            styles={{ ...elem.styling }}
          >
            {createElement(elem.tag, null, elem.content)}
          </MoveableWrapper>
        ))}
        {showGrids && (
          <Grid
            withGutterBoxWidth={withGutterBoxWidth}
            boxWidth={boxWidth}
            widthGutterBoxHeight={widthGutterBoxHeight}
            boxHeight={boxHeight}
          ></Grid>
        )}
      </section>
    </div>
  );
};
export default App;

{
  /* <img ref={image} // absolute full height 
              onMouseOver={()=> setTargetElement({class : 'image', ref : image }) }
              onClick={()=> setTargetElement({class : 'image', ref : image }) }
              className="image" 
              left="150px"
              width="150px"
              src="/logo192.png"
              alt="target"
          /> */
}
