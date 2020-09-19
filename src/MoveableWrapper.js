import React, { useEffect,useState } from "react";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
const MoveableWrapper= ({refName,moveableRef,colsWidth,colsHeight}) => {
    let sw,ew,aw;
    console.log("var reg ")
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
    const getBlockMultiplier = (diff, dir)=> {
      const fStep = dir === 1 ? 46+24 : 46; // (w/2)+gw : w/2
      diff = Math.abs(diff);
      if(diff<fStep) return 0;
      diff = diff - fStep;
      var pos = diff/116;
      return Math.ceil(pos)*dir;
    } 
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
        onDragStart={({ set , target,width }) => {
          set(frame.translate);
          sw = target.style.width;
        }} 
        onDrag={({target,left, top,beforeRotate}) => {
            let newTop = Math.round(top / colsHeight) * colsHeight, newLeft = Math.round(left / colsWidth) * colsWidth;
            target.style.top = newTop+"px";
            target.style.left = newLeft+"px";
        }}
        onDragEnd={({target,width})=>{
          ew = target.style.width;
          const diff = ew-sw;
          if(diff>0) {
            const multiplier = getBlockMultiplier(diff);
            target.style.width  = sw + (colsWidth+24)*multiplier;
          }
        }}
        onResizeStart={(e) => {
          sw = e.clientX ;
          aw = e.target.getBoundingClientRect().width - 2;
          aw = Math.floor((aw+24)/116); //  To get occupied boxes 
          console.log({startBlockSize : aw,sw});
        }} 
        onResize={({ target, width, height, drag }) => {
          const beforeTranslate = drag.beforeTranslate;
            
          frame.translate = beforeTranslate;
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onResizeEnd={(e)=>{
          let multiplier;
          ew = e.clientX;
          const diff = ew-sw;
          console.log({ew,sw,diff})
          if(diff>0) {
            multiplier = getBlockMultiplier(diff,1);
          }else{
            multiplier = getBlockMultiplier(diff,-1);
          }
          e.target.style.width  = ((aw + multiplier)*116)-26+"px";
          console.log({ ew, diffBlockSize : multiplier});
        }}
        onRotate={({ target,left,top,beforeRotate }) => {
            frame.rotate = beforeRotate;
            target.style.top = Math.round(top / colsHeight) * colsHeight+"px";
            target.style.left = Math.round(left / colsWidth) * colsWidth+"px";
        }}
      />
    );
}

export default React.memo(MoveableWrapper);
