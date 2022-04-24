import React from "react";
import FirstSearchSection from "./FirstSearchSection";
import SecondeSearchSection from "./SecondeSearchSection";

function SearchSubsSection({ styles }) {
  return (
    <div className={styles.searchSection}>
        <FirstSearchSection styles={styles} />
        <SecondeSearchSection styles={styles} />
    </div>
  );
}

export default SearchSubsSection;
