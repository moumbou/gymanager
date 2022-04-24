import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentSubs } from "../../features/subs/subsSlice";
import SubsCard from "./SubsCard";

function SubsContent({ styles }) {
  const defaultSubs = useSelector(selectCurrentSubs);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    setSubs(defaultSubs);
  }, [defaultSubs]);

  return (
    <div className={styles.contentSection}>
      {subs.map((val) => {
        return <SubsCard key={val._id} sub={val} />;
      })}
    </div>
  );
}

export default SubsContent;
