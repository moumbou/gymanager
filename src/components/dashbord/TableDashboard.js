import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPicturesPath } from "../../features/connexion/connexionSlice";
import { selectCurrentPointages } from "../../features/subs/pointagesSlice";
import styles from "../../style/modules/dashboard.module.css";
import tableStyle from "../../style/modules/table.module.css";
import TableContentDashboard from "./TableContentDashboard";

function TableDashboard() {
  const currentPointages = useSelector(selectCurrentPointages);
  const picturesPath = useSelector(selectPicturesPath);
  const [pointages, setPointages] = useState([]);

  useEffect(() => {
    setPointages(currentPointages);
  }, [currentPointages]);

  return (
    <div className={styles.tableContainer}>
      <table className={tableStyle.simpleTable}>
        <tbody>
          {pointages.map((val) => (
            <TableContentDashboard
              key={val._id}
              path={picturesPath}
              args={val}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDashboard;
