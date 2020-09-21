import React, {
  useState,
  createRef,
  useLayoutEffect,
  createElement,
} from "react";
import MoveableWrapper from "./Components/MoveableWrapper";
import "./App.css";
import Grid from "./Components/Grid/Grid";
import "./Components/Grid/Grid.css";
import { useWindowSize } from "./Components/common";
import ElementWrapper from "./Components/ElementWrapper";

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
          left: "119px",
          top: "65px",
          height: "114px",
        },
        reponsive: {},
      },
    ];

  let elementsRef = Array(elements.length).fill(createRef());

  const [targetElem, setTargetElement] = useState();
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
        withGutterBoxHeight: newHeight,
        boxHeight: newHeight - 16,
      });
    }
  }, [windowWidth]);

  const {
    withGutterBoxWidth,
    boxWidth,
    withGutterBoxHeight,
    boxHeight,
  } = dimensions;
  return (
    <div className="container">
      <section className="blue-section" ref={containerRef}>
        <MoveableWrapper
          withGutterBoxWidth={withGutterBoxWidth}
          withGutterBoxHeight={withGutterBoxHeight}
          targetElem={targetElem}
        ></MoveableWrapper>
        {elements.map((elem, ind) => (
          <ElementWrapper
            key={ind}
            childRef={elementsRef[ind]}
            setTargetElement={(target) => setTargetElement(target)}
            styles={{ ...elem.styling }}
          >
            {createElement(elem.tag, { index: ind }, elem.content)}
          </ElementWrapper>
        ))}
        {showGrids && (
          <Grid
            withGutterBoxWidth={withGutterBoxWidth}
            boxWidth={boxWidth}
            withGutterBoxHeight={withGutterBoxHeight}
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
