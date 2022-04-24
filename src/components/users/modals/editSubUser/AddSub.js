import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentModal } from "../../../../features/modals/modalSlice";
import { selectDefalutSubs, setSub } from "../../../../features/subs/subsSlice";
import { FunctionsDB, Modals } from "../../../../shared/Constants";
import toInputDate from "../../../../shared/toInputDate";
import buttonStyle from "../../../../style/modules/button.module.css";
import inputStyle from "../../../../style/modules/input.module.css";

const { ipcRenderer } = window.require("electron");

function AddSub({ setHide, hide }) {
  const { register, handleSubmit, reset } = useForm();

  const subs = useSelector(selectDefalutSubs);
  const [currentSubs, setSubs] = useState([]);
  const [currentMonth, setMonth] = useState(Number);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!subs.length) ipcRenderer.send(FunctionsDB.GET_SUBS);
    setSubs(subs);
    if (hide) {
      setMonth(null);
      return reset({
        seances: "",
        mois: "",
        debutSub: "",
        endSub: "",
        prix: "",
        sub: "null",
      });
    }
  }, [subs, hide, reset]);

  const createDate = (month) => {
    const date = new Date();
    if (month) return new Date().setMonth(date.getMonth() + month);
    else return new Date().setMonth(date.getMonth() + month);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    const array = currentSubs.filter((val) => val._id.includes(value));
    if (!array.length) {
      setMonth(null);
      return reset({
        seances: "",
        mois: "",
        debutSub: "",
        endSub: "",
        prix: "",
        sub: "null",
      });
    }
    const object = array[0];
    setMonth(object.mois);
    reset({
      seances: object.seances,
      mois: object.mois,
      debutSub: toInputDate(new Date()),
      endSub: toInputDate(createDate(object.mois)),
      prix: object.prix,
      subName: object.nom,
    });
  };

  const addMonths = (e) => {
    const date = new Date(e.target.value);
    const month = new Date(date).getMonth();
    reset({
      endSub: toInputDate(date.setMonth(month + currentMonth)),
    });
  };

  const onSubmit = (data) => {
    dispatch(setSub(data));
    dispatch(setCurrentModal(Modals.CHECK_OUT));
    setMonth("");
    reset({
      seances: "",
      mois: "",
      debutSub: "",
      endSub: "",
      prix: "",
      subName: "",
      sub: "null",
    });
    setTimeout(() => {
      setHide(true);
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} add-sub="true">
        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <select
              className={inputStyle.simpleSelect}
              {...register("sub", {
                onChange: (e) => handleSelect(e),
              })}
            >
              <option value="null">Abonnement</option>
              {currentSubs.map((value) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.nom}
                  </option>
                );
              })}
            </select>
            <label>nom de l'abonnement</label>
          </div>

          <input type="text" {...register("subName")} className="hide" />

          <div className={inputStyle.display_2}>
            <div className={inputStyle.simpleContainer}>
              <input
                className={inputStyle.simple}
                placeholder="séances"
                type="number"
                {...register("seances", {
                  required: true,
                })}
                disabled={currentMonth ? false : true}
              />
              <label>séances</label>
            </div>

            <div className={inputStyle.simpleContainer}>
              <input
                className={inputStyle.simple}
                placeholder="mois"
                type="number"
                {...register("mois", {
                  required: true,
                })}
                disabled={currentMonth ? false : true}
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
              {...register("debutSub", {
                required: true,
                onChange: (e) => addMonths(e),
              })}
              disabled={currentMonth ? false : true}
            />
            <label>debut d'abonnement</label>
          </div>

          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="fin d'abonnement"
              type="date"
              {...register("endSub", {
                required: true,
              })}
              disabled={currentMonth ? false : true}
            />
            <label>fin d'abonnement</label>
          </div>
        </div>

        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="prix"
              type="number"
              {...register("prix", {
                required: true,
              })}
              disabled={currentMonth ? false : true}
            />
            <label>prix</label>
          </div>
          <button className={buttonStyle.active} h-100="true">
            ajouter
          </button>
        </div>
      </form>
    </>
  );
}

export default AddSub;
