import React, { useEffect,useState } from "react";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
const MoveableWrapper= ({refName,moveableRef,colsWidth,colsHeight}) => {
    const [frame] = React.useState({
        translate: [0, 0],
        rotate: 0
    });
    const [targetElem, setTargetElem] = useState();
    
    useEffect(() => {
        const target = document.querySelector(`.${refName}`);
        setTargetElem(target);
        target && target.addEventListener("load", () => {
            setTimeout(() => {
              moveableRef && moveableRef.current && moveableRef.current.updateRect();
            }, 2000);
          });
    }, [refName,moveableRef]);

    return (
        <Moveable
        // ref={moveableRef}
        target={targetElem}
        draggable={true}
        throttleDrag={0} 
        resizable={true}
        throttleResize={0}
        rotatable={true}
        rotationPosition={"top"}
        throttleRotate={0}
        onDrag={({ target,left,top }) => {
          let newTop = Math.round(top / colsHeight) * colsHeight, newLeft = Math.round(left / colsWidth) * colsWidth;
          console.log({top,newTop,div : top / colsHeight,colsHeight,left,newLeft,colsWidth})

            target.style.top = newTop+"px";
            target.style.left = newLeft+"px";
            // target.style.top = `${top}px`;
            // target.style.left = `${left}px`;
        }}
        onResize={({ target, width, height, drag }) => {
          // target.style.width = `${width}px`;
          // target.style.height = `${height}px`;
          const beforeTranslate = drag.beforeTranslate;
            
          frame.translate = beforeTranslate;
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onRotate={({ target,left,top,beforeRotate }) => {
            frame.rotate = beforeRotate;
            target.style.top = Math.round(top / colsHeight) * colsHeight+"px";
            target.style.left = Math.round(left / colsWidth) * colsWidth+"px";
        }}
      />
    );
}

export default MoveableWrapper;

