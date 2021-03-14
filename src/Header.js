import React from "react";
import { useDispatch } from "react-redux";
  
export default function Header() {
  const dispatch = useDispatch();

  const onFontClick = (increaseFont) => {
    const actionType = increaseFont ? "INCREASE_FONT" : "DECREASE_FONT";
    dispatch({ type: actionType })
  };

  return (
    <div id="header" role="banner" aria-label="Primary Header"
      style={{
        padding: ".5em",
        height: "1.5em",
        color: "white",
        backgroundColor: "darkblue"
      }}
    >
      react with d3js examples
      <>
        <button  
          style={{ marginLeft: "1em", paddingRight: ".5em" }}
          onClick={() => onFontClick(true)}
        >
            Increase font size
        </button>
      </>
      <>
        <button  
          style={{ marginLeft: ".5em", paddingRight: ".5em" }}
          onClick={() => onFontClick(false)}
        >
            Descrease font size
        </button>
      </>
    </div>
  );
};
