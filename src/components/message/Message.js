import React, { useEffect, useState } from "react";
import syle from "../../style/modules/message.module.css";
import Item from "./Content";
import { useSelector } from "react-redux";
import { selectMessages } from "../../features/message/messageSlce";
import mongoose from "mongoose";

function Message() {
  const [array, setArray] = useState([]);
  const message = useSelector(selectMessages);

  useEffect(() => {
    if (message) {
      const id = mongoose.Types.ObjectId().toString();
      const result = Object.assign(
        {
          id,
        },
        message
      );
      setArray((prev) => {
        if (prev.length < 3) {
          return [...prev, result];
        } else {
          prev.shift();
          return [...prev, result];
        }
      });
    }
  }, [message]);
  return (
    <ul className={syle.container}>
      {array ? (
        array.map((value) => {
          return <Item key={value.id} message={value} setArray={setArray} />;
        })
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Message;
