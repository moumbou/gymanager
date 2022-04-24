import React from "react";

function BtnSelector({ text, clickHandler, btnTarget, target }) {
  return (
    <button
      onClick={clickHandler}
      active={`${btnTarget === target ? "true" : ""}`}
      target={target}
      type="button"
    >
      {text}
    </button>
  );
}

export default BtnSelector;
