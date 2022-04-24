import React from "react";
import Dashbord from "../dashbord/Dashbord";
import Profile from "../profile/Profile";
import Setting from "../setting/Setting";
import Subs from "../Subs/Subs";
import Users from "../users/Users";

function Content() {
  return (
    <div className="content">
      <Dashbord />
      <Users />
      <Subs />
      <Setting />
      <Profile />
    </div>
  );
}

export default Content;
