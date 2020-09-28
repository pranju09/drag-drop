import React, {
  useState,
  createRef,
  useLayoutEffect,
  createElement,
  useEffect,
} from "react";
import MoveableWrapper from "./Components/Moveable/MoveableWrapper";
import "./App.css";
import Grid from "./Components/Grid/Grid";
import "./Components/Grid/Grid.css";
import { useWindowSize } from "./Components/Common/main";
import ElementWrapper from "./Components/Common/ElementWrapper";
import Preview from "./Components/Preview/Preview";
import { dummyData } from "./Utils/data";
import { map, get } from "lodash";

const App = () => {
  let showGrids = true;

  let elementsRef = Array(dummyData.length).fill(createRef());

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
          boxWidth={boxWidth}
          withGutterBoxHeight={withGutterBoxHeight}
          boxHeight={boxHeight}
          targetElem={targetElem}
        ></MoveableWrapper>
        {map(dummyData, (eachElement, ind) => {
          console.log({
            ...get(eachElement, `styling`),
          });
          return (
            <ElementWrapper
              childRef={elementsRef[ind]}
              setTargetElement={(target) => setTargetElement(target)}
              styles={{
                ...get(eachElement, `styling`),
              }}
            >
              {React.createElement(
                get(eachElement, `tag`, "h1"),
                {
                  ...(get(eachElement, `src`) && {
                    src: get(eachElement, `src`),
                  }),
                },
                get(eachElement, `content`)
              )}
            </ElementWrapper>
          );
        })}
        {targetElem && (
          <Grid
            withGutterBoxWidth={withGutterBoxWidth}
            boxWidth={boxWidth}
            withGutterBoxHeight={withGutterBoxHeight}
            boxHeight={boxHeight}
          ></Grid>
        )}
      </section>
      <h2>Show Output : </h2>
      <Preview />
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
