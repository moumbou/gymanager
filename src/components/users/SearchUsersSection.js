import React from "react";
import FirstSectionSearch from "./FirstSectionSearch";
import SecondeSectionSearch from "./SecondeSectionSearch";

function SearchUsersSection({ styles }) {
  return (
    <div className={styles.searchSection}>
      <FirstSectionSearch styles={styles} />
      <SecondeSectionSearch styles={styles} />
    </div>
  );
}

export default SearchUsersSection;
