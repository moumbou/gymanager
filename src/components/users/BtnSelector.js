import React from "react";

function BtnSelector({ text, clickHandler, btnTarget, target, disabled }) {
  return (
    <button
      onClick={clickHandler}
      active={`${btnTarget === target ? "true" : ""}`}
      target={target}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default BtnSelector;
