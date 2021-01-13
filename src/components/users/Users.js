import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";
const Users = ({ users, loading }) => (
  <React.Fragment>
    {loading ? (
      <Spinner />
    ) : (
      <div style={userStyle}>
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    )}
  </React.Fragment>
);
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};
export default Users;
