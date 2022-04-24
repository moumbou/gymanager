import React from "react";
import cardStyle from "../../../../style/modules/card.module.css";

function TimeCard({ date }) {
  const toDate = () => {
    return new Date(date).toLocaleDateString();
  };

  const toTime = () => {
    return new Date(date).toLocaleTimeString();
  };
  return (
    <div className={cardStyle.timeCard}>
      <span>J {toDate()} |</span>
      <span>| H {toTime()}</span>
    </div>
  );
}

export default TimeCard;
