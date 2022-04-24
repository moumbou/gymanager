import React from "react";
import SubPicture from "./SubPicture";
import { BiUserCircle } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsPhone } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";

import inputStyle from "../../../../style/modules/input.module.css";

function ProfileSection({ register, errors, subscriber }) {
  return (
    <>
      <h3>profile section</h3>

      <SubPicture register={register} subscriber={subscriber} />

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="nom"
            type="text"
            {...register("nom", {
              required: true,
            })}
          />
          <label>nom</label>
          <BiUserCircle
            className={inputStyle.icon}
            data-color={errors.nom ? "danger" : ""}
          />
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="prenom"
            type="text"
            {...register("prenom", {
              required: true,
            })}
          />
          <label>prenom</label>
          <BiUserCircle
            className={inputStyle.icon}
            data-color={errors.prenom ? "danger" : ""}
          />
        </div>
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="date de naissance"
            type="date"
            {...register("birthDay")}
          />
          <label>
            date de naissance <FaBirthdayCake />
          </label>
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="date de debut"
            type="date"
            {...register("dateDebut")}
          />
          <label>date de debut</label>
        </div>
      </div>

      <div className={inputStyle.simpleContainer}>
        <input
          className={inputStyle.simple}
          placeholder="adresse"
          type="text"
          {...register("adresse")}
        />
        <label>adresse</label>
        <IoLocationSharp className={inputStyle.icon} />
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="numéro principale"
            type="text"
            {...register("numPrincipale")}
          />
          <label>numéro principale</label>
          <BsPhone className={inputStyle.icon} />
        </div>

        <div className={inputStyle.simpleContainer}>
          <input
            className={inputStyle.simple}
            placeholder="numéro secondaire"
            type="text"
            {...register("numSecondaire")}
          />
          <label>numéro secondaire</label>
          <BsPhone className={inputStyle.icon} />
        </div>
      </div>

      <div className={inputStyle.display_2}>
        <div className={inputStyle.display_2}>
          <div className={inputStyle.simpleContainer}>
            <select className={inputStyle.simpleSelect} {...register("sex")}>
              <option value="H">homme</option>
              <option value="F">femme</option>
            </select>
            <label>sex</label>
          </div>

          <div className={inputStyle.simpleContainer}>
            <input
              className={inputStyle.simple}
              placeholder="code ID"
              type="text"
              disabled
              {...register("code")}
            />
            <label style={{ whiteSpace: "nowrap" }}>code ID</label>
            <HiOutlineIdentification className={inputStyle.icon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
