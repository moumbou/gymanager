import React, { useEffect, useState } from "react";
import inputStyle from "../../../../style/modules/input.module.css";
import buttonStyle from "../../../../style/modules/button.module.css";
import TimeCard from "./TimeCard";
import { useSelector } from "react-redux";
import { selectSubscriberPointages } from "../../../../features/subs/pointagesSlice";
import toInputDate from "../../../../shared/toInputDate";

function PointageSection({ setDisplay, display }) {
  const [pointages, setPointages] = useState([]);
  const [debut, setDebut] = useState({
    date: "",
    number: null,
  });
  const [fin, setFin] = useState({
    date: "",
    number: null,
  });
  const subscriberPointages = useSelector(selectSubscriberPointages);

  useEffect(() => {
    setPointages(
      subscriberPointages.filter((value) => {
        if (debut.number && fin.number) {
          return value.date >= debut.number && value.date <= fin.number;
        } else if (debut.number) {
          return value.date >= debut.number;
        } else if (fin.number) {
          return value.date <= fin.number;
        } else {
          return true;
        }
      })
    );
  }, [subscriberPointages, debut, fin]);

  return (
    <>
      <div target="grid-2" className={display ? "" : "hide"}>
        <div target="grid-2">
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              type="date"
              onChange={(e) =>
                setDebut({
                  number: new Date(e.target.value),
                  date: toInputDate(new Date(e.target.value)),
                })
              }
              value={debut.date}
            />
            <label>du jour</label>
          </div>

          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              type="date"
              onChange={(e) =>
                setFin({
                  number: new Date(e.target.value),
                  date: toInputDate(new Date(e.target.value)),
                })
              }
              value={fin.date}
            />
            <label>au jour</label>
          </div>
        </div>

        <div target="grid-2">
          <i></i>
          <button
            onClick={() => {
              setDebut({
                date: "",
                number: null,
              });
              setFin({
                date: "",
                number: null,
              });
              return setDisplay((prev) => !prev);
            }}
            className={buttonStyle.active}
          >
            cacher
          </button>
        </div>
      </div>

      <div target="flex-grid" className={display ? "" : "hide"}>
        {pointages.map(({ _id, date }) => (
          <TimeCard key={_id} date={date} />
        ))}
      </div>
    </>
  );
}

export default PointageSection;
