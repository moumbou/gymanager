import React, { useEffect, useState } from "react";
import styles from "../../style/modules/dashboard.module.css";
import inputStyle from "../../style/modules/input.module.css";
import { CgSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDefaultPointages,
  setCurrentPointages,
} from "../../features/subs/pointagesSlice";
import {
  selectDefaultSubscirbers,
  setSubscriber,
} from "../../features/subs/usersSlice";
import { setCurrentModal } from "../../features/modals/modalSlice";
import { Modals } from "../../shared/Constants";

function SearchDashboard() {
  const defaultPointages = useSelector(selectDefaultPointages);
  const DefaultSubscirbers = useSelector(selectDefaultSubscirbers);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [clicked, setClick] = useState(false);

  useEffect(() => {
    dispatch(
      setCurrentPointages(
        defaultPointages.filter(({ subscriber }) => {
          const { nom, prenom, code } = subscriber;
          return (
            `${nom} ${prenom}`.toLowerCase().includes(input.toLowerCase()) ||
            code.includes(input)
          );
        })
      )
    );
  }, [defaultPointages, input, dispatch]);
  return (
    <div className={styles.search}>
      <div className={`${inputStyle.simpleContainer} ${inputStyle.simple50}`}>
        <input
          className={inputStyle.simple}
          type="text"
          placeholder="nom, prenom, Id"
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            //? LISTENING TO ENTER KEY
            if (e.key === "Enter" && !clicked && input.length) {
              //? STOPE THE LISTENER
              setClick(true);

              //? TRIGGER THE FUNCTION
              const subscriber = DefaultSubscirbers.filter((value) => {
                const { nom, prenom, code } = value;
                return (
                  `${nom} ${prenom}`
                    .toLowerCase()
                    .includes(input.toLowerCase()) || code.includes(input)
                );
              });

              if (subscriber.length) {
                dispatch(setSubscriber(subscriber[0]));
                dispatch(setCurrentModal(Modals.EDIT_SUB_USER));
              }

              //? ACTIVATE THE LISTENER AFTER 1s
              setTimeout(() => {
                setClick(false);
              }, 1000);
            }
          }}
          value={input}
        />
        <CgSearch className={inputStyle.icon} />
      </div>
    </div>
  );
}

export default SearchDashboard;
