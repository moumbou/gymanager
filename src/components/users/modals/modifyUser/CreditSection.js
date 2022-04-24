import React from "react";
import { MdAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import inputStyle from "../../../../style/modules/input.module.css";

function CreditSection({ register, errors }) {
  return (
    <>
      <h3>crédit / déttes</h3>
      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            color="success"
            placeholder="crédits"
            type="number"
            {...register('credit')}
          />
          <label>crédits</label>
          <MdAttachMoney className={inputStyle.icon} data-color="success" />
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            color="danger"
            placeholder="déttes"
            type="number"
            {...register('dette')}
          />
          <label>déttes</label>
          <MdOutlineMoneyOffCsred
            className={inputStyle.icon}
            data-color="danger"
          />
        </div>
      </div>
    </>
  );
}

export default CreditSection;
