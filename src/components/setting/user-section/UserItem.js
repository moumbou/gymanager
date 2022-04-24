import React, { useEffect, useState } from "react";
import inputStyle from "../../../style/modules/input.module.css";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { BiReset, BiTrashAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import UserPicItem from "./UserPicItem";
import { useDispatch } from "react-redux";
import { setTarget } from "../../../features/connexion/connexionSlice";
import { setCurrentModal } from "../../../features/modals/modalSlice";
import { FunctionsDB, Modals } from "../../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function UserItem({ user, connected }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      name: user.name,
      password: user.password,
      role: user.role,
    });
  }, [user, reset]);

  const resetInputs = () => {
    reset({
      name: user.name,
      password: user.password,
      role: user.role,
    });
  };

  const deleteUser = () => {
    dispatch(setTarget(user));
    dispatch(setCurrentModal(Modals.DELETE_USER_SETTING));
  };

  const onSubmit = (data) => {
    const result = Object.assign(data, {
      _id: user._id,
    });
    ipcRenderer.send(FunctionsDB.EDIT_USER, {
      user: result,
      connected,
    });
  };

  return (
    <li>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserPicItem user={user} />

        <div className={inputStyle.simpleContainer}>
          <input
            type="text"
            placeholder="user name"
            className={inputStyle.simple}
            {...register("name", {
              required: true,
            })}
            disabled={
              connected && connected.role.includes("super-admine")
                ? false
                : true
            }
          />
        </div>
        <div className={inputStyle.simpleContainer} target="password-container">
          <input
            type={`${show ? "text" : "password"}`}
            placeholder="password"
            className={inputStyle.simple}
            {...register("password", {
              required: true,
            })}
          />
          {show ? (
            <AiFillEye
              data-color={errors.password ? "danger" : ""}
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <AiFillEyeInvisible
              data-color={errors.password ? "danger" : ""}
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>

        <div className={inputStyle.simpleContainer}>
          <select className={inputStyle.simpleSelect} {...register("role")}>
            <option value="homme">gerant(e) homme</option>
            <option value="femme">gerant(e) femme</option>
            <option value="admine">admin</option>
          </select>
        </div>

        <button type="submit" target="icon" color="success">
          <AiOutlineCheckCircle size={24} />
        </button>

        <button type="button" onClick={resetInputs} target="icon">
          <BiReset size={24} />
        </button>

        {connected && connected.role.includes("super-admine") ? (
          <button
            type="button"
            target="icon"
            color="danger"
            onClick={deleteUser}
          >
            <BiTrashAlt size={24} />
          </button>
        ) : (
          <></>
        )}
      </form>
    </li>
  );
}

export default UserItem;
