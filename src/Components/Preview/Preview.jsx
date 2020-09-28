import React, { useEffect, useState } from "react";
import { map, get } from "lodash";

const Preview = () => {
  const [dummyData, setDummyData] = useState(null);
  useEffect(() => {
    const dummyData = JSON.parse(localStorage.getItem("dummyData"));
    setDummyData(dummyData);
  }, [localStorage.getItem("dummyData")]);

  return (
    <div className="blue-section">
      <div className="grid-container">
        {map(dummyData, (eachElement) => {
          return (
            <>
              {React.createElement(
                get(eachElement, `tag`, "h1"),
                {
                  ...(get(eachElement, `src`) && {
                    src: get(eachElement, `src`),
                  }),
                  ...(get(eachElement, `itemGridPosition`) && {
                    style: {
                      ...get(eachElement, `itemGridPosition`),
                    },
                  }),
                },
                get(eachElement, `content`)
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
