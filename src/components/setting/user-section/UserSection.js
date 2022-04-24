import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import buttonStyle from "../../../style/modules/button.module.css";
import { ImAddressBook } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentModal } from "../../../features/modals/modalSlice";
import { ModalsSetting } from "../../../shared/Constants";
import {
  selectConnected,
  selectUsers,
} from "../../../features/connexion/connexionSlice";

function UserSection() {
  const [users, setUsers] = useState([]);
  const defaultUsers = useSelector(selectUsers);
  const connected = useSelector(selectConnected);

  const dispatch = useDispatch();
  const showAddUser = () => {
    dispatch(setCurrentModal(ModalsSetting.ADD_USER));
  };

  useEffect(() => {
    setUsers(defaultUsers);
  }, [defaultUsers]);

  return (
    <>
      <button onClick={showAddUser} className={buttonStyle.simpleButton}>
        ajouter un utilisateur <ImAddressBook />
      </button>
      <ul target="users-liste">
        {users.map((val) => (
          <UserItem
            key={val._id}
            user={val}
            connected={connected ? connected : ""}
          />
        ))}
      </ul>
    </>
  );
}

export default UserSection;
