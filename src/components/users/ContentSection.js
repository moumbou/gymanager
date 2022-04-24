import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentSubscribers } from "../../features/subs/usersSlice";
import UserCard from "./UserCard";

function ContentSection({ styles }) {
  const [subscribers, setSubscribers] = useState([]);
  const currentSubscribers = useSelector(selectCurrentSubscribers);

  useEffect(() => {
    setSubscribers(currentSubscribers);
  }, [currentSubscribers]);

  return (
    <div className={styles.contentSection}>
      {subscribers.map((val, i) => (
        <UserCard key={val._id} subscriber={val} />
      ))}
    </div>
  );
}

export default ContentSection;
