import  React,{ useState, useRef, useEffect, createRef, useLayoutEffect }  from "react";
import MoveableWrapper from "./MoveableWrapper";
import './App.css';
import Grid from "./Grid";
import './Grid.css';
import {useWindowSize} from "./common";
import ElementWrapper from "./ElementWrapper";

const App = () => {
  let heading = createRef(),image = createRef(),showGrids=true;
  const [targetElement, setTargetElement] = useState(null);
  const containerRef = createRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [windowWidth] = useWindowSize();

  useLayoutEffect(() => {
    if (containerRef.current) {
      let width = containerRef.current.offsetWidth,
      height = containerRef.current.offsetHeight,
      newWidth  = Math.round(width/12), 
      newHeight = Math.round((newWidth*9)/16);
      setDimensions({
        width: width,
        height: height,
        colsWidth :newWidth,
        gutterWidthSpace :newWidth - 24,
        colsHeight : newHeight,
        gutterHeightSpace : newHeight - 16,
      });
    }
  }, [windowWidth]);
  
  const { width, height, colsWidth, gutterWidthSpace,colsHeight ,gutterHeightSpace} = dimensions;

  return (
    <div className="container">
      <section className="blue-section" ref={containerRef}>
          {targetElement && <MoveableWrapper refName={targetElement && targetElement.class} moveableRef={targetElement && targetElement.ref} colsWidth={colsWidth} colsHeight={colsHeight}/>}
            <ElementWrapper 
              ref={heading} 
              refName='heading' 
              setTargetElement={(ref)=>setTargetElement({class : 'heading', ref })}>
              <h3>I am Heading</h3>
            </ElementWrapper>
          <br/>
          {/* <img ref={image}
              onMouseOver={()=> setTargetElement({class : 'image', ref : image }) }
              onClick={()=> setTargetElement({class : 'image', ref : image }) }
              className="image" 
              left="150px"
              width="150px"
              src="/logo192.png"
              alt="target"
          /> */}
          {showGrids && 
            <Grid colsWidth={colsWidth} gutterWidthSpace={gutterWidthSpace} colsHeight={colsHeight} gutterHeightSpace={gutterHeightSpace}></Grid>
        }
      </section>
    </div>
  );
}
export default App;