import React, { useState } from "react";
import inputStyle from "../../../../style/modules/input.module.css";

function Subs({ errors, register }) {
  const [subs, setSubs] = useState("null");

  const selectOnChangeHanlder = (e) => {
    setSubs(e.target.value);
  };

  return (
    <>
      <h3>abonnement section</h3>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <select
            className={inputStyle.simpleSelect}
            {...register("sub", {
              onChange: (e) => selectOnChangeHanlder(e),
            })}
          >
            <option value="null">selectionner un abonnement</option>
            {/* 26 char */}
          </select>
          <label>nom de l'abonnement</label>
        </div>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="séances"
              type="number"
              disabled={subs === "null" ? true : false}
              {...register('seances')}
            />
            <label>séances</label>
          </div>

          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="mois"
              type="number"
              disabled={subs === "null" ? true : false}
              {...register('mois')}
            />
            <label>mois</label>
          </div>
        </div>
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="debut d'abonnement"
            type="date"
            disabled={subs === "null" ? true : false}
            {...register('debutSub')}
          />
          <label>debut d'abonnement</label>
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="fin d'abonnement"
            type="date"
            disabled={subs === "null" ? true : false}
            {...register('endSub')}
          />
          <label>fin d'abonnement</label>
        </div>
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="prix"
              type="number"
              disabled={subs === "null" ? true : false}
              {...register('prix')}
            />
            <label>prix</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subs;
