import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";

function Item({ message, setArray }) {
  const { err, errMsg } = message;
  const [slide, setSlide] = useState(false);

  const slideOut = () => {
    setSlide(true);
    setTimeout(() => {
      setArray((prev) =>
        prev.filter((value) => !value.id.includes(message.id))
      );
    }, 500);
  };

  return (
    <li data-color={err ? "danger" : "success"} slide-out={slide ? "true" : ""}>
      <div data-target="before">
        {err ? <AiOutlineWarning /> : <AiOutlineCheckCircle />}
      </div>
      <div data-target="content">
        <p>{message.message}</p>
        {errMsg ? <p>{errMsg}</p> : <></>}
      </div>
      <div data-target="after">
        <RiDeleteBack2Line onClick={slideOut} />
      </div>
    </li>
  );
}

export default Item;
