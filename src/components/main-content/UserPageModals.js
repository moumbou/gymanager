import React from "react";
import AddUser from '../users/modals/AddUser'
import DeleteUser from '../users/modals/DeleteUser'
import DetailsUser from '../users/modals/DetailsUser'
import EditSubUser from "../users/modals/EditSubUser";
import ModifyUser from '../users/modals/ModifyUser'

function UserPageModals() {
  return (
    <>
      <AddUser />
      <DetailsUser />
      <DeleteUser />
      <ModifyUser />
      <EditSubUser />
    </>
  );
}

export default UserPageModals;
