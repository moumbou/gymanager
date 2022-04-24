import React from "react";
import { ImSection } from "react-icons/im";

function SectionTitle({ title }) {
  return (
    <h2 target="section-title">
      <ImSection /> {title}
    </h2>
  );
}

export default SectionTitle;
