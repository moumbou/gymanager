import React from "react";
import {
  RiErrorWarningFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
} from "react-icons/ri";
import tableStyle from "../../style/modules/table.module.css";
import defaultPic from "../../img/not-defiened.jpg";
import toInputDate from "../../shared/toInputDate";
import getPercentSub from "../../shared/getPercentSub";

function TableContentDashboard({ args, path }) {
  const { dateTime, subscriber } = args;
  return (
    <tr>
      <td>
        <div
          className={tableStyle.img}
          style={{
            backgroundImage: `url(${
              subscriber.pictureProfile
                ? `${path}/${subscriber.pictureProfile}`
                : defaultPic
            })`,
          }}
        />
      </td>
      <td>{subscriber.nom}</td>
      <td>{subscriber.prenom}</td>
      <td>{subscriber.birthDay ? toInputDate(subscriber.birthDay) : "****-**-**"}</td>
      <td>{new Date(dateTime).toLocaleString()}</td>
      <td>
        {subscriber.sub
          ? toInputDate(subscriber.sub.endSub)
          : "abonnement fini"}
      </td>
      <td>séances restantes : {subscriber.sub ? subscriber.sub.seances : 0}</td>
      <td>
        {subscriber.sub ? (
          getPercentSub(subscriber.sub) === 3 ? (
            <RiCheckboxCircleFill
              className={`${tableStyle.icon} ${tableStyle.iconSuccess}`}
            />
          ) : getPercentSub(subscriber.sub) === 2 ? (
            <RiErrorWarningFill
              className={`${tableStyle.icon} ${tableStyle.iconWarning}`}
            />
          ) : (
            <RiCloseCircleFill
              className={`${tableStyle.icon} ${tableStyle.iconDanger}`}
            />
          )
        ) : (
          <RiCloseCircleFill
            className={`${tableStyle.icon} ${tableStyle.iconDanger}`}
          />
        )}
      </td>
    </tr>
  );
}

export default TableContentDashboard;
